'use client';

import React, { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';

// Define a GROQ query to fetch contact-specific data
const query = groq`*[_type == "page" && slug.current == "contact"][0]{
  "footer": *[_type == "footer"][0],
  modules[]{
    ...,
  }
}`;

export default function ContactPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await client.fetch(query);
        setData(result);
      } catch (error) {
        console.error('Error fetching data from Sanity:', error);
      } finally {
        setLoading(false);
      }
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

  const contactData = data?.modules?.find((module) => module._type === 'contact');

  return (
    <main className="w-full">
      <Contact data={contactData} />
      <Footer data={data.footer} />
    </main>
  );
}