import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/**
 * Geist ships inside the `next/og` bundle. Reading it from disk once at module
 * scope keeps every generated image on the same typeface without committing a
 * font file to the repo. If the path ever changes, we fall back to Satori's
 * default font rather than failing the build.
 */
let fontPromise: Promise<ArrayBuffer> | null = null;

function loadFont() {
  fontPromise ??= readFile(
    join(process.cwd(), "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf"),
  )
    .then((buffer) => {
      const copy = new ArrayBuffer(buffer.byteLength);
      new Uint8Array(copy).set(buffer);
      return copy;
    })
    .catch(() => new ArrayBuffer(0));

  return fontPromise;
}

type OgImageProps = {
  eyebrow: string;
  title: string;
  footer: string;
  meta: string;
};

export async function renderOgImage({ eyebrow, title, footer, meta }: OgImageProps) {
  const font = await loadFont();
  const fonts =
    font.byteLength > 0
      ? [{ name: "Geist", data: font, style: "normal" as const, weight: 400 as const }]
      : undefined;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0a100e",
        backgroundImage:
          "radial-gradient(900px 500px at 12% -10%, rgba(16,185,129,0.34), transparent 60%), radial-gradient(700px 420px at 100% 110%, rgba(13,148,136,0.28), transparent 62%)",
        padding: "68px 76px",
        fontFamily: fonts ? "Geist" : "sans-serif",
        color: "#ecfdf5",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 52,
            height: 52,
            borderRadius: 14,
            backgroundColor: "rgba(16,185,129,0.16)",
            border: "1px solid rgba(16,185,129,0.45)",
            fontSize: 20,
            letterSpacing: 1,
            color: "#6ee7b7",
          }}
        >
          EB
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ fontSize: 24, color: "#ecfdf5" }}>Brown Portfolio</div>
          <div style={{ fontSize: 18, color: "#8aa79d" }}>Eugene Brown</div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            display: "flex",
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#34d399",
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 54 ? 60 : 72,
            lineHeight: 1.14,
            letterSpacing: -1.6,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(110,231,183,0.22)",
          paddingTop: 22,
          fontSize: 20,
          color: "#8aa79d",
        }}
      >
        <div style={{ display: "flex" }}>{footer}</div>
        <div style={{ display: "flex", color: "#34d399" }}>{meta}</div>
      </div>
    </div>,
    { ...ogSize, fonts },
  );
}
