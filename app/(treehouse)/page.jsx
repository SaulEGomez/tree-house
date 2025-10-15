// app/(treehouse)/page.jsx — server component
import { groq } from 'next-sanity'
import { serverClient } from '@/sanity/lib/serverClient'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import QuoteSection from '@/components/QuoteSection'
import AboutPhotosReel from '@/components/AboutPhotosReel'
import Instruments from '@/components/Instruments'
import Whyrethme from '@/components/Whyrethme'
import OurPrograms from '@/components/OurPrograms'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'
import Contact from '@/components/Contact'
import AboutReels from '@/components/AboutReels'
import ClassOfferingsCarousel from '@/components/ClassOfferingsCarousel'

export const revalidate = 60

const query = groq`*[_type == "page" && slug.current == "home"][0]{
  ...,
  "header": *[_type == "header"][0],
  "footer": *[_type == "footer"][0],
  modules[]{
    ...,

    _type == "aboutPhotosReel" => {
      "ratio": image.asset->metadata.dimensions.aspectRatio
    },

    _type == "aboutReels" => {
      ...,
      photos[]{
        ...,
        "url": asset->url,
        "ratio": asset->metadata.dimensions.aspectRatio
      }
    },

    _type == "aboutPhotosReel" => {
      ...,
      videos[]{
        label,
        src,                         
        poster,                      
        "fileUrl": video.asset->url, 
        "posterUrl": poster.asset->url
      }
    },
    _type == "classOfferings" => {
      title,
      subtitle,
      items[]{
        name,
        description,
        image,
        "imageUrl": image.asset->url
      }
    },
    _type == "testimonial" => {
      ...,
      gallery[]{
        ...,
        "url": asset->url,
        "ratio": asset->metadata.dimensions.aspectRatio
      }
    }
  }
}`

const idMap = {
  hero: 'home',
  rating: 'rating',
  aboutPhotosReel: 'about',
  ourClass: 'ourclass',
  why: 'why',
  program: 'programs',
  testimonial: 'testimonials',
  contact: 'contact',
}

function renderModule(m) {
  switch (m._type) {
    case 'hero':        return <Hero data={m} />
    case 'rating':      return <QuoteSection data={m} />
    case 'aboutPhotosReel':       return <AboutPhotosReel key={m._key} data={m} />
    case 'ourClass':    return <Instruments data={m} />
    case 'why':         return <Whyrethme data={m} />
    case 'program':     return <OurPrograms data={m} />
    case 'testimonial': return <Testimonials key={m._key} data={m} />
    case 'contact':     return <Contact data={m} />
    case 'aboutReels': return <AboutReels key={m._key} data={m} />
    case 'classOfferings': return <ClassOfferingsCarousel data={m} />
    default:            return null
  }
}

export default async function Home() {
  const data = await serverClient.fetch(query)
  const modules = data?.modules || []

  return (
    <main className="w-full">
      {data?.header && <Header data={data.header} />}

      {modules.map((m) => {
        const id = idMap[m._type]
        const content = renderModule(m)
        if (!content) return null
        // Wrap in a section with a stable id for react-scroll
        return id ? (
          <section id={id} key={m._key}>
            {content}
          </section>
        ) : (
          <div key={m._key}>{content}</div>
        )
      })}

      {data?.footer && <Footer data={data.footer} />}
    </main>
  )
}
