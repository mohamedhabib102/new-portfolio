import type { Metadata } from "next";
import { Cairo, Alexandria } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { LoadingProvider } from "@/components/providers/LoadingContext";
import SmoothScroll from "@/components/providers/SmoothScroll";
import GlobalLoader from "@/components/ui/GlobalLoader";

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  variable: "--font-cairo",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const alexandria = Alexandria({
  subsets: ["latin", "arabic"],
  variable: "--font-alexandria",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Habib | Creative Full Stack Developer & Designer",
  description:
    "Portfolio of Habib - Creative Full Stack Developer and Designer crafting high-performance, visually striking digital web experiences.",
  authors: [{ name: "Habib", url: "https://github.com/mowafy-dev" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cairo.variable} ${alexandria.variable}`}>
      <body className="min-h-screen antialiased bg-white text-neutral-900">
        <LoadingProvider>
          <GlobalLoader />
          <QueryProvider>
            <LanguageProvider>
              <SmoothScroll>{children}</SmoothScroll>
            </LanguageProvider>
          </QueryProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
