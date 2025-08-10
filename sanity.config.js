// sanity.config.js  (no 'use client')
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { singletonTools } from 'sanity-plugin-singleton-tools'
import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/structure'
import { projectId, dataset } from './sanity/env'

export default defineConfig({
  basePath: '/studio',
  projectId,                // pulled from env via sanity/env.js
  dataset,                  // pulled from env via sanity/env.js
  schema,                   // your schemaTypes/index.js export
  plugins: [
    structureTool({ structure }),
    singletonTools({
      types: ['siteSettings', 'header', 'footer', 'kingdomSound'],
    }),
    visionTool(),           // optional, for GROQ queries in Studio
  ],
})
