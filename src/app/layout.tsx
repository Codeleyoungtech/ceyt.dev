import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { PostHogInit } from "@/components/posthog-init";
import { SiteNav } from "@/components/site-nav";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://codeleyoungtech.dev"),
  title: {
    default: "CEYT — Eleazar Ogoyemi",
    template: "%s · CEYT",
  },
  description:
    "Personal developer portfolio of Eleazar Ogoyemi (CEYT): Flustro, Zeyt, Swyp, writing, and in-progress experiments.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CEYT — Eleazar Ogoyemi",
    description:
      "Full stack developer building Flustro, Zeyt, Swyp, and whatever ships next.",
    url: "https://codeleyoungtech.dev",
    siteName: "CEYT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CEYT — Eleazar Ogoyemi",
    description:
      "Full stack developer building Flustro, Zeyt, Swyp, and whatever ships next.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <PostHogInit />
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-14 sm:px-8">
          <SiteNav />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
