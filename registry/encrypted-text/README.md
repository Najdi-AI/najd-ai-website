# Encrypted Text
> Reveals text with a scrambling "decryption" effect that animates into the real characters when scrolled into view.

## Install
```bash
npx shadcn@latest add @aceternity/encrypted-text-demo-2
```

## What it is
`EncryptedText` renders a line of text that starts as randomized gibberish and progressively "decrypts" itself, revealing the real characters one at a time. Unrevealed characters keep flipping through random glyphs on an interval, producing a Matrix-style cipher effect. The animation fires once when the element scrolls into view. Use it for hero headlines, terminal-style labels, or any place where you want an attention-grabbing reveal.

## Dependencies
- npm packages:
  - `motion` (imports `motion` and `useInView` from `motion/react`)
  - `react`
- Internal components:
  - `cn` from `@/lib/utils` (the `clsx` / `tailwind-merge` helper)
- Tailwind config requirement: none (the reveal is driven by `requestAnimationFrame`, not CSS keyframes).

## Exports & Props

### `EncryptedText`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | — | The text to encrypt then reveal. Returns `null` if empty. |
| `className` | `string` | — | Class applied to the wrapping `motion.span`. |
| `revealDelayMs` | `number` | `50` | Time in milliseconds between revealing each subsequent real character. Lower is faster. |
| `charset` | `string` | `"A–Z a–z 0–9 !@#$%^&*()_+-={}[];:,.<>/?"` | Custom character set used for the gibberish effect. |
| `flipDelayMs` | `number` | `50` | Time in milliseconds between gibberish flips for unrevealed characters. Lower is more jittery. |
| `encryptedClassName` | `string` | — | CSS class for styling the encrypted/scrambled characters. |
| `revealedClassName` | `string` | — | CSS class for styling the revealed characters. |

## Usage
```tsx
import { EncryptedText } from "@/components/ui/encrypted-text";

export default function Example() {
  return (
    <p className="mx-auto max-w-lg py-10 text-left">
      <EncryptedText
        text="Welcome to the Matrix, Neo."
        encryptedClassName="text-neutral-500"
        revealedClassName="dark:text-white text-black"
        revealDelayMs={50}
      />
    </p>
  );
}
```

## Brand note
Available in the library; recolour hardcoded colors to the Najd brand palette (green #2bb673 / blue #2699d6 / navy #0d2745) when adopting on-brand. The demo's `text-neutral-500` / `text-black` classes are passed via `encryptedClassName` and `revealedClassName`, so swap those for brand utilities rather than editing the source.

## Notes
- Scroll-triggered: the animation only starts once the element enters the viewport (`useInView` with `{ once: true }`), and runs a single time. Content above the fold animates on mount.
- Spaces are preserved during scrambling — only non-space characters flip.
- Performance: uses a `requestAnimationFrame` loop while decrypting; the loop stops automatically once all characters are revealed, so idle cost is zero.
- Accessibility: the full `text` is exposed via `aria-label` and `role="text"`, so screen readers read the real text, not the scrambled glyphs.
- RTL: characters reveal in source (left-to-right) string order; no explicit RTL handling.
