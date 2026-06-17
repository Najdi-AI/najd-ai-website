import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { FloatingNavDock } from "@/components/site/floating-nav-dock";
import { Hero } from "@/components/sections/hero";
import { BrandBand } from "@/components/sections/brand-band";
import { Differentiator } from "@/components/sections/differentiator";
import { Divisions } from "@/components/sections/divisions";
import { ProductPreview } from "@/components/sections/product-preview";
import { Services } from "@/components/sections/services";
import { Tiers } from "@/components/sections/tiers";
import { GeminiBand } from "@/components/sections/gemini-band";
import { Industries } from "@/components/sections/industries";
import { Process } from "@/components/sections/process";
import { TechStack } from "@/components/sections/tech-stack";
import { Vision } from "@/components/sections/vision";
import { Cta } from "@/components/sections/cta";
import { Contact } from "@/components/sections/contact";

export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = isLocale(params.locale) ? params.locale : "en";
  const dict = getDictionary(locale);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-najd-blue focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {dict.common.skipToContent}
      </a>
      <Navbar />
      <FloatingNavDock />
      <main id="main">
        <Hero />
        <BrandBand />
        <Differentiator />
        <Divisions />
        <ProductPreview />
        <Services />
        <Tiers />
        <GeminiBand />
        <Industries />
        <Process />
        <TechStack />
        <Vision />
        <Cta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
