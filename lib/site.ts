/**
 * Single source of truth for contact channels, social links and SEO basics.
 */
export const siteConfig = {
  name: "Najd AI Solutions",
  nameAr: "حلول نجد للذكاء الاصطناعي",
  shortName: "Najd AI",
  url: "https://najdiai.com",
  email: "info@najdiai.com",
  phoneDisplay: "+966 54 943 3473",
  phoneE164: "+966549433473",
  whatsappE164: "966549433473", // digits only, no '+', for wa.me links
  location: "Riyadh, Saudi Arabia",
  locationAr: "الرياض، المملكة العربية السعودية",
  social: {
    instagram: "https://instagram.com/najdiai.sa",
    x: "https://x.com/najdiai",
    linkedin: "https://www.linkedin.com/company/najdiai",
    handle: "najdiai.sa",
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
