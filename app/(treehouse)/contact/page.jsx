// app/(treehouse)/contact/page.jsx  — server component
import { groq } from 'next-sanity'
import { serverClient } from '@/sanity/lib/serverClient'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export const revalidate = 60 // or 0 if you want freshest on every request

const query = groq`*[_type == "page" && slug.current == "contact"][0]{
  "footer": *[_type == "footer"][0],
  "contactModule": modules[_type == "contact"][0]
}`

export default async function ContactPage() {
  const data = await serverClient.fetch(query)

  return (
    <main className="w-full">
      {data?.contactModule && <Contact data={data.contactModule} />}
      {data?.footer && <Footer data={data.footer} />}
    </main>
  )
}
