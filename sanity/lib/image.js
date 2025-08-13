// sanity/lib/image.js
import imageUrlBuilder from '@sanity/image-url'
import { projectId, dataset } from '@/sanity/env'

// Build from project config
const builder = imageUrlBuilder({ projectId, dataset })

// Safe helper: returns a builder only if src exists
export const urlFor = (src) => (src ? builder.image(src) : builder.image(''))
