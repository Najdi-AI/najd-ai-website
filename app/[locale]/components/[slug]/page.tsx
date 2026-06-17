import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Terminal, FileCode2 } from "lucide-react";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { COMPONENTS, getComponent } from "@/components/showcase/registry";
import { ShowcaseHeader } from "@/components/showcase/showcase-header";
import { CopyButton } from "@/components/showcase/copy-button";
import { DemoStage } from "@/components/showcase/demos";
import { Footer } from "@/components/site/footer";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    COMPONENTS.map((c) => ({ locale, slug: c.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const entry = getComponent(params.slug);
  if (!entry) return {};
  return { title: entry.title, description: entry.description };
}

export default function ComponentPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
  const dict = getDictionary(locale);
  const entry = getComponent(params.slug);
  if (!entry) notFound();

  const index = COMPONENTS.findIndex((c) => c.slug === entry.slug);
  const prev = index > 0 ? COMPONENTS[index - 1] : null;
  const next = index < COMPONENTS.length - 1 ? COMPONENTS[index + 1] : null;

  return (
    <>
      <ShowcaseHeader />
      <main className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8">
        <Link
          href={`/${locale}/components`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          {dict.showcase.title}
        </Link>

        <div className="mt-6 flex flex-col gap-4 border-b border-border/50 pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {entry.title}
            </h1>
            <span className="rounded-full border border-border/70 px-2.5 py-1 text-xs text-muted-foreground">
              {entry.category}
            </span>
            {entry.usedOnSite && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-najd-blue/10 px-2.5 py-1 text-[11px] font-medium text-najd-blue">
                <span className="h-1.5 w-1.5 rounded-full bg-najd-blue" />
                {dict.showcase.usedOnSite}
              </span>
            )}
          </div>
          <p className="max-w-2xl text-pretty text-muted-foreground">{entry.description}</p>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-border/60 bg-white/[0.02] px-3 py-2.5">
              <Terminal className="h-4 w-4 shrink-0 text-najd-blue" />
              <code dir="ltr" className="min-w-0 flex-1 truncate font-mono text-xs text-foreground/90">
                {entry.install}
              </code>
              <CopyButton text={entry.install} />
            </div>
          </div>
          <p className="flex items-center gap-2 text-xs text-muted-foreground/80">
            <FileCode2 className="h-3.5 w-3.5" />
            <span dir="ltr" className="font-mono">
              components/ui/{entry.slug}.tsx · registry/{entry.slug}/
            </span>
          </p>
        </div>

        <section aria-label="Live preview" className="py-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Live preview
          </p>
          <div className="relative isolate w-full">
            <DemoStage slug={entry.slug} />
          </div>
        </section>

        <nav className="mt-8 flex items-center justify-between gap-4 border-t border-border/50 pt-6">
          {prev ? (
            <Link
              href={`/${locale}/components/${prev.slug}`}
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
              <span className="flex flex-col items-start">
                <span className="text-[11px] uppercase tracking-wide opacity-60">Prev</span>
                <span className="font-medium text-foreground/90">{prev.title}</span>
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/${locale}/components/${next.slug}`}
              className="group inline-flex items-center gap-2 text-end text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="flex flex-col items-end">
                <span className="text-[11px] uppercase tracking-wide opacity-60">Next</span>
                <span className="font-medium text-foreground/90">{next.title}</span>
              </span>
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </main>
      <Footer />
    </>
  );
}
