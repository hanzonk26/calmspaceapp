"use client";

import { useMemo, useState } from "react";

type TrackKey = "ocean" | "rain" | "fireplace";

type Track = {
  key: TrackKey;
  title: string;
  subtitle: string;
  emoji: string;
  soundcloudUrl: string; // URL halaman SoundCloud (bukan mp3 direct)
};

function scEmbedSrc(soundcloudUrl: string) {
  // SoundCloud embed player menggunakan url (harus di-encode)
  const encoded = encodeURIComponent(soundcloudUrl);
  // Parameter dasar: tidak autoplay, tampilan minimal
  return `https://w.soundcloud.com/player/?url=${encoded}&color=%231e293b&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false`;
}

export default function Page() {
  const tracks: Track[] = useMemo(
    () => [
      {
        key: "ocean",
        title: "Ocean Waves",
        subtitle: "Soothing Relaxation (SoundCloud)",
        emoji: "🌊",
        soundcloudUrl: "https://soundcloud.com/soothingrelaxation/ocean-waves",
      },
      {
        key: "rain",
        title: "Rainy Day",
        subtitle: "Soothing Relaxation (SoundCloud)",
        emoji: "🌧️",
        soundcloudUrl: "https://soundcloud.com/soothingrelaxation/rainy-day",
      },
      {
        key: "fireplace",
        title: "Cracking Fireplace (1 Hour)",
        subtitle: "Relaxing White Noise Sounds (SoundCloud)",
        emoji: "🔥",
        soundcloudUrl:
          "https://soundcloud.com/relaxingwhitenoisesounds/cracking-fireplace-1-hour-of",
      },
    ],
    []
  );

  const [active, setActive] = useState<TrackKey>("ocean");
  const activeTrack = tracks.find((t) => t.key === active)!;

  const card: React.CSSProperties = {
    padding: "14px 14px",
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    cursor: "pointer",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #1e293b 0%, #020617 60%)",
        color: "white",
        padding: "34px 18px",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
      }}
    >
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: 18 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>
            🌿 CalmSpace
          </h1>
          <p style={{ opacity: 0.7, marginTop: 8, fontSize: 14, marginBottom: 0 }}>
            Healing vibes — tanpa download, tinggal play.
          </p>
        </header>

        {/* PILIH TRACK */}
        <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {tracks.map((t) => {
            const selected = t.key === active;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                style={{
                  ...card,
                  outline: selected ? "2px solid rgba(125,211,252,0.45)" : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ fontSize: 18 }}>{t.emoji}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{t.title}</div>
                    <div style={{ opacity: 0.7, fontSize: 12 }}>{t.subtitle}</div>
                  </div>
                </div>
                <div style={{ opacity: 0.8, fontSize: 12 }}>
                  {selected ? "Selected" : "Tap"}
                </div>
              </button>
            );
          })}
        </section>

        {/* PLAYER */}
        <section
          style={{
            marginTop: 14,
            padding: 14,
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ fontSize: 18 }}>{activeTrack.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800 }}>{activeTrack.title}</div>
              <div style={{ opacity: 0.7, fontSize: 12 }}>
                Tekan tombol <b>Play</b> di player SoundCloud.
              </div>
            </div>
          </div>

          <iframe
            key={activeTrack.key} // force refresh saat ganti track
            width="100%"
            height="140"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={scEmbedSrc(activeTrack.soundcloudUrl)}
            style={{ borderRadius: 12, overflow: "hidden" }}
          />

          <div style={{ opacity: 0.6, fontSize: 12, marginTop: 10, lineHeight: 1.5 }}>
            Tips: kalau suara tidak keluar, cek volume HP/laptop dan pastikan tidak mute. Di iOS kadang harus
            tap Play sekali lagi.
          </div>
        </section>

        <footer style={{ marginTop: 14, textAlign: "center", opacity: 0.55, fontSize: 12 }}>
          Sumber audio via SoundCloud embed (gratis untuk didengar, tanpa download).
        </footer>
      </div>
    </main>
  );
}
