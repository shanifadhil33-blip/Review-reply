import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "ReviewReply — AI-Powered Google Business Profile Review Replies"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#09090b",
          color: "white",
          fontFamily: "sans-serif",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)",
          }}
        />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "48px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
            }}
          >
            ✦
          </div>
          <span style={{ fontSize: "32px", fontWeight: 700, letterSpacing: "-0.5px" }}>
            ReviewReply
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.1,
            maxWidth: "960px",
            letterSpacing: "-1px",
          }}
        >
          AI replies to every review.{" "}
          <span style={{ color: "#818cf8" }}>Automatically.</span>
        </div>

        {/* Subtext */}
        <div
          style={{
            fontSize: "26px",
            color: "#a1a1aa",
            marginTop: "32px",
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: 1.4,
          }}
        >
          Connect once. Set your voice. Turn it on.
        </div>

        {/* Stat pills */}
        <div style={{ display: "flex", gap: "20px", marginTop: "56px" }}>
          {["100% Response Rate", "< 15s Reply Time", "5-9% Revenue Lift"].map((stat) => (
            <div
              key={stat}
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "100px",
                padding: "12px 28px",
                fontSize: "18px",
                fontWeight: 500,
                color: "#e4e4e7",
              }}
            >
              {stat}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
