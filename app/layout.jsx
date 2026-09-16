import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeBackground from "@/components/ThemeBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata = {
  metadataBase: new URL("https://федерацияии.рф"),
  title: {
    default: "Федерация искусственного интеллекта",
    template: "%s — Федерация искусственного интеллекта",
  },
  description: "Объединяем тех, кто создаёт будущее искусственного интеллекта в России",
  icons: {
    icon: '/logo.webp',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ThemeBackground />
          <div className="relative" style={{ zIndex: 1 }}>
            <ScrollToTop />
            <Header />
            <main className="min-h-screen pt-28 md:pt-32 w-full">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

