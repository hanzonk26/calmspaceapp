"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type TrackKey = "ocean" | "fireplace" | "rain";

type Track = {
  key: TrackKey;
  title: string;
  emoji: string;
  url: string;
};

export default function Home() {
  const tracks: Track[] = useMemo(
    () => [
      {
        key: "ocean",
        title: "Ocean Sound",
        emoji: "🌊",
        // placeholder public mp3 (bisa kamu ganti)
        url: "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars3.wav",
      },
      {
        key: "fireplace",
        title: "Fireplace",
        emoji: "🔥",
        url: "https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav",
      },
      {
        key: "rain",
        title: "Rain",
        emoji: "🌧️",
        url: "https://www2.cs.uic.edu/~i101/SoundFiles/PinkPanther30.wav",
      },
    ],
    []
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeKey, setActiveKey] = useState<TrackKey | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [timerMinutes, setTimerMinutes] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const timerRef = useRef<number | null>(null);

  const activeTrack = useMemo(
    () => tracks.find((t) => t.key === activeKey) ?? null,
    [activeKey, tracks]
  );

  // init audio element once
  useEffect(() => {
    if (!audioRef.current) {
      const a = new Audio();
      a.loop = true; // loop untuk ambience
      a.preload = "auto";
      a.addEventListener("play", () => setIsPlaying(true));
      a.addEventListener("pause", () => setIsPlaying(false));
      audioRef.current = a;
    }
    return () => {
      // cleanup
      if (timerRef.current) window.clearInterval(timerRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  async function playTrack(key: TrackKey) {
    const track = tracks.find((t) => t.key === key);
    if (!track || !audioRef.current) return;

    const a = audioRef.current;

    // jika klik track yang sama: toggle play/pause
    if (activeKey === key) {
      if (a.paused) {
        try {
          await a.play();
        } catch (e) {
          console.error(e);
          alert("Browser memblokir autoplay. Coba klik sekali lagi.");
        }
      } else {
        a.pause();
      }
      return;
    }

    // pindah track
    setActiveKey(key);
    a.pause();
    a.currentTime = 0;
    a.src = track.url;

    try {
      await a.play();
    } catch (e) {
      console.error(e);
      alert("Browser memblokir autoplay. Coba klik sekali lagi.");
    }
  }

  function stop() {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
    setActiveKey(null);
    clearTimer();
  }

  function startTimer(mins: number) {
    clearTimer();
    setTimerMinutes(mins);
    const total = mins * 60;
    setSecondsLeft(total);

    timerRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          // waktu habis
          if (timerRef.current) window.clearInterval(timerRef.current);
          timerRef.current = null;
          // stop audio
          if (audioRef.current) audioRef.current.pause();
          setIsPlaying(false);
          setActiveKey(null);
          setTimerMinutes(null);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function clearTimer() {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
    setTimerMinutes(null);
    setSecondsLeft(null);
  }

  const timerLabel = useMemo(() => {
    if (secondsLeft === null) return "Off";
    const m = Math.floor(secondsLeft / 60);
    const s = secondsLeft % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  }, [secondsLeft]);

  const cardStyle: React.CSSProperties = {
    padding: "16px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    fontSize: 16,
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
        padding: "40px 20px",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont",
      }}
    >
      <div style={{ maxWidth: 440, margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>
          CalmSpace
        </h1>
        <p style={{ opacity: 0.7, fontSize: 14, marginBottom: 22 }}>
          Ruang tenang untuk menenangkan pikiran ✨
        </p>

        {/* NOW PLAYING */}
        <div
          style={{
            margin: "0 auto 18px",
            padding: "12px 14px",
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            textAlign: "left",
          }}
        >
          <div style={{ fontSize: 12, opacity: 0.65, marginBottom: 6 }}>
            Now playing
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 18 }}>
              {activeTrack ? activeTrack.emoji : "🎧"}
            </div>
            <div style={{ flex: 1, fontSize: 14 }}>
              {activeTrack ? activeTrack.title : "Nothing"}
              <span style={{ opacity: 0.6 }}> · </span>
              <span style={{ opacity: 0.8 }}>
                {isPlaying ? "Playing" : "Paused"}
              </span>
            </div>
            <button
              onClick={stop}
              style={{
                padding: "8px 10px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.06)",
                color: "white",
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              Stop
            </button>
          </div>
        </div>

        {/* TRACK BUTTONS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {tracks.map((t) => {
            const selected = activeKey === t.key;
            return (
              <button
                key={t.key}
                onClick={() => playTrack(t.key)}
                style={{
                  ...cardStyle,
                  outline: selected ? "2px solid rgba(255,255,255,0.25)" : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18 }}>{t.emoji}</span>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: 600 }}>{t.title}</span>
                    <span style={{ fontSize: 12, opacity: 0.7 }}>
                      {selected
                        ? isPlaying
                          ? "Tap to pause"
                          : "Tap to play"
                        : "Tap to play"}
                    </span>
                  </div>
                </div>

                <span style={{ fontSize: 12, opacity: 0.75 }}>
                  {selected ? (isPlaying ? "Pause ⏸" : "Play ▶") : "Play ▶"}
                </span>
              </button>
            );
          })}
        </div>

        {/* TIMER */}
        <div
          style={{
            marginTop: 18,
            padding: "14px",
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            textAlign: "left",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 10,
              gap: 12,
            }}
          >
            <div>
              <div style={{ fontSize: 12, opacity: 0.65 }}>Sleep timer</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>
                {timerMinutes ? `${timerMinutes} menit` : "Off"}{" "}
                <span style={{ opacity: 0.6, fontWeight: 400 }}>
                  · sisa {timerLabel}
                </span>
              </div>
            </div>

            <button
              onClick={clearTimer}
              style={{
                padding: "8px 10px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.06)",
                color: "white",
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              Clear
            </button>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            {[15, 30, 60].map((m) => (
              <button
                key={m}
                onClick={() => startTimer(m)}
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.15)",
                  background:
                    timerMinutes === m
                      ? "rgba(255,255,255,0.12)"
                      : "rgba(255,255,255,0.06)",
                  color: "white",
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                {m}m
              </button>
            ))}
          </div>
        </div>

        <p style={{ marginTop: 16, fontSize: 12, opacity: 0.55 }}>
          Kalau audio tidak bunyi: pastikan browser tidak memblokir suara, lalu
          klik tombol Play sekali lagi.
        </p>
      </div>
    </main>
  );
}
