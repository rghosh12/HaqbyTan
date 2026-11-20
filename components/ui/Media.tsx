import Image from "next/image";
import type { CSSProperties } from "react";
import type { MediaAsset } from "@/lib/types";
import s from "./Media.module.css";

const TONES: Record<MediaAsset["tone"], [string, string]> = {
  ink: ["#141210", "#f5f1e8"],
  ivory: ["#efe9dc", "#0a0a0a"],
  paper: ["#e2dac9", "#0a0a0a"],
  silver: ["#a9a9a6", "#0a0a0a"],
  rani: ["#c4005f", "#f5f1e8"],
  sindoor: ["#c22f1a", "#f5f1e8"],
  cobalt: ["#1533ad", "#f5f1e8"],
  mehendi: ["#45521f", "#f5f1e8"],
  haldi: ["#d39a00", "#0a0a0a"],
  wine: ["#4a121b", "#f5f1e8"],
  plum: ["#381b46", "#f5f1e8"]
};

/**
 * Every image slot on the site. With `src` it renders an optimised next/image.
 * Without it (CMS missing imagery) it renders an art-directed frame: campaign tone,
 * grain, flash falloff, timestamp and the shot direction — never a broken image.
 */
export function Media({
  asset,
  ratio = "3 / 4",
  sizes = "(max-width: 860px) 100vw, 50vw",
  priority = false,
  showDirection = true,
  showStamp = true,
  showLabel = true,
  className = "",
  style
}: {
  showLabel?: boolean;
  asset: MediaAsset;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  showDirection?: boolean;
  showStamp?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const [tone, onTone] = TONES[asset.tone];
  const kindClass = asset.kind === "flash" ? s.flash : asset.kind === "macro" ? s.macro : "";
  const frameStyle = { aspectRatio: ratio, "--tone": tone, "--on-tone": onTone, ...style } as CSSProperties;

  if (asset.src) {
    return (
      <div className={`${s.frame} ${className}`} style={frameStyle}>
        <Image src={asset.src} alt={asset.alt} fill sizes={sizes} priority={priority} style={{ objectFit: "cover" }} />
        {showStamp && asset.stamp && <span className={s.stamp}>{asset.stamp}</span>}
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={asset.alt}
      className={`${s.frame} ${kindClass} ${className}`}
      style={frameStyle}
    >
      {showStamp && asset.stamp && (
        <span className={s.stamp} aria-hidden="true">
          {asset.stamp}
        </span>
      )}
      {showDirection ? (
        <span className={s.direction} aria-hidden="true">
          <span className={s.directionLabel}>{asset.kind} · shot</span>
          {asset.direction}
        </span>
      ) : (
        showLabel && <span className={s.ghost} aria-hidden="true">
          {asset.alt}
        </span>
      )}
    </div>
  );
}
