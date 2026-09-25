import type { SyntheticEvent } from 'react'

/**
 * Props for a <video> that skips a blank/unwanted intro (the CMS "Skip intro (seconds)"
 * field on the video block) on both initial playback and every loop, instead of
 * restarting at 0. Falls back to the browser's native `loop` when no skip is set, since
 * that's smoother than the timeupdate-based restart below.
 */
export function getVideoSkipIntroProps(startAtSeconds?: number) {
  if (!startAtSeconds || startAtSeconds <= 0) {
    return { loop: true } as const
  }

  const seekToStart = (e: SyntheticEvent<HTMLVideoElement>) => {
    e.currentTarget.currentTime = startAtSeconds
  }

  // `loadedmetadata` alone can race with autoplay starting on the raw <video> element
  // during hydration, before React attaches the listener — so `timeupdate` (which fires
  // repeatedly once playback starts) re-checks and self-corrects on every tick: still
  // before the skip point → jump forward past it; within 0.2s of the end → loop back to
  // it instead of 0.
  const enforceSkipWindow = (e: SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget
    if (video.currentTime < startAtSeconds) {
      video.currentTime = startAtSeconds
    } else if (video.duration && video.duration - video.currentTime < 0.2) {
      video.currentTime = startAtSeconds
    }
  }

  return {
    onLoadedMetadata: seekToStart,
    onTimeUpdate: enforceSkipWindow,
  } as const
}
