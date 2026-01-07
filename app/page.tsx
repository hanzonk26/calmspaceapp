"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Mode = "waterPiano" | "deepCalm";

export default function Page() {
  const [mode, setMode] = useState<Mode>("waterPiano");

  // --- Audio-only (SomaFM Drone Zone) ---
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);

  const DRONE_ZONE_MP3_128 = useMemo(
    () => "https://ice5.somafm.com/dronezone-128-mp3",
    []
  );

  useEffect(() => {
    // init audio element once
    const a = new Audio();
    a.preload = "none";
    a.crossOrigin = "anonymous";
    a.src = DRONE_ZONE_MP3_128;
    a.volume = volume;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const playAudio = async () => {
    const a = audioRef.current;
    if (!a) return;
    try {
      await a.play();
    } catch {
      alert("Browser memblokir autoplay. Klik Play sekali lagi ya.");
    }
  };

  const pauseAudio = () => audioRef.current?.pause();

  const stopDroneIfLeaving = (nextMode: Mode) => {
    // Kalau pindah ke Water+Piano, stop Drone Zone biar gak tumpuk
    if (nextMode === "waterPiano") {
      pauseAudio();
    }
  };

  // --- UI styles ---
  const card: React.CSSProperties = {
    padding: 16,
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.05)",
  };

  const modeBtn = (active: boolean): React.CSSProperties => ({
    width: "100%",
    padding: "14px 14px",
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.14)",
    background: active ? "rgba(125,211,252,0.12)" : "rgba(255,255,255,0.06)",
    color: "white",
    cursor: "pointer",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  });

  const actionBtn = (primary = false): React.CSSProperties => ({
    flex: 1,
    padding: "12px 12px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.16)",
    background: primary ? "rgba(56,189,248,0.92)" : "rgba(255,255,255,0.06)",
    color: primary ? "#020617" : "white",
    fontWeight: 800,
    cursor: "pointer",
  });

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
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: 14 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>
            🌿 CalmSpace
          </h1>
          <p style={{ opacity: 0.7, marginTop: 8, fontSize: 14, marginBottom: 0 }}>
            Mode super tenang — air lembut + piano, atau ambient deep calm.
          </p>
        </header>

        {/* MODE SELECT */}
        <section style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            onClick={() => {
              stopDroneIfLeaving("waterPiano");
              setMode("waterPiano");
            }}
            style={modeBtn(mode === "waterPiano")}
          >
            <div>
              <div style={{ fontWeight: 900 }}>🎋 Water + Piano</div>
              <div style={{ opacity: 0.7, fontSize: 12 }}>
                Suara air lembut + piano pelan (YouTube embed)
              </div>
            </div>
            <div style={{ opacity: 0.75, fontSize: 12 }}>
              {mode === "waterPiano" ? "Selected" : "Tap"}
            </div>
          </button>

          <button
            onClick={() => setMode("deepCalm")}
            style={modeBtn(mode === "deepCalm")}
          >
            <div>
              <div style={{ fontWeight: 900 }}>🌌 Deep Calm</div>
              <div style={{ opacity: 0.7, fontSize: 12 }}>
                Ambient texture minim beat (audio-only)
              </div>
            </div>
            <div style={{ opacity: 0.75, fontSize: 12 }}>
              {mode === "deepCalm" ? "Selected" : "Tap"}
            </div>
          </button>
        </section>

        {/* CONTENT */}
        <section style={{ marginTop: 12 }}>
          {mode === "waterPiano" ? (
            <div style={card}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ fontSize: 18 }}>🎋</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 900 }}>Water + Piano</div>
                  <div style={{ opacity: 0.7, fontSize: 12 }}>
                    Klik <b>Play</b> di player (autoplay biasanya diblokir browser).
                  </div>
                </div>
              </div>

              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingTop: "56.25%", // 16:9
                  borderRadius: 14,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <iframe
                  src="https://www.youtube-nocookie.com/embed/b8BfcX7RHxY?rel=0&playsinline=1"
                  title="Water + Piano"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    border: 0,
                  }}
                />
              </div>

              <div style={{ opacity: 0.6, fontSize: 12, marginTop: 10, lineHeight: 1.5 }}>
                Tips: kamu bisa kecilkan volume di player YouTube. Mode ini cocok buat “healing water + piano”
                yang lembut. 2
              </div>
            </div>
          ) : (
            <div style={card}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ fontSize: 18 }}>🌌</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 900 }}>Deep Calm (Audio-only)</div>
                  <div style={{ opacity: 0.7, fontSize: 12 }}>
                    Droning ambient textures, minim beat. 3
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                <button onClick={playAudio} style={actionBtn(true)}>
                  ▶ Play
                </button>
                <button onClick={pauseAudio} style={actionBtn(false)}>
                  ⏸ Pause
                </button>
              </div>

              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 6 }}>
                  Volume
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  style={{ width: "100%" }}
                />
                <div style={{ fontSize: 12, opacity: 0.6, marginTop: 8 }}>
                  Status: <b>{isPlaying ? "Playing" : "Paused"}</b> · Stream MP3 128kb 4
                </div>
              </div>

              <div style={{ opacity: 0.6, fontSize: 12, marginTop: 10, lineHeight: 1.5 }}>
                Tips: kalau gak bunyi, cek volume device & pastikan tab tidak mute. Di iOS kadang perlu klik Play sekali lagi.
              </div>
            </div>
          )}
        </section>

        <footer style={{ marginTop: 14, textAlign: "center", opacity: 0.55, fontSize: 12 }}>
          Less clutter. More calm.
        </footer>
      </div>
    </main>
  );
}