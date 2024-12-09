'use client'; // Ensure this component runs on the client side
import React, { useEffect, useState } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { client, urlFor } from "../sanity/lib/client";
import { groq } from "next-sanity";
import BaseSettings from '../components/baseSettings/index';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Sanity query for site settings
const query = groq`*[_type == "siteSettings"][0]`;

function generateMetadata(siteSettings) {
  return {
    title: siteSettings?.seo?.title || "Default Title",
    description: siteSettings?.seo?.description || "Default Description",
    keywords: siteSettings?.seo?.keywords || "default, keywords",
    siteName: siteSettings?.siteName || "Default Site Name",
  };
}

export default function RootLayout({ children }) {
  const [siteSettings, setSiteSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const settings = await client.fetch(query);
      setSiteSettings(settings);
      setLoading(false);
    }
    fetchData();
  }, []);

  const { title, description, keywords, siteName } = generateMetadata(siteSettings);
  const faviconUrl = siteSettings?.favicon ? urlFor(siteSettings.favicon).url() : null;
  const ogImageUrl = siteSettings?.seo?.ogImage ? urlFor(siteSettings.seo.ogImage).url() : null;

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        {faviconUrl && <link rel="icon" href={faviconUrl} />}

        {/* Open Graph Metadata */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={siteName} />
        {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_SITE_URL || "https://treehousemusic.org"}
        />

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {ogImageUrl && <meta name="twitter:image" content={ogImageUrl} />}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Show loader while fetching */}
        {loading ? (
          <div className="loader-container">
            <div className="loader" />
          </div>
        ) : (
          <>
            <BaseSettings baseSettings={siteSettings?.baseSettings} />
            {children}
          </>
        )}
      </body>
    </html>
  );
}
