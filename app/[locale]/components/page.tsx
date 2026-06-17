import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { COMPONENTS, CATEGORIES } from "@/components/showcase/registry";
import { ShowcaseHeader } from "@/components/showcase/showcase-header";
import { Footer } from "@/components/site/footer";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
  const dict = getDictionary(locale);
  return { title: dict.showcase.title, description: dict.showcase.desc };
}

export default function ComponentsIndex({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
  const dict = getDictionary(locale);

  return (
    <>
      <ShowcaseHeader />
      <main className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
        <div className="flex flex-col items-start gap-4 border-b border-border/50 pb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-najd-blue/25 bg-najd-blue/[0.06] px-3.5 py-1.5 text-xs font-semibold text-najd-blue">
            {dict.showcase.subtitle}
          </span>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="text-gradient-najd">{dict.showcase.title}</span>
          </h1>
          <p className="max-w-2xl text-pretty text-muted-foreground">{dict.showcase.desc}</p>
          <p className="text-xs text-muted-foreground/80">{dict.showcase.docsNote}</p>
        </div>

        {CATEGORIES.map((cat) => {
          const items = COMPONENTS.filter((c) => c.category === cat);
          return (
            <section key={cat} className="pt-12">
              <h2 className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-foreground/70">
                {cat}
                <span className="text-xs font-normal text-muted-foreground">{items.length}</span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/${locale}/components/${c.slug}`}
                    className="group relative flex flex-col gap-2 overflow-hidden rounded-2xl border border-border/60 bg-white/[0.02] p-5 transition-all hover:-translate-y-1 hover:border-najd-blue/40 hover:bg-white/[0.04]"
                  >
                    <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-najd-blue/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-base font-semibold text-foreground">{c.title}</h3>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:text-najd-blue rtl:rotate-[-90deg]" />
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{c.description}</p>
                    {c.usedOnSite && (
                      <span className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-najd-blue/10 px-2.5 py-1 text-[11px] font-medium text-najd-blue">
                        <span className="h-1.5 w-1.5 rounded-full bg-najd-blue" />
                        {dict.showcase.usedOnSite}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </main>
      <Footer />
    </>
  );
}
