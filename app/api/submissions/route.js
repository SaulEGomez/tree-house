import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import { projectId, dataset, apiVersion } from '@/sanity/env'

const ALLOWED = new Set(['kingdomSoundSubmissions', 'formSubmissions', 'newsletter'])

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_WRITE_TOKEN, // server-only
  useCdn: false,
})

export async function POST(req) {
  try {
    const { submissionType, formData } = await req.json()

    if (!ALLOWED.has(submissionType)) {
      return NextResponse.json({ ok: false, error: 'Invalid submission type' }, { status: 400 })
    }

    const doc = {
      _type: submissionType,
      ...formData,
      _createdAt: new Date().toISOString(),
    }

    const created = await writeClient.create(doc)
    return NextResponse.json({ ok: true, id: created._id })
  } catch (err) {
    console.error('Sanity write failed:', err)
    return NextResponse.json({ ok: false, error: 'Failed to save submission' }, { status: 500 })
  }
}
