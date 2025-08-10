import { groq } from 'next-sanity'
import { serverClient } from '@/sanity/lib/serverClient'
import KingdomSoundForm from '@/components/KingdomSoundForm'
import Footer from '@/components/Footer'

export const revalidate = 60

const formQuery = groq`
  *[_type == "kingdomSound" && _id == "kingdomSound"][0]{
    subtitle, description, address, email, phone, instruments, successMessage
  }
`
const footerQuery = groq`*[_type == "footer"][0]`

export default async function KingdomSoundPage() {
  const [formDoc, footer] = await Promise.all([
    serverClient.fetch(formQuery),
    serverClient.fetch(footerQuery),
  ])

  const safeData = {
    subtitle: formDoc?.subtitle ?? 'Kingdom Sound',
    description: formDoc?.description ?? 'Please fill out this interest form for the Kingdom Sound program.',
    address: formDoc?.address ?? '123 Music Street, Los Angeles, CA 90001',
    email: formDoc?.email ?? 'info@treehousemusic.org',
    phone: formDoc?.phone ?? '+1 (323) 781-7221',
    instruments: formDoc?.instruments ?? ['Voice', 'Guitar', 'Bass', 'Drums', 'Piano'],
    successMessage: formDoc?.successMessage ?? 'Thank you for your interest in Kingdom Sound!',
  }

  return (
    <main className="w-full">
      <KingdomSoundForm data={safeData} />
      {footer && <Footer data={footer} />}
    </main>
  )
}
