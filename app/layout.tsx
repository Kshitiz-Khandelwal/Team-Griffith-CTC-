import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import MainNav from "@/components/main-nav";
import ToasterWrapper from "@/components/ToasterWrapper"; // Import the new wrapper

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cook the Code - Campus Event Finder",
  description: "Discover and RSVP to campus events",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="relative min-h-screen flex flex-col">
            <MainNav />
            <main className="flex-1">{children}</main>
            <footer className="border-t py-6 md:py-0">
              <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                <p className="text-sm text-muted-foreground">© 2024 Cook the Code. All rights reserved.</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <a href="#" className="hover:underline">Terms</a>
                  <a href="#" className="hover:underline">Privacy</a>
                  <a href="#" className="hover:underline">Contact</a>
                </div>
              </div>
            </footer>
          </div>
          <ToasterWrapper /> {/* Use the wrapper here */}
        </ThemeProvider>
      </body>
    </html>
  );
}
