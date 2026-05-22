import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Ardhian Caesar Hermawan — Data & Strategy"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#F5F5F2",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top — monogram + name */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              background: "#1A1A18",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            AC
          </div>
          <span style={{ color: "#6B6B65", fontSize: "18px" }}>
            ardhian-portfolio.vercel.app
          </span>
        </div>

        {/* Middle — headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "#fff",
              border: "1px solid #EBEBEB",
              borderRadius: "100px",
              padding: "8px 20px",
              width: "fit-content",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#16a34a",
              }}
            />
            <span style={{ color: "#6B6B65", fontSize: "16px" }}>
              Open to work — Surakarta & remote
            </span>
          </div>

          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#1A1A18",
              lineHeight: 1.1,
              letterSpacing: "-2px",
            }}
          >
            I build data systems
          </div>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#166534",
              lineHeight: 1.1,
              letterSpacing: "-2px",
            }}
          >
            that ship to production.
          </div>
        </div>

        {/* Bottom — stats row */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            borderTop: "1px solid #EBEBEB",
            paddingTop: "32px",
          }}
        >
          {[
            { value: "3.85", label: "GPA · Cum Laude" },
            { value: "514", label: "Districts · SIRUP Pipeline" },
            { value: "3", label: "Internships" },
            { value: "2", label: "Systems in Production" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <span
                style={{
                  fontSize: "32px",
                  fontWeight: 700,
                  color: "#1A1A18",
                }}
              >
                {stat.value}
              </span>
              <span style={{ fontSize: "14px", color: "#6B6B65" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
