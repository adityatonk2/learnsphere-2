import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LearnSphere Technologies - Enterprise Corporate Learning & Certification Training",
  description: "Global provider of enterprise corporate learning, authorized IT vendor certifications, and custom workforce upskilling solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans selection:bg-sky-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
