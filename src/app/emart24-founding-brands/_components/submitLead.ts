import { ZOHO_FORMS } from '../_data';
import { getUTMCookies } from '@/lib/utmCookies';

export type LeadFields = Record<string, string>;

/** Sends a lead to the Zoho form through the site's existing /api/zoho-form route.
 *  While no Zoho form is configured, nothing is sent and the call resolves as a success
 *  so the thank-you message can be reviewed locally. */
export async function submitLead(which: keyof typeof ZOHO_FORMS, lead: LeadFields): Promise<{ ok: boolean; error?: string }> {
  const form = ZOHO_FORMS[which];
  if (!form.permalink) {
    console.warn('[emart24] Zoho form not configured yet; submission not sent.', lead);
    return { ok: true };
  }
  const fields: Record<string, string> = {};
  // Only fields the Zoho form actually has are sent (see ZOHO_FORMS in _data.ts).
  const pageUrl = window.location.href.split('#')[0]; // drop "#claim" etc.; keep any UTM query
  for (const [k, v] of Object.entries({ ...lead, pageUrl })) {
    if (v && form.fields[k]) fields[form.fields[k]] = v;
  }
  fields.referrername = 'emart24-founding-brands';
  fields.zf_referrer_name = 'emart24-founding-brands'; // Zoho's own referral field (from its HTML embed code)
  Object.assign(fields, getUTMCookies());
  try {
    const res = await fetch('/api/zoho-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        zohoFormPermalink: form.permalink,
        zohoFormLinkName: form.linkName,
        fields,
      }),
    });
    const json = await res.json();
    if (!res.ok || !json.success) return { ok: false, error: json.error || 'Something went wrong. Please try again.' };
    return { ok: true };
  } catch {
    return { ok: false, error: 'Network error. Please check your connection and try again.' };
  }
}

export const firstName = (full: string) => full.trim().split(/\s+/)[0] || '';

export const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
export const isValidPhone = (v: string) => /^[+]?[\d\s()-]{7,20}$/.test(v.trim());