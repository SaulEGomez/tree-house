'use client';

import React, { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';

const query = groq`*[_type == "page" && slug.current == "contact"][0]{
  "header": *[_type == "header"][0],
  "footer": *[_type == "footer"][0],
  modules[]{
    _type == "contact" => {
      subtitle,
      title,
      description,
      address,
      email,
      phone,
      placeholders
    }
  }
}`;

export default function ContactPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await client.fetch(query);
        console.log('Fetched data:', result); // Debugging: Log the result
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

  if (!data) {
    return (
      <main className="w-full py-[50px] px-[20px]">
        <h1>Error: Data not found</h1>
        <p>Please check your Sanity query and data structure.</p>
      </main>
    );
  }

  const contactData = data?.modules?.find((module) => module._type === 'contact');

  return (
    <main className="w-full">
      {data?.header && <Header data={data.header} />}
      {contactData ? (
        <Contact
          data={{
            ...contactData,
            placeholders: contactData?.placeholders || {},
          }}
        />
      ) : (
        <p>No contact data available.</p>
      )}
      {data?.footer && <Footer data={data.footer} />}
    </main>
  );
}
