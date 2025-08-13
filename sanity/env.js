// sanity/env.js
// Use **static** env reads so Next.js can inline them at build time.

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID;

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET;

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-07';

if (!projectId || !dataset) {
  throw new Error('Missing Sanity projectId or dataset envs');
}
