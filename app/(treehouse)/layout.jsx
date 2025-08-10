// app/(treehouse)/layout.jsx — server file
import localFont from 'next/font/local'
import BaseSettings from '@/components/baseSettings'
import { serverClient } from '@/sanity/lib/serverClient'
import { groq } from 'next-sanity'
import '../globals.css' // correct if globals.css lives in app/globals.css

const geistSans = localFont({
  src: './fonts/GeistVF.woff',      // <-- was ../, change to ./
  variable: '--font-geist-sans',
  weight: '100 900',
  display: 'swap',
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',  // <-- keep ./
  variable: '--font-geist-mono',
  weight: '100 900',
  display: 'swap',
})

const settingsQuery = groq`*[_type == "siteSettings"][0]`
export const revalidate = 60

export default async function SiteLayout({ children }) {
  const siteSettings = await serverClient.fetch(settingsQuery)
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <BaseSettings baseSettings={siteSettings?.baseSettings} />
      {children}
    </div>
  )
}
