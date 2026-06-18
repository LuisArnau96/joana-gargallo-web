import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
export const client = createClient({
  projectId: '2xr1irjz',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const builder = imageUrlBuilder(client)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlFor = (source: any) => builder.image(source)
