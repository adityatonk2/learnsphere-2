import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ChatBot } from "@/components/ChatBot";
import "../globals.css";

const SITE_URL = "https://www.nexmentorsolutions.com";
const SITE_NAME = "NexMentor Solutions";
const SITE_TITLE = "NexMentor Solutions - Enterprise Corporate Learning & Certification Training";
const SITE_DESCRIPTION =
  "Global provider of enterprise corporate learning, industry-recognized IT vendor certification training (AWS, Microsoft, EC-Council, ISC2, PMI & more), and custom workforce upskilling solutions.";

const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  hi: "hi_IN",
  ar: "ar_AR",
  fr: "fr_FR",
  es: "es_ES",
  pt: "pt_PT",
  de: "de_DE",
  ja: "ja_JP",
  zh: "zh_CN",
};

const RTL_LOCALES = new Set(["ar"]);

const HREFLANG_ALTERNATES: Record<string, string> = {
  en: "/en",
  hi: "/hi",
  ar: "/ar",
  fr: "/fr",
  es: "/es",
  pt: "/pt",
  de: "/de",
  ja: "/ja",
  zh: "/zh",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
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
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    alternates: {
      canonical: `/${locale}`,
      languages: HREFLANG_ALTERNATES,
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/${locale}`,
      siteName: SITE_NAME,
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      locale: OG_LOCALE[locale] ?? "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
    },
  };
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  sameAs: [
    "https://www.instagram.com/nexmentorsolutions/?hl=en",
    "https://www.youtube.com/@NEXMENTORSOLUTIONS",
    "https://in.pinterest.com/nexmentorsolutions/?actingBusinessId=1100004415144240754",
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const dir = RTL_LOCALES.has(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||((!t||t==='system')&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased font-sans selection:bg-sky-500 selection:text-white bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-200">
        <NextIntlClientProvider>
          {children}
          <ChatBot />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
