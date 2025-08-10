import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion } from '@/sanity/env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // published, cached reads
})
