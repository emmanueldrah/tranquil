import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import { Providers } from "@/components/Providers";
import { ConditionalLayout } from "@/components/ConditionalLayout";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tranquil - Curated Goods for a Modern Life",
  description: "Discover a curated collection of high-quality products designed to bring tranquility and style to your everyday life. Shop for modern home essentials, electronics, apparel, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.className} antialiased`}
        style={{ background: '#FDFDFB' }}
      >
        <Providers>
          <ConditionalLayout>{children}</ConditionalLayout>
        </Providers>
      </body>
    </html>
  );
}
