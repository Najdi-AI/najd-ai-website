import * as React from "react";
import { CardBody, CardContainer, CardItem } from "najd-ui";

const layers = [
  { z: 80, title: "Monitoring & drift", sub: "live" },
  { z: 60, title: "Serving & inference", sub: "ksa-c1" },
  { z: 40, title: "Training & evaluation", sub: "gpu" },
  { z: 20, title: "Data ingestion", sub: "arabic" },
] as const;

const LayerIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" />
    <path d="M3 12l9 4.5L21 12" />
    <path d="M3 16.5 12 21l9-4.5" />
  </svg>
);

/**
 * Emphasis: a single 3D card whose rows are CardItems lifted to different
 * translateZ depths (z 20 → 80), forming a layered MLOps stack on hover.
 */
export const DepthLayers = () => (
  <CardContainer containerClassName="!py-0">
    <CardBody className="h-auto w-full max-w-sm rounded-2xl border border-border/60 bg-najd-ink p-6">
      <CardItem translateZ={10} className="w-full">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-najd-blue/90">
          MLOps Pipeline
        </p>
        <h3 className="mt-1.5 font-display text-xl font-bold text-foreground">
          Layered by translateZ
        </h3>
      </CardItem>

      <div className="mt-5 flex flex-col gap-3">
        {layers.map((l) => (
          <CardItem key={l.z} translateZ={l.z} className="w-full">
            <div className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-white/[0.02] px-4 py-3">
              <span className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-najd-blue/30 bg-najd-blue/[0.08] text-najd-blue">
                  <LayerIcon />
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {l.title}
                </span>
              </span>
              <span className="inline-flex items-center rounded-full border border-najd-blue/30 bg-najd-blue/10 px-2.5 py-1 text-[11px] font-semibold text-najd-blue">
                z {l.z}
              </span>
            </div>
          </CardItem>
        ))}
      </div>
    </CardBody>
  </CardContainer>
);
