'use client'; // Ensure this component runs on the client side
import React, { useEffect, useState } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { client, urlFor } from "../sanity/lib/client";
import { groq } from "next-sanity";
import BaseSettings from '../components/baseSettings/index';

// Local font setup
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
      try {
        const settings = await client.fetch(query);
        setSiteSettings(settings);
      } catch (error) {
        console.error("Error fetching site settings from Sanity:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Fallbacks for metadata
  const title = siteSettings?.seo?.title || "Default Title";
  const description = siteSettings?.seo?.description || "Default Description";
  const keywords = siteSettings?.seo?.keywords || "default, keywords";
  const faviconUrl = siteSettings?.favicon ? urlFor(siteSettings.favicon).url() : "/favicon.ico";
  const ogImageUrl = siteSettings?.seo?.ogImage ? urlFor(siteSettings.seo.ogImage).url() : "/og-image.jpg";

  return (
    <html lang="en">
      <head>
        {/* Metadata */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        {faviconUrl && <link rel="icon" href={faviconUrl} />}

        {/* Open Graph Metadata */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}
        <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"} />

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {ogImageUrl && <meta name="twitter:image" content={ogImageUrl} />}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Loader during fetch */}
        {loading ? (
          <div className="loader-container">
            <div className="loader" />
          </div>
        ) : (
          <>
            {/* Apply base settings dynamically */}
            <BaseSettings baseSettings={siteSettings?.baseSettings} />
            {children}
          </>
        )}
      </body>
    </html>
  );
}
