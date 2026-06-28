import * as React from "react";
import { BackgroundGradientAnimation } from "najd-ui";

export const CtaBand = () => (
  <div
    style={{ position: "relative", height: "22rem", overflow: "hidden" }}
    className="w-full rounded-2xl border border-najd-blue/20"
  >
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgb(8, 19, 37)"
      gradientBackgroundEnd="rgb(5, 11, 22)"
      firstColor="38, 153, 214"
      secondColor="38, 153, 214"
      thirdColor="33, 88, 119"
      fourthColor="38, 153, 214"
      fifthColor="23, 40, 68"
      pointerColor="38, 153, 214"
      interactive={false}
      containerClassName="absolute inset-0 h-full w-full"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 75% 75% at 50% 50%, rgba(5,11,22,0.25), rgba(5,11,22,0.72))",
      }}
    />
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
      <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-najd-blue/20 bg-najd-blue/10 px-4 py-1.5 text-xs font-semibold text-najd-blue">
        Let&apos;s build together
      </span>
      <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
        Put <span className="text-gradient-najd">Saut Najdi</span> to work for
        your customers
      </h2>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
        From first call to full deployment, our team ships production-grade
        Arabic AI with you.
      </p>
      <button className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-najd-navy">
        Start a conversation
      </button>
    </div>
  </div>
);
