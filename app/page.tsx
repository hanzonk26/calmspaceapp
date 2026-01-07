iexport default function Home() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ maxWidth: 720, width: "100%", textAlign: "center" }}>
        <h1 style={{ fontSize: 42, margin: 0 }}>CalmSpace</h1>
        <p style={{ opacity: 0.8, marginTop: 12 }}>
          Musik relaksasi sederhana untuk menenangkan pikiran.
        </p>

        <div style={{ marginTop: 24, display: "grid", gap: 12 }}>
          <a
            href="#"
            style={{
              display: "block",
              padding: "14px 16px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.15)",
              textDecoration: "none",
            }}
          >
            🌧️ Rain — (nanti kita isi audio)
          </a>

          <a
            href="#"
            style={{
              display: "block",
              padding: "14px 16px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.15)",
              textDecoration: "none",
            }}
          >
            🌊 Ocean — (nanti kita isi audio)
          </a>

          <a
            href="#"
            style={{
              display: "block",
              padding: "14px 16px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.15)",
              textDecoration: "none",
            }}
          >
            🔥 Fireplace — (nanti kita isi audio)
          </a>
        </div>

        <p style={{ opacity: 0.6, marginTop: 18, fontSize: 12 }}>
          Next step: kita tambahin player audio + tombol play/pause.
        </p>
      </div>
    </main>
  );
}
