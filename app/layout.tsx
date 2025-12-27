import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DarkVeil from "@/components/DarkVeil";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Федерация развития искусственного интеллекта и цифровых технологий",
  description: "Объединяем образование, бизнес и государство для развития ИИ и цифровых технологий",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <div className="fixed inset-0 w-full h-full opacity-30 pointer-events-none" style={{ zIndex: 0 }}>
          <DarkVeil 
            hueShift={200}
            noiseIntensity={0.02}
            scanlineIntensity={0.1}
            speed={0.3}
            scanlineFrequency={0.5}
            warpAmount={0.3}
            resolutionScale={0.5}
          />
        </div>
        <div className="relative" style={{ zIndex: 1 }}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
