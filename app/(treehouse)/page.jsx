// app/(treehouse)/page.jsx — server component
import { groq } from 'next-sanity'
import { serverClient } from '@/sanity/lib/serverClient'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import QuoteSection from '@/components/QuoteSection'
import AboutVideosReel from '@/components/AboutVideosReel'
import Instruments from '@/components/Instruments'
import WhyTreehouse from '@/components/WhyTreehouse'
import OurPrograms from '@/components/OurPrograms'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'
import Contact from '@/components/Contact'
import AboutPhotosReel from '@/components/AboutPhotosReel'
import ClassOfferingsCarousel from '@/components/ClassOfferingsCarousel'

export const revalidate = 60

const query = groq`*[_type == "page" && slug.current == "home"][0]{
  ...,
  "header": *[_type == "header"][0],
  "footer": *[_type == "footer"][0],
  modules[]{
    ...,
    _type == "aboutVideosReel" => {
      ...,
      videos[]{
        label,
        src,                         
        poster,                      
        "fileUrl": video.asset->url, 
        "posterUrl": poster.asset->url
      },
    },
    _type == "aboutPhotosReel" => {
      ...,
      photos[]{
        ...,
        "url": asset->url,
        "ratio": asset->metadata.dimensions.aspectRatio
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
  aboutVideosReel: 'about',
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
    case 'aboutVideosReel':       return <AboutVideosReel key={m._key} data={m} />
    case 'ourClass':    return <Instruments data={m} />
    case 'why':         return <WhyTreehouse data={m} />
    case 'program':     return <OurPrograms data={m} />
    case 'testimonial': return <Testimonials key={m._key} data={m} />
    case 'contact':     return <Contact data={m} />
    case 'aboutPhotosReel': return <AboutPhotosReel key={m._key} data={m} />
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
