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

  const { title, description, keywords } = generateMetadata(siteSettings);
  const faviconUrl = siteSettings?.favicon ? urlFor(siteSettings.favicon).url() : null;

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        {faviconUrl && <link rel="icon" href={faviconUrl} />}
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
