import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0D0F14",
          color: "#F1F3F7",
          padding: "64px",
        }}
      >
        <div style={{ color: "#6E5BFF", fontSize: 28, fontFamily: "monospace" }}>$ whoami</div>
        <div style={{ marginTop: 16, fontSize: 64, fontWeight: 700 }}>CEYT</div>
        <div style={{ marginTop: 10, fontSize: 32, color: "#8B92A6" }}>
          Eleazar Ogoyemi — Full Stack Developer
        </div>
      </div>
    ),
    size,
  );
}

