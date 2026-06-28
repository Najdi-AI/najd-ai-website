import * as React from "react";

// Shim for `next/dynamic` (mapped in tsconfig.dssync.json paths) so the
// converter can bundle components that lazy-load children via next/dynamic
// (cover.tsx → SparklesCore, card-spotlight.tsx → CanvasRevealEffect).
// Renders the resolved component; the brand loaders return the component
// directly (`.then(m => m.X)`) or a module (`.default`) — both are handled.
export default function dynamic(loader: any, options: any = {}) {
  const Lazy = React.lazy(() =>
    Promise.resolve(typeof loader === "function" ? loader() : loader).then(
      (m: any) => ({ default: (m && (m.default ?? m)) as React.ComponentType<any> }),
    ),
  );
  return function Dynamic(props: any) {
    const fallback =
      options && options.loading ? React.createElement(options.loading) : null;
    return React.createElement(
      React.Suspense,
      { fallback },
      React.createElement(Lazy, props),
    );
  };
}
