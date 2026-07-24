import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/lib/site-data";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function OpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

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
        <div style={{ color: "#6E5BFF", fontSize: 24, fontFamily: "monospace" }}>$ cat projects/{slug}.md</div>
        <div style={{ marginTop: 16, fontSize: 60, fontWeight: 700 }}>{project?.name ?? "Project"}</div>
        <div style={{ marginTop: 12, fontSize: 26, color: "#8B92A6" }}>{project?.summary ?? "CEYT Project"}</div>
      </div>
    ),
    size,
  );
}

