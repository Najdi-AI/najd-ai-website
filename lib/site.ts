/**
 * Single source of truth for contact channels, social links and SEO basics.
 * NOTE: values marked PLACEHOLDER should be replaced with the real business
 * details — they are wired through the whole site from here.
 */
export const siteConfig = {
  name: "Najd AI Solutions",
  nameAr: "حلول نجد للذكاء الاصطناعي",
  shortName: "Najd AI",
  url: "https://najdaisolutions.com", // PLACEHOLDER domain
  // Contact channels (PLACEHOLDER — replace with real values)
  email: "hello@najdaisolutions.com",
  phoneDisplay: "+966 50 000 0000",
  phoneE164: "+966500000000",
  whatsappE164: "966500000000", // digits only, no '+', for wa.me links
  location: "Riyadh, Saudi Arabia",
  locationAr: "الرياض، المملكة العربية السعودية",
  social: {
    linkedin: "https://www.linkedin.com/company/najd-ai-solutions",
    x: "https://x.com/najdaisolutions",
    github: "",
  },
} as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsappE164}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mailtoLink(subject?: string, body?: string) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const qs = params.toString();
  return `mailto:${siteConfig.email}${qs ? `?${qs}` : ""}`;
}
