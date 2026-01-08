"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* =======================
   TYPES
======================= */
type Mode = "waterPiano" | "deepCalm";

type Track = {
  title: string;
  subtitle: string;
  emoji: string;
  url: string; // direct stream
};

/* =======================
   COMPONENT
======================= */
export default function Page() {
  const [mode, setMode] = useState<Mode>("waterPiano");

  /* ===== DEEP CALM (SomaFM) ===== */
  const tracks: Track[] = useMemo(
    () => [
      {
        title: "Drone Zone",
        subtitle: "Deep ambient · very calm",
        emoji: "🌌",
        url: "https://ice5.somafm.com/dronezone-128-mp3",
      },
      {
        title: "Fluid",
        subtitle: "Soft water + ambient",
        emoji: "💧",
        url: "https://ice5.somafm.com/fluid-128-mp3",
      },
    ],
    []
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const active = tracks[index];

  /* ===== INIT AUDIO ===== */
  useEffect(() => {
    const a = new Audio();
    a.preload = "none";
    a.crossOrigin = "anonymous";
    a.src = tracks[0].url;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);

    audioRef.current = a;

    return () => {
      a.pause();
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      audioRef.current = null;
    };
  }, [tracks]);

  /* ===== CONTROLS ===== */
  const play = async () => {
    try {
      await audioRef.current?.play();
    } catch {
      alert("Klik Play sekali lagi ya");
    }
  };

  const pause = () => audioRef.current?.pause();

  const toggle = () => {
    if (!audioRef.current) return;
    audioRef.current.paused ? play() : pause();
  };

  const setTrack = async (i: number) => {
    if (!audioRef.current) return;
    setIndex(i);
    audioRef.current.pause();
    audioRef.current.src = tracks[i].url;
    audioRef.current.load();
    await play();
  };

  const next = () => setTrack((index + 1) % tracks.length);
  const prev = () => setTrack((index - 1 + tracks.length) % tracks.length);

  /* =======================
     UI
  ======================= */
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #1e293b 0%, #020617 65%)",
        color: "white",
        padding: "32px 18px",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto",
      }}
    >
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        {/* HEADER */}
        <header style={{ textAlign: "center", marginBottom: 16 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>
            🌿 CalmSpace
          </h1>
          <p style={{ opacity: 0.65, fontSize: 14, marginTop: 6 }}>
            Healing · quiet · no distraction
          </p>
        </header>

        {/* MODE SWITCH */}
        <section style={{ display: "flex", gap: 10, marginBottom: 12 }}>
          <ModeBtn
            active={mode === "waterPiano"}
            onClick={() => {
              pause();
              setMode("waterPiano");
            }}
            label="🎋 Water + Piano"
          />
          <ModeBtn
            active={mode === "deepCalm"}
            onClick={() => setMode("deepCalm")}
            label="🌌 Deep Calm"
          />
        </section>

        {/* CONTENT */}
        {mode === "waterPiano" ? (
          /* ===== WATER + PIANO ===== */
          <section style={card}>
            <div style={titleRow}>
              <span>🎋</span>
              <div>
                <b>Water + Piano</b>
                <div style={sub}>Suara air lembut + piano pelan</div>
              </div>
            </div>

            <div style={videoWrap}>
              <iframe
                src="https://www.youtube-nocookie.com/embed/b8BfcX7RHxY?rel=0&playsinline=1"
                allow="autoplay; encrypted-media"
                referrerPolicy="strict-origin-when-cross-origin"
                style={iframe}
              />
            </div>

            <p style={note}>
              Klik <b>Play</b> di video. Mode ini fokus ke rasa tenang, bukan tontonan.
            </p>
          </section>
        ) : (
          /* ===== DEEP CALM ===== */
          <section style={card}>
            <div style={titleRow}>
              <span>{active.emoji}</span>
              <div>
                <b>{active.title}</b>
                <div style={sub}>{active.subtitle}</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              <Btn onClick={prev}>⏮</Btn>
              <Btn primary onClick={toggle}>
                {isPlaying ? "⏸ Pause" : "▶ Play"}
              </Btn>
              <Btn onClick={next}>⏭</Btn>
            </div>

            <p style={note}>
              Audio-only · tidak ada beat · cocok untuk meditasi & tidur
            </p>
          </section>
        )}

        <footer style={footer}>
          Less sound · more calm
        </footer>
      </div>
    </main>
  );
}

/* =======================
   SMALL COMPONENTS
======================= */
function ModeBtn({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: "12px",
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.15)",
        background: active ? "rgba(125,211,252,0.18)" : "rgba(255,255,255,0.06)",
        color: "white",
        fontWeight: 700,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

function Btn({
  children,
  onClick,
  primary = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: "12px",
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.18)",
        background: primary ? "rgba(56,189,248,0.9)" : "rgba(255,255,255,0.06)",
        color: primary ? "#020617" : "white",
        fontWeight: 800,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

/* =======================
   STYLES
======================= */
const card: React.CSSProperties = {
  padding: 16,
  borderRadius: 18,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
};

const titleRow: React.CSSProperties = {
  display: "flex",
  gap: 10,
  alignItems: "center",
};

const sub: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.65,
};

const videoWrap: React.CSSProperties = {
  position: "relative",
  width: "100%",
  paddingTop: "56.25%",
  marginTop: 12,
  borderRadius: 14,
  overflow: "hidden",
};

const iframe: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  border: 0,
};

const note: React.CSSProperties = {
  marginTop: 10,
  fontSize: 12,
  opacity: 0.6,
  lineHeight: 1.5,
};

const footer: React.CSSProperties = {
  textAlign: "center",
  fontSize: 12,
  opacity: 0.45,
  marginTop: 16,
};