'use client'; // Ensures this component runs on the client side
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

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader" />
      </div>
    );
  }

  const seo = siteSettings?.seo || {};
  const baseSettings = siteSettings?.baseSettings || {};
  const faviconUrl = siteSettings?.favicon ? urlFor(siteSettings.favicon).url() : null;
  const ogImage = seo.image ? urlFor(seo.image).url() : "/default-og-image.jpg"; // Fallback for OG image

  return (
    <html lang="en">
      <head>
        {/* SEO Metadata */}
        <title>{seo.title || "Default Title"}</title>
        <meta name="description" content={seo.description || "Default Description"} />
        <meta name="keywords" content={seo.keywords || "default, keywords"} />

        {/* Favicon */}
        {faviconUrl && <link rel="icon" href={faviconUrl} />}

        {/* Open Graph (OG) Tags */}
        <meta property="og:title" content={seo.title || "Default Title"} />
        <meta property="og:description" content={seo.description || "Default Description"} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={seo.url || "https://example.com"} />
        <meta property="og:type" content="website" />

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title || "Default Title"} />
        <meta name="twitter:description" content={seo.description || "Default Description"} />
        <meta name="twitter:image" content={ogImage} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          backgroundColor: baseSettings.bg1 || "#fff", // Main background color
          color: baseSettings.textBlack || "#000", // Text color
        }}
      >
        <BaseSettings baseSettings={baseSettings} />
        {children}
      </body>
    </html>
  );
}
