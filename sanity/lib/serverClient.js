import 'server-only' // <-- if a client component imports this, Next will error (good!)
import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion } from '@/sanity/env'

export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN, // read/drafts
})

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN, // create/update/delete
})
