import * as React from "react";
import { SautNajdiLogo } from "najd-ui";

const Stage = ({ children }: { children: React.ReactNode }) => (
  <div
    className="flex w-full items-center justify-center"
    style={{ minHeight: "16rem" }}
  >
    {children}
  </div>
);

// Width-controlled wrapper so the near-square lockup sizes deterministically
// (height follows its own aspect ratio) without arbitrary Tailwind values.
const Sized = ({
  width,
  children,
}: {
  width: number;
  children: React.ReactNode;
}) => <div style={{ width }}>{children}</div>;

// The stacked Saut Najdi (صوت نجدي) lockup, reversed for dark surfaces.
export const LockupDark = () => (
  <Stage>
    <Sized width={300}>
      <SautNajdiLogo variant="lockup" theme="dark" className="h-auto w-full" />
    </Sized>
  </Stage>
);

// The open-circle waveform symbol of the flagship voice product.
export const Mark = () => (
  <Stage>
    <Sized width={210}>
      <SautNajdiLogo variant="mark" className="h-auto w-full" />
    </Sized>
  </Stage>
);

// The Saut Najdi lockup on a light surface — placed on a white panel.
export const LockupLight = () => (
  <Stage>
    <div
      className="flex items-center justify-center rounded-2xl"
      style={{ background: "#ffffff", padding: "1.75rem 2.25rem" }}
    >
      <Sized width={250}>
        <SautNajdiLogo variant="lockup" theme="light" className="h-auto w-full" />
      </Sized>
    </div>
  </Stage>
);
