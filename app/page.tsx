"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Track = {
  title: string;
  subtitle: string;
  emoji: string;
  url: string; // direct streaming URL (mp3/aac)
};

export default function Page() {
  // Sumber: direct stream links resmi SomaFM
  // Drone Zone: https://somafm.com/dronezone/directstreamlinks.html
  // Space Station Soma: https://somafm.com/spacestation/directstreamlinks.html
  // SomaFM Live list (includes Groove Salad): https://somafm.com/live/directstreamlinks.html
  const tracks: Track[] = useMemo(
    () => [
      {
        title: "Drone Zone",
        subtitle: "Ambient textures (SomaFM)",
        emoji: "🌌",
        url: "https://ice5.somafm.com/dronezone-256-mp3",
      },
      {
        title: "Space Station Soma",
        subtitle: "Chill electronic (SomaFM)",
        emoji: "🛰️",
        url: "https://ice5.somafm.com/spacestation-320-mp3",
      },
      {
        title: "Groove Salad",
        subtitle: "Downtempo / chill (SomaFM)",
        emoji: "🥗",
        url: "https://ice5.somafm.com/groovesalad-128-mp3",
      },
      {
        title: "SomaFM Live (alt)",
        subtitle: "Various chill mix (SomaFM)",
        emoji: "📻",
        url: "https://ice5.somafm.com/live-128-mp3",
      },
    ],
    []
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const active = tracks[index];

  useEffect(() => {
    const a = new Audio();
    a.preload = "none";
    a.crossOrigin = "anonymous";
    audioRef.current = a;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);

    // set initial
    a.src = tracks[0].url;

    return () => {
      a.pause();
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      audioRef.current = null;
    };
  }, [tracks]);

  const play = async () => {
    const a = audioRef.current;
    if (!a) return;
    try {
      await a.play();
    } catch (e) {
      console.error(e);
      alert("Browser memblokir autoplay. Klik Play sekali lagi.");
    }
  };

  const pause = () => audioRef.current?.pause();

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) play();
    else pause();
  };

  const setTrack = async (newIndex: number, autoplay = true) => {
    const a = audioRef.current;
    if (!a) return;
    setIndex(newIndex);
    a.pause();
    a.src = tracks[newIndex].url;
    a.load();
    if (autoplay) await play();
  };

  const next = async () => {
    const newIndex = (index + 1) % tracks.length;
    await setTrack(newIndex, true);
  };

  const prev = async () => {
    const newIndex = (index - 1 + tracks.length) % tracks.length;
    await setTrack(newIndex, true);
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
        <header style={{ textAlign: "center", marginBottom: 16 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>🌿 CalmSpace</h1>
          <p style={{ opacity: 0.7, marginTop: 8, fontSize: 14, marginBottom: 0 }}>
            Audio-only healing streams — tanpa download, tanpa login.
          </p>
        </header>

        {/* Now Playing */}
        <section
          style={{
            padding: 14,
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            marginBottom: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 18 }}>{active.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 900 }}>{active.title}</div>
              <div style={{ opacity: 0.7, fontSize: 12 }}>
                {active.subtitle} · {isPlaying ? "Playing" : "Paused"}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button onClick={prev} style={btn()}>
              ⏮ Prev
            </button>
            <button onClick={toggle} style={btn(true)}>
              {isPlaying ? "⏸ Pause" : "▶ Play"}
            </button>
            <button onClick={next} style={btn()}>
              Next ⏭
            </button>
          </div>

          <div style={{ opacity: 0.6, fontSize: 12, marginTop: 10, lineHeight: 1.5 }}>
            Tips: kalau suara tidak keluar, cek volume perangkat & pastikan tab tidak mute. Di iOS kadang
            perlu tap Play sekali lagi. Streaming bisa makan kuota.
          </div>
        </section>

        {/* Station list */}
        <section style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {tracks.map((t, i) => (
            <button
              key={t.title}
              onClick={() => setTrack(i, true)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: 14,
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.14)",
                background: i === index ? "rgba(125,211,252,0.12)" : "rgba(255,255,255,0.06)",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ fontSize: 18 }}>{t.emoji}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 14 }}>{t.title}</div>
                  <div style={{ opacity: 0.7, fontSize: 12 }}>{t.subtitle}</div>
                </div>
              </div>
              <div style={{ opacity: 0.7, fontSize: 12 }}>{i === index ? "Selected" : "Tap"}</div>
            </button>
          ))}
        </section>

        <footer style={{ marginTop: 14, textAlign: "center", opacity: 0.55, fontSize: 12 }}>
          Streams via SomaFM direct links (MP3). 1
        </footer>
      </div>
    </main>
  );
}

function btn(primary = false): React.CSSProperties {
  return {
    flex: 1,
    padding: "12px 12px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.16)",
    background: primary ? "rgba(56,189,248,0.9)" : "rgba(255,255,255,0.06)",
    color: primary ? "#020617" : "white",
    fontWeight: 800,
    cursor: "pointer",
  };
}