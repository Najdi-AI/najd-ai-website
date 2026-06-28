import * as React from "react";
import { Cover } from "najd-ui";

export const Headline = () => (
  <div className="flex w-full items-center justify-center px-6 py-12">
    <h1 className="text-center text-3xl font-bold leading-tight text-white md:text-5xl">
      Ship enterprise AI at <Cover>warp speed</Cover>
    </h1>
  </div>
);

export const Wordmark = () => (
  <div className="flex w-full items-center justify-center px-6 py-12">
    <h1 className="text-center text-4xl font-bold text-white md:text-6xl">
      <Cover>Najd AI</Cover>
    </h1>
  </div>
);

export const ArabicWordmark = () => (
  <div dir="rtl" className="flex w-full items-center justify-center px-6 py-12">
    <h1 className="text-center text-4xl font-bold text-white md:text-6xl">
      <Cover>صوت نجدي</Cover>
    </h1>
  </div>
);
