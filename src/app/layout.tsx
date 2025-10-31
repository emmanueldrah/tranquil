import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { Layout } from "@/components/Layout";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tranquil Enterprise - Your One-Stop Shop",
    template: "%s | Tranquil Enterprise"
  },
  description: "Shop for Home Appliances, Electronics, Fashion, Beauty & Wellness products at Tranquil Enterprise.",
  keywords: "ecommerce, online shopping, electronics, fashion, home appliances, beauty products",
  openGraph: {
    title: "Tranquil Enterprise - Your One-Stop Shop",
    description: "Shop for Home Appliances, Electronics, Fashion, Beauty & Wellness products at Tranquil Enterprise.",
    type: "website",
    locale: "en_US",
    siteName: "Tranquil Enterprise"
  },
  twitter: {
    card: "summary_large_image",
    title: "Tranquil Enterprise - Your One-Stop Shop",
    description: "Shop for Home Appliances, Electronics, Fashion, Beauty & Wellness products at Tranquil Enterprise."
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    other: {
      'facebook-domain-verification': ['your-facebook-verification-code'],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        <AuthProvider>
          <CartProvider>
            <Layout>{children}</Layout>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
