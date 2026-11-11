'use client'

// Shrinks a video in the browser so it can be stored on a proposal (Rif,
// 11 Nov 2026). The request to the website's API is capped by the host, so a
// full 1080p spot is re-encoded here: played once into a canvas at 720p,
// recorded with MediaRecorder at a bitrate that lands under `maxBytes`, and
// trimmed to `maxSeconds`. No sound (the mock-up is silent). Plays in real
// time, so a 15-second spot takes about 15 seconds. The proper fix, direct
// upload to storage, is PLAYBOOK F22.

export type Compressed = { dataUrl: string; type: string; bytes: number; width: number; height: number; sourceWidth: number; sourceHeight: number; seconds: number }

const MIMES = ['video/mp4;codecs=avc1', 'video/mp4', 'video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm']
export const canCompressVideo = () => typeof MediaRecorder !== 'undefined' && typeof HTMLCanvasElement !== 'undefined' && 'captureStream' in HTMLCanvasElement.prototype && MIMES.some(m => MediaRecorder.isTypeSupported(m))

const even = (n: number) => Math.max(2, Math.round(n / 2) * 2)
const toDataUrl = (b: Blob) => new Promise<string>((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result as string); r.onerror = () => rej(r.error); r.readAsDataURL(b) })

async function loadVideo(url: string): Promise<HTMLVideoElement> {
  const v = document.createElement('video')
  v.muted = true; v.playsInline = true; v.preload = 'auto'; v.src = url
  await new Promise<void>((res, rej) => { v.onloadeddata = () => res(); v.onerror = () => rej(new Error('That video could not be read. Use an MP4 (H.264), MOV or WebM file.')) })
  return v
}

/** One pass: play the first `seconds` into a canvas and record it. */
async function record(v: HTMLVideoElement, W: number, H: number, seconds: number, mime: string, bitrate: number, onProgress?: (done: number, total: number) => void): Promise<Blob> {
  const c = document.createElement('canvas'); c.width = W; c.height = H
  const g = c.getContext('2d')!
  const stream = c.captureStream(30)
  const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: Math.round(bitrate) })
  const chunks: Blob[] = []
  rec.ondataavailable = e => { if (e.data.size) chunks.push(e.data) }
  const stopped = new Promise<void>(res => { rec.onstop = () => res() })
  v.currentTime = 0
  await new Promise<void>(res => { if (v.readyState >= 2 && v.currentTime === 0) res(); else v.onseeked = () => res() })
  g.drawImage(v, 0, 0, W, H)
  rec.start(250)
  await v.play()
  await new Promise<void>(res => {
    let done = false
    const finish = () => { if (done) return; done = true; v.pause(); res() }
    v.onended = finish
    const frame = () => {
      if (done) return
      g.drawImage(v, 0, 0, W, H)
      onProgress?.(Math.min(v.currentTime, seconds), seconds)
      if (v.currentTime >= seconds) { finish(); return }
      const rvfc = (v as HTMLVideoElement & { requestVideoFrameCallback?: (cb: () => void) => number }).requestVideoFrameCallback
      if (rvfc) rvfc.call(v, frame); else requestAnimationFrame(frame)
    }
    frame()
  })
  rec.stop(); await stopped
  stream.getTracks().forEach(t => t.stop())
  return new Blob(chunks, { type: mime.split(';')[0] }) // a bare type, so the data URL is data:video/mp4;base64,…
}

export async function compressVideo(file: File, opts: { maxBytes: number; maxSeconds?: number; longSide?: number; onProgress?: (done: number, total: number) => void }): Promise<Compressed> {
  if (!canCompressVideo()) throw new Error('This browser cannot shrink videos. Use Chrome or Safari on a laptop, or export the spot at 1080p H.264, 3 Mbps, 10 seconds (about 4 MB).')
  const url = URL.createObjectURL(file)
  try {
    const v = await loadVideo(url)
    const sw = v.videoWidth, sh = v.videoHeight
    const long = opts.longSide ?? 1280
    const s = Math.min(1, long / Math.max(sw, sh))
    const W = even(sw * s), H = even(sh * s)
    const seconds = Math.max(1, Math.min(v.duration || opts.maxSeconds || 15, opts.maxSeconds ?? 15))
    const mime = MIMES.find(m => MediaRecorder.isTypeSupported(m))!
    // aim at 85% of the cap, between 0.6 and 2.5 Mbps; one smaller retry if the encoder overshoots
    let bitrate = Math.max(600_000, Math.min(2_500_000, (opts.maxBytes * 8 * 0.85) / seconds))
    let blob = await record(v, W, H, seconds, mime, bitrate, opts.onProgress)
    if (blob.size > opts.maxBytes) {
      bitrate = Math.max(300_000, bitrate * 0.8 * (opts.maxBytes / blob.size))
      blob = await record(v, W, H, seconds, mime, bitrate, opts.onProgress)
    }
    if (blob.size > opts.maxBytes) throw new Error('The video is still too large after shrinking. Export a shorter or simpler cut, or send the file to your planner.')
    return { dataUrl: await toDataUrl(blob), type: blob.type, bytes: blob.size, width: W, height: H, sourceWidth: sw, sourceHeight: sh, seconds }
  } finally { URL.revokeObjectURL(url) }
}
