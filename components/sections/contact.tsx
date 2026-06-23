"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type HTMLAttributes,
} from "react";
import { useSearchParams } from "next/navigation";
import { MessageCircle, Mail, Phone, MapPin, Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/providers";
import { SectionShell, SectionHeader, Reveal } from "@/components/sections/primitives";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig, whatsappLink, mailtoLink } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const { dict, dir } = useI18n();
  const c = dict.contact;
  const f = c.form;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [interest, setInterest] = useState(f.interestOptions[0] ?? "");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [errorKey, setErrorKey] = useState<null | "required" | "invalidEmail">(null);

  // Preselect a matching interest option when a CTA lands here with ?interest=<slug>.
  // Each slug maps to a bilingual matcher; the first option it matches wins. We only
  // force the selection on the rising edge (param absent/other → present), so a manual
  // change the user makes afterwards is never clobbered on re-render. An unknown or
  // absent slug leaves the current selection untouched.
  const handleInterestParam = useCallback(
    (requestedInterest: string | null) => {
      if (!requestedInterest) return;
      const matchers: Record<string, (option: string) => boolean> = {
        "saut-najdi": (option) =>
          option.includes("Saut Najdi") || option.includes("صوت نجدي"),
        consulting: (option) =>
          option.includes("Consulting") || option.includes("الاستشارات"),
      };
      const matcher = matchers[requestedInterest];
      if (!matcher) return;
      const matchedOption = f.interestOptions.find(matcher);
      if (matchedOption) setInterest(matchedOption);
    },
    [f.interestOptions]
  );

  const quickLinks = [
    {
      key: "whatsapp",
      label: c.quick.whatsapp,
      href: whatsappLink(c.quick.whatsappMsg),
      icon: MessageCircle,
      external: true,
    },
    {
      key: "email",
      label: c.quick.email,
      href: mailtoLink(),
      icon: Mail,
      external: false,
    },
    {
      key: "call",
      label: c.quick.call,
      href: `tel:${siteConfig.phoneE164}`,
      icon: Phone,
      external: false,
    },
  ] as const;

  const validate = (): boolean => {
    if (name.trim().length < 2 || message.trim().length < 5 || !email.trim()) {
      setErrorKey("required");
      return false;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setErrorKey("invalidEmail");
      return false;
    }
    setErrorKey(null);
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;
    if (!validate()) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, interest, message }),
      });
      if (!res.ok) throw new Error("request failed");

      setStatus("success");
      setName("");
      setEmail("");
      setCompany("");
      setInterest(f.interestOptions[0] ?? "");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  const fieldShell =
    "border-none bg-white/[0.04] text-foreground placeholder:text-muted-foreground/70 dark:bg-white/[0.04] dark:text-foreground dark:shadow-[0px_0px_1px_1px_rgba(255,255,255,0.06)] focus-visible:ring-najd-blue/40 dark:focus-visible:ring-najd-blue/40";

  const statusMessage =
    status === "success" ? f.success : status === "error" ? f.error : errorKey ? f[errorKey] : "";

  return (
    <SectionShell id="contact">
      {/* Reads ?interest reactively (client nav too). Needs its own Suspense
          boundary because useSearchParams() de-opts the page to CSR otherwise. */}
      <Suspense fallback={null}>
        <InterestParamSync onInterest={handleInterestParam} />
      </Suspense>

      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        {/* LEFT: header + quick contact */}
        <div className="flex flex-col gap-8">
          <SectionHeader
            align="start"
            eyebrow={c.label}
            titleLead={c.titleLead}
            highlight={c.titleHighlight}
            desc={c.desc}
          />

          <Reveal delay={0.1} className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {quickLinks.map((link) => {
                const LinkIcon = link.icon;
                // HoverBorderGradient renders the `as` tag and spreads remaining
                // props; anchor-only attributes are passed through this object.
                const anchorProps = {
                  href: link.href,
                  ...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {}),
                } as HTMLAttributes<HTMLElement>;
                return (
                  <HoverBorderGradient
                    key={link.key}
                    as="a"
                    aria-label={link.label}
                    containerClassName="rounded-full"
                    className="flex items-center gap-2 bg-najd-ink px-5 py-2.5 text-sm font-semibold text-foreground"
                    {...anchorProps}
                  >
                    <LinkIcon className="h-4 w-4 text-najd-blue" aria-hidden="true" />
                    <span>{link.label}</span>
                  </HoverBorderGradient>
                );
              })}
            </div>

            <div className="mt-1 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-najd-blue" aria-hidden="true" />
              <span>{dir === "rtl" ? siteConfig.locationAr : siteConfig.location}</span>
            </div>
          </Reveal>
        </div>

        {/* RIGHT: form card */}
        <Reveal delay={0.05}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5 rounded-2xl border border-border/60 bg-white/[0.02] p-6 backdrop-blur sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-name" className="text-foreground">
                  {f.name}
                  <span className="ms-1 text-najd-blue" aria-hidden="true">
                    *
                  </span>
                </Label>
                <Input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={f.namePlaceholder}
                  className={fieldShell}
                  aria-required="true"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-email" className="text-foreground">
                  {f.email}
                  <span className="ms-1 text-najd-blue" aria-hidden="true">
                    *
                  </span>
                </Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={f.emailPlaceholder}
                  className={fieldShell}
                  dir="ltr"
                  aria-required="true"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-company" className="text-foreground">
                  {f.company}
                </Label>
                <Input
                  id="contact-company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder={f.companyPlaceholder}
                  className={fieldShell}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-interest" className="text-foreground">
                  {f.interest}
                </Label>
                <select
                  id="contact-interest"
                  name="interest"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className={cn(
                    "h-10 w-full rounded-md border-none bg-white/[0.04] px-3 py-2 text-sm text-foreground shadow-[0px_0px_1px_1px_rgba(255,255,255,0.06)] transition duration-200 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-najd-blue/40",
                    dir === "rtl" ? "text-end" : "text-start"
                  )}
                >
                  {f.interestOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-najd-navy text-foreground">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="contact-message" className="text-foreground">
                {f.message}
                <span className="ms-1 text-najd-blue" aria-hidden="true">
                  *
                </span>
              </Label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={f.messagePlaceholder}
                aria-required="true"
                className="w-full resize-y rounded-md border-none bg-white/[0.04] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 shadow-[0px_0px_1px_1px_rgba(255,255,255,0.06)] transition duration-200 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-najd-blue/40"
              />
            </div>

            {/* status / validation, polite live region */}
            <div aria-live="polite" className="min-h-[1.25rem]">
              {statusMessage && (
                <p
                  className={cn(
                    "text-sm",
                    status === "success"
                      ? "text-najd-blue"
                      : status === "error" || errorKey
                        ? "text-red-400"
                        : "text-muted-foreground"
                  )}
                >
                  {statusMessage}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-xs text-muted-foreground">
                <span className="text-najd-blue" aria-hidden="true">
                  *
                </span>{" "}
                {dir === "rtl" ? "الحقول المعلّمة بـ * مطلوبة" : "Fields marked * are required"}
              </p>

              <div className="flex justify-start">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  aria-busy={status === "submitting"}
                  className={cn(
                    "inline-flex min-w-[120px] items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-80",
                    status === "success"
                      ? "bg-najd-blue-light text-najd-ink"
                      : "bg-najd-blue text-najd-ink hover:bg-najd-blue-light"
                  )}
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      <span>{f.submitting}</span>
                    </>
                  ) : status === "success" ? (
                    <>
                      <Check className="h-4 w-4" aria-hidden="true" />
                      <span>{f.submit}</span>
                    </>
                  ) : (
                    <span>{f.submit}</span>
                  )}
                </button>
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </SectionShell>
  );
}

/**
 * Reads the `interest` search param reactively and lifts it to the parent on
 * the rising edge only (each time its value changes). `useSearchParams` updates
 * on client navigation, so this covers both a cold load of
 * `/{locale}?interest=<slug>#contact` and a same-page <Link> click to it,
 * without touching the History API. Renders nothing, so it never affects the
 * SSR markup. Must live under a <Suspense> boundary (App Router requirement).
 */
function InterestParamSync({
  onInterest,
}: {
  onInterest: (interest: string | null) => void;
}) {
  const searchParams = useSearchParams();
  const interestParam = searchParams.get("interest");
  const previousRef = useRef<string | null>(null);

  useEffect(() => {
    // Only act on a real transition to a new param value so we don't re-force the
    // selection (and clobber a user's manual choice) on unrelated re-renders.
    if (interestParam !== previousRef.current) {
      previousRef.current = interestParam;
      onInterest(interestParam);
    }
  }, [interestParam, onInterest]);

  return null;
}
