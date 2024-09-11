import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Providers from "../providers";
import HeaderComponent from "../../components/header";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background font-[family-name:var(--font-geist-sans)]`}
      >
        <div className="absolute h-full top-0 left-0 right-0 bottom-0">
          <div className="bg-pattern bg-repeat opacity-[0.03] w-full h-full"></div>
        </div>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col gap-y-7 max-w-4xl mx-auto">
              <HeaderComponent />
              {children}
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
