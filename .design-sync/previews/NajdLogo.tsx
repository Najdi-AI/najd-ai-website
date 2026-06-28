import * as React from "react";
import { NajdLogo } from "najd-ui";

// Inline minHeight (not an arbitrary Tailwind value) keeps each cell tall and
// the logo optically centered.
const Stage = ({ children }: { children: React.ReactNode }) => (
  <div
    className="flex w-full items-center justify-center"
    style={{ minHeight: "15rem" }}
  >
    {children}
  </div>
);

// Width-controlled wrapper: the artwork fills the wrapper width, height auto by
// its own aspect ratio — deterministic sizing without arbitrary classes.
const Sized = ({
  width,
  children,
}: {
  width: number;
  children: React.ReactNode;
}) => <div style={{ width }}>{children}</div>;

// The reversed (white) horizontal lockup on the brand dark canvas.
export const LockupDark = () => (
  <Stage>
    <Sized width={300}>
      <NajdLogo variant="lockup" theme="dark" className="h-auto w-full" />
    </Sized>
  </Stage>
);

// The NS monogram symbol alone, with its intrinsic blue->navy gradient.
export const Mark = () => (
  <Stage>
    <Sized width={120}>
      <NajdLogo variant="mark" className="h-auto w-full" />
    </Sized>
  </Stage>
);

// The navy lockup as it appears on light surfaces — placed on a white panel.
export const LockupLight = () => (
  <Stage>
    <div
      className="flex items-center justify-center rounded-2xl"
      style={{ background: "#ffffff", padding: "2rem 2.5rem" }}
    >
      <Sized width={280}>
        <NajdLogo variant="lockup" theme="light" className="h-auto w-full" />
      </Sized>
    </div>
  </Stage>
);
