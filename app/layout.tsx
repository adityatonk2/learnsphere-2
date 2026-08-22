import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://www.nexmentorsolutions.com";
const SITE_NAME = "NexMentor Solutions";
const SITE_TITLE = "NexMentor Solutions - Enterprise Corporate Learning & Certification Training";
const SITE_DESCRIPTION =
  "Global provider of enterprise corporate learning, industry-recognized IT vendor certification training (AWS, Microsoft, EC-Council, ISC2, PMI & more), and custom workforce upskilling solutions.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | NexMentor Solutions",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "corporate IT training",
    "AWS certification training",
    "Microsoft Azure certification",
    "cloud computing courses",
    "enterprise learning platform",
    "cybersecurity certification training",
    "PMP certification",
    "IT certification training",
    "workforce upskilling",
  ],
  authors: [{ name: SITE_NAME }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  sameAs: [
    "https://instagram.com/nexmentorsolutions",
    "https://facebook.com/nexmentorsolutions",
    "https://linkedin.com/company/nexmentorsolutions",
    "https://youtube.com/@nexmentorsolutions",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="antialiased font-sans selection:bg-sky-500 selection:text-white">{children}</body>
    </html>
  );
}
