import imageUrlBuilder from '@sanity/image-url'
import { projectId, dataset } from '@/sanity/env'
const builder = imageUrlBuilder({ projectId, dataset })
export const urlFor = (src) => builder.image(src)

