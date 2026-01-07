export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1e293b 0%, #020617 60%)",
        color: "white",
        padding: "40px 20px",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont",
      }}
    >
      <div
        style={{
          maxWidth: 420,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: 28,
            fontWeight: 600,
            marginBottom: 8,
          }}
        >
          CalmSpace
        </h1>

        <p
          style={{
            opacity: 0.7,
            fontSize: 14,
            marginBottom: 32,
          }}
        >
          Ruang tenang untuk menenangkan pikiran ✨
        </p>

        {/* CARD */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <button
            style={{
              padding: "16px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.05)",
              color: "white",
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            🌊 Ocean Sound
            <div style={{ fontSize: 12, opacity: 0.6 }}>
              coming soon
            </div>
          </button>

          <button
            style={{
              padding: "16px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.05)",
              color: "white",
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            🔥 Fireplace
            <div style={{ fontSize: 12, opacity: 0.6 }}>
              coming soon
            </div>
          </button>

          <button
            style={{
              padding: "16px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.05)",
              color: "white",
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            🌧️ Rain
            <div style={{ fontSize: 12, opacity: 0.6 }}>
              coming soon
            </div>
          </button>
        </div>

        <p
          style={{
            marginTop: 28,
            fontSize: 12,
            opacity: 0.5,
          }}
        >
          Next step: tambahin audio player & timer ⏳
        </p>
      </div>
    </main>
  );
}
