"use client"; // Ensures the component runs on the client-side
import React, { useEffect, useState } from "react";
import { client } from "../sanity/lib/client";
import { groq } from "next-sanity";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QuoteSection from "@/components/QuoteSection";
import About from "@/components/About";
import Instruments from "@/components/Instruments";
import Whyrethme from "@/components/Whyrethme";
import OurPrograms from "@/components/OurPrograms";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer"; // Removed Contact import
import Contact from "@/components/Contact";

const query = groq`*[_type == "page" && slug.current == "home"][0]{
  ...,
  "header": *[_type == "header"][0],
  "footer": *[_type == "footer"][0],
  modules[]
}`;

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await client.fetch(query);
        setData(result);
      } catch (error) {
        console.error("Error fetching data from Sanity:", error);
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

  const modules = data?.modules || [];

  return (
    <main className="w-full">
      <Header data={data.header} />
      {modules.map((module) => {
        switch (module._type) {
          case "hero":
            return <Hero key={module._key} data={module} />;
          case "rating":
            return <QuoteSection key={module._key} data={module} />;
          case "about":
            return <About key={module._key} data={module} />;
          case "ourClass":
            return <Instruments key={module._key} data={module} />;
          case "why":
            return <Whyrethme key={module._key} data={module} />;
          case "program":
            return <OurPrograms key={module._key} data={module} />;
          case "testimonial":
            return <Testimonials key={module._key} data={module} />;
          case "contact":
            return <Contact key={module._key} data={module} />;
          default:
            return null; // Return nothing for unknown types
        }
      })}
      <Footer data={data.footer} />
    </main>
  );
}