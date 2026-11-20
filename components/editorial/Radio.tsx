"use client";

import Link from "next/link";
import { useState } from "react";
import type { Playlist } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import s from "./Editorial.module.css";

/** Branded wrapper, not a Spotify widget. Tabs switch the mood; the embed loads only on play. */
export function Radio({ playlists }: { playlists: Playlist[] }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const p = playlists[i]!;
  const track = p.tracks[0]!;

  return (
    <section className={`surface-ink ${s.radio}`} data-surface="dark" aria-labelledby="radio-title">
      <div className={s.radioBar}>
        <p id="radio-title" className="mono">
          HAQ Radio 07:43
        </p>
        <button
          className={s.play}
          onClick={() => setPlaying((v) => !v)}
          aria-pressed={playing}
          aria-label={playing ? `Pause ${p.title}` : `Play ${p.title}`}
          disabled={!p.url}
          title={p.url ? undefined : "Playlist goes live Friday"}
        >
          <Icon name="play" size={18} />
        </button>
        <div className={s.radioNow}>
          <span className="meta">{p.title}</span>
          <span className="meta muted">
            {track.title} — {track.artist}
          </span>
        </div>
        <Link href={`/world/radio#${p.slug}`} className="link">
          Open playlist →
        </Link>
      </div>
      <div className={s.radioTabs} role="tablist" aria-label="Playlists">
        {playlists.map((pl, n) => (
          <button key={pl.slug} role="tab" aria-selected={n === i} className={`display-italic ${s.radioTab}`} onClick={() => setI(n)}>
            {pl.title}
          </button>
        ))}
      </div>
      <p className={`muted ${s.radioMood}`}>{p.mood}</p>
    </section>
  );
}
