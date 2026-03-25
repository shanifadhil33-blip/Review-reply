import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://reviewreply.ai"),
  title: {
    default: "ReviewReply — AI-Powered Google Business Profile Review Replies",
    template: "%s | ReviewReply",
  },
  description:
    "Connect your Google Business Profile once. ReviewReply's AI writes and posts personalized review replies automatically — in your brand voice, in under 15 seconds.",
  keywords: [
    "Google Business Profile reviews",
    "AI review replies",
    "automated review responses",
    "review management",
    "reputation management",
    "GBP automation",
  ],
  authors: [{ name: "ReviewReply" }],
  creator: "ReviewReply",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ReviewReply",
    title: "ReviewReply — AI-Powered Google Business Profile Review Replies",
    description:
      "Connect once. Set your voice. Turn it on. ReviewReply replies to every Google review automatically in your brand tone.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "ReviewReply — AI Review Reply Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReviewReply — AI-Powered Google Business Profile Review Replies",
    description:
      "Connect once. Set your voice. Turn it on. ReviewReply replies to every Google review automatically in your brand tone.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
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
      <body className={`${inter.variable} antialiased bg-white text-zinc-950 font-sans`}>
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
