/**
 * Showcase + library registry for the 47 Aceternity UI components.
 * Pure metadata (server-safe). The live demo renderer lives in ./demos.tsx.
 */
export type ComponentCategory =
  | "Text Effects"
  | "Cards"
  | "Backgrounds"
  | "Scroll & 3D"
  | "Inputs & Buttons"
  | "Navigation & Overlays";

export interface ComponentEntry {
  /** ui component slug (and /registry/<slug> docs folder) */
  slug: string;
  /** demo file basename under components/ */
  demoSlug: string;
  title: string;
  description: string;
  category: ComponentCategory;
  usedOnSite: boolean;
  install: string;
}

const reg = (
  slug: string,
  demoSlug: string,
  title: string,
  category: ComponentCategory,
  description: string,
  usedOnSite = false
): ComponentEntry => ({
  slug,
  demoSlug,
  title,
  category,
  description,
  usedOnSite,
  install: `npx shadcn@latest add @aceternity/${demoSlug}`,
});

export const COMPONENTS: ComponentEntry[] = [
  // ── Text Effects ──
  reg("text-hover-effect", "text-hover-effect-demo", "Text Hover Effect", "Text Effects", "An interactive SVG wordmark that reveals a brand gradient following the cursor — used for the NAJD AI mark.", true),
  reg("text-generate-effect", "text-generate-effect-demo", "Text Generate Effect", "Text Effects", "Fades in text word by word on load — great for mission statements and intros."),
  reg("text-reveal-card", "text-reveal-card-demo", "Text Reveal Card", "Text Effects", "A mousemove effect that reveals hidden text content at the bottom of a card."),
  reg("typewriter-effect", "typewriter-effect-demo-1", "Typewriter Effect", "Text Effects", "Text that types itself onto the screen, character by character."),
  reg("container-text-flip", "container-text-flip-demo", "Container Text Flip", "Text Effects", "A container that flips through words while animating its width — used in the hero.", true),
  reg("text-flipping-board", "text-flipping-board-demo", "Text Flipping Board", "Text Effects", "A split-flap, airport-style board that flips characters into place."),
  reg("encrypted-text", "encrypted-text-demo-2", "Encrypted Text", "Text Effects", "Scrambles then decodes text into place — a cyber, futuristic reveal."),
  reg("cover", "cover-demo", "Cover", "Text Effects", "Wraps any text with beams and a space-warp effect on hover — used on the hero headline.", true),

  // ── Cards ──
  reg("3d-card", "3d-card-demo", "3D Card Effect", "Cards", "A card that tilts in 3D space with layered depth — used for the engagement tiers.", true),
  reg("card-spotlight", "card-spotlight-demo", "Card Spotlight", "Cards", "A spotlight that follows the cursor across a card — used across services & differentiators.", true),
  reg("comet-card", "comet-card-demo", "Comet Card", "Cards", "A tiltable card with a comet-like sheen that tracks the pointer."),
  reg("evervault-card", "evervault-card-demo", "Evervault Card", "Cards", "A card with an encrypted-text hover effect and a mixed gradient reveal."),
  reg("glowing-effect", "glowing-effect-demo-2", "Glowing Effect", "Cards", "A border glow that adapts to any container — used on comparison & service cards.", true),
  reg("expandable-card", "expandable-card-demo-standard", "Expandable Cards", "Cards", "Cards that expand into a focused modal to show additional information."),
  reg("draggable-card", "draggable-card-demo-2", "Draggable Card", "Cards", "Tiltable, physically draggable cards that bounce on the container bounds."),
  reg("cards", "cards-demo-3", "Feature Block Card", "Cards", "An animated feature block card for highlighting a single capability."),
  reg("bento-grid", "bento-grid-demo-3", "Bento Grid", "Cards", "A skewed bento layout with headers and content — used for the eight divisions.", true),
  reg("3d-pin", "3d-pin-demo", "3D Animated Pin", "Cards", "A gradient pin that animates on hover — used for the Riyadh location pin.", true),

  // ── Backgrounds ──
  reg("background-beams", "background-beams-demo", "Background Beams", "Backgrounds", "Animated beams following SVG paths — the hero background, recoloured to brand.", true),
  reg("background-beams-with-collision", "background-beams-with-collision-demo", "Beams With Collision", "Backgrounds", "Falling beams that explode on collision with a floor."),
  reg("background-lines", "background-lines-demo", "Background Lines", "Backgrounds", "Flowing animated lines that make an elegant section background."),
  reg("background-boxes", "background-boxes-demo", "Background Boxes", "Backgrounds", "A full-width grid of boxes that highlight on hover."),
  reg("background-gradient", "background-gradient-demo", "Background Gradient", "Backgrounds", "An animated gradient border for cards and buttons — used on the flagship tier.", true),
  reg("background-gradient-animation", "background-gradient-animation-demo", "Gradient Animation", "Backgrounds", "Smooth, drifting gradient blobs — the final CTA backdrop, brand-tuned.", true),
  reg("sparkles", "sparkles-demo", "Sparkles", "Backgrounds", "A configurable particle field usable as a background or standalone."),
  reg("meteors", "meteors-demo", "Meteor Effect", "Backgrounds", "A shower of meteor streaks behind a container — used on the Vision 2030 cards.", true),
  reg("canvas-reveal-effect", "canvas-reveal-effect-demo", "Canvas Reveal Effect", "Backgrounds", "A dot matrix that expands on hover — used on the industries grid.", true),
  reg("svg-mask-effect", "svg-mask-effect-demo", "SVG Mask Effect", "Backgrounds", "A cursor-driven mask that reveals what's underneath a container."),
  reg("google-gemini-effect", "google-gemini-effect-demo", "Google Gemini Effect", "Backgrounds", "Scroll-driven SVG beams as seen on the Gemini site — the intelligence divider.", true),

  // ── Scroll & 3D ──
  reg("macbook-scroll", "macbook-scroll-demo", "MacBook Scroll", "Scroll & 3D", "A MacBook that opens and scales on scroll — the product-preview band.", true),
  reg("container-scroll-animation", "container-scroll-animation-demo", "Container Scroll", "Scroll & 3D", "A container that rotates in 3D on scroll — perfect for hero screenshots."),
  reg("hero-parallax", "hero-parallax-demo", "Hero Parallax", "Scroll & 3D", "A parallax wall of cards with rotation, translation and opacity on scroll."),
  reg("3d-marquee", "3d-marquee-demo", "3D Marquee", "Scroll & 3D", "A perspective marquee grid — great for galleries and testimonials."),
  reg("sticky-scroll-reveal", "sticky-scroll-reveal-demo", "Sticky Scroll Reveal", "Scroll & 3D", "A sticky panel that reveals content while scrolling — the tech-stack section.", true),
  reg("timeline", "timeline-demo", "Timeline", "Scroll & 3D", "A sticky timeline with a scroll-following beam — the delivery process.", true),
  reg("lamp", "lamp-demo", "Lamp Section Header", "Scroll & 3D", "A Linear-style lamp glow for section headers — the Vision 2030 header.", true),

  // ── Inputs & Buttons ──
  reg("moving-border", "moving-border-demo", "Moving Border", "Inputs & Buttons", "A light that travels around a button's border to make it stand out."),
  reg("hover-border-gradient", "hover-border-gradient-demo", "Hover Border Gradient", "Inputs & Buttons", "A gradient border that expands around a control on hover — the contact quick links.", true),
  reg("stateful-button", "stateful-button-demo", "Stateful Button", "Inputs & Buttons", "A button with built-in loading and success states — the contact submit.", true),
  reg("gooey-input", "gooey-input-demo", "Gooey Input", "Inputs & Buttons", "An input with a playful gooey, liquid focus animation."),
  reg("placeholders-and-vanish-input", "placeholders-and-vanish-input-demo", "Placeholders & Vanish Input", "Inputs & Buttons", "Cycling placeholders and a vanishing-text submit animation.", true),
  reg("signup-form", "signup-form-demo", "Signup Form", "Inputs & Buttons", "A polished form built on shadcn input/label with a touch of motion."),
  reg("multi-step-loader", "multi-step-loader-demo", "Multi Step Loader", "Inputs & Buttons", "A staged loader for screens or actions that take a while."),

  // ── Navigation & Overlays ──
  reg("floating-dock", "floating-dock-demo", "Floating Dock", "Navigation & Overlays", "A macOS-style magnifying dock used as the floating quick-nav.", true),
  reg("sidebar", "sidebar-demo", "Sidebar", "Navigation & Overlays", "An expand-on-hover sidebar with mobile and dark-mode support."),
  reg("animated-tooltip", "animated-tooltip-demo", "Animated Tooltip", "Navigation & Overlays", "A tooltip that reveals on hover and follows the pointer."),
  reg("link-preview", "link-preview-demo", "Link Preview", "Navigation & Overlays", "Dynamic hover previews for anchor tags."),
];

export const CATEGORIES: ComponentCategory[] = [
  "Text Effects",
  "Cards",
  "Backgrounds",
  "Scroll & 3D",
  "Inputs & Buttons",
  "Navigation & Overlays",
];

export function getComponent(slug: string): ComponentEntry | undefined {
  return COMPONENTS.find((c) => c.slug === slug);
}
