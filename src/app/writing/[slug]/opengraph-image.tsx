import { ImageResponse } from "next/og";
import { getAllPostsMeta } from "@/lib/mdx";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function OpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const posts = await getAllPostsMeta();
  const post = posts.find((item) => item.slug === slug);

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
        <div style={{ color: "#6E5BFF", fontSize: 24, fontFamily: "monospace" }}>$ cat posts/{slug}.md</div>
        <div style={{ marginTop: 16, fontSize: 54, fontWeight: 700 }}>{post?.title ?? "Writing"}</div>
        <div style={{ marginTop: 12, fontSize: 26, color: "#8B92A6" }}>
          {post?.excerpt ?? "Build notes from CEYT"}
        </div>
      </div>
    ),
    size,
  );
}
