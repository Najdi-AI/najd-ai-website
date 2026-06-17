"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Home, LayoutGrid, Layers, Wallet, Flag, Mail } from "lucide-react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { useI18n } from "@/components/providers";

/** A futuristic bottom quick-nav dock that fades in after the hero. */
export function FloatingNavDock() {
  const { locale } = useI18n();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cls = "h-full w-full text-najd-blue";
  const items = [
    { title: locale === "ar" ? "الرئيسية" : "Home", icon: <Home className={cls} />, href: `/${locale}` },
    { title: locale === "ar" ? "الأقسام" : "Divisions", icon: <LayoutGrid className={cls} />, href: "#divisions" },
    { title: locale === "ar" ? "الخدمات" : "Services", icon: <Layers className={cls} />, href: "#services" },
    { title: locale === "ar" ? "التعاقد" : "Tiers", icon: <Wallet className={cls} />, href: "#tiers" },
    { title: locale === "ar" ? "رؤية 2030" : "Vision", icon: <Flag className={cls} />, href: "#vision" },
    { title: locale === "ar" ? "تواصل" : "Contact", icon: <Mail className={cls} />, href: "#contact" },
  ];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-x-0 bottom-6 z-40 hidden justify-center md:flex"
        >
          <FloatingDock
            items={items}
            mobileClassName="hidden"
            desktopClassName="border border-border/60 bg-background/70 backdrop-blur-xl shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
