// sanity/env.js
const read = (k) =>
  (typeof process !== 'undefined' ? process.env?.[k] : undefined) ??
  (typeof import.meta !== 'undefined' ? import.meta.env?.[k] : undefined)

export const projectId =
  read('NEXT_PUBLIC_SANITY_PROJECT_ID') ?? read('SANITY_STUDIO_PROJECT_ID') ?? ''

export const dataset =
  read('NEXT_PUBLIC_SANITY_DATASET') ?? read('SANITY_STUDIO_DATASET') ?? 'production'

export const apiVersion =
  read('NEXT_PUBLIC_SANITY_API_VERSION') ?? '2024-10-07'

// Be forgiving in dev, strict in production
const missing = !projectId || !dataset
if (missing) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Missing Sanity projectId or dataset envs')
  } else {
    console.warn(
      'Missing Sanity projectId or dataset envs. ' +
      'Set NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET in .env.local ' +
      'or SANITY_STUDIO_PROJECT_ID / SANITY_STUDIO_DATASET in .env.'
    )
  }
}
