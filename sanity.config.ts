'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemas } from '@/sanity/schemas'

export default defineConfig({
  name: 'joana-gargallo-web',
  title: 'Joana Gargallo',
  projectId: '2xr1irjz',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemas },
})
