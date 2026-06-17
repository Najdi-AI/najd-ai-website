# Signup Form

> A styled signup/registration form card with name, email, password fields and social-login buttons.

## Install

```bash
npx shadcn@latest add @aceternity/signup-form-demo
```

## What it is

A ready-made signup form card built from shadcn-style `Input` and `Label` primitives. It renders first/last name, email and password fields, a gradient "Sign up" submit button, and a set of social-login buttons (GitHub, Google, OnlyFans) each with an animated bottom-gradient hover effect. Use it as a drop-in authentication/registration UI that you can wire up to your own submit handler. It is a self-contained demo component — adapt the fields and handler to your real auth flow.

## Dependencies

- npm packages:
  - `react`
  - `@tabler/icons-react` (icons: `IconBrandGithub`, `IconBrandGoogle`, `IconBrandOnlyfans`)
  - `cn` from `@/lib/utils` (the `clsx` + `tailwind-merge` helper)
- Internal components (under `components/ui/`):
  - `Input` — `@/components/ui/input`
  - `Label` — `@/components/ui/label`
- Tailwind config requirement:
  - Uses the custom `shadow-input` utility (relied upon by the Aceternity `Input` component and the form card). Ensure the corresponding box-shadow utility from the Aceternity setup is present. No custom keyframes/animations are required — hover effects use Tailwind transitions only.

## Exports & Props

`SignupFormDemo` is the only export (a default export). It takes no props.

| Export | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `SignupFormDemo` (default) | — | — | — | Self-contained signup form card; no props. Has an internal `handleSubmit` that calls `e.preventDefault()` and logs to console. |

Internal (non-exported) helpers used by the component:

- `BottomGradient` — renders the animated hover gradient under each button. No props.
- `LabelInputContainer` — wraps a label + input.

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `LabelInputContainer` | `children` | `React.ReactNode` | — | Content (a `Label` and an `Input`). |
| `LabelInputContainer` | `className` | `string` | — | Extra classes merged via `cn`. |

## Usage

```tsx
import SignupFormDemo from "@/components/signup-form-demo";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignupFormDemo />
    </div>
  );
}
```

## Brand note

Available in the library; recolour hardcoded colors to the Najd brand palette (green #2bb673 / blue #2699d6 / navy #0d2745) when adopting on-brand. In particular, the submit button's `from-black to-neutral-600` gradient and the `BottomGradient` `via-cyan-500` / `via-indigo-500` accents are good candidates to swap for Najd green/blue.

## Notes

- The submit handler only logs to the console and prevents default — wire it to a real auth backend.
- All three buttons (including the social ones) use `type="submit"`; change to `type="button"` if they should not submit the form.
- The "Your twitter password" field uses an invalid `type="twitterpassword"`, which browsers treat as `type="text"` — fix the type if adopting.
- Demo copy and the OnlyFans social button are placeholder branding from the original Aceternity demo; replace before shipping.
- No canvas/three/particles and no remote image domains required. Dark mode is supported via `dark:` classes. RTL is not specially handled — the form layout is direction-agnostic but icon/text alignment (`justify-start`, `space-x-2`) may need review under `dir="rtl"`.
