"use client"

import MDXContent from './content.mdx'
import { mdxCodeComponents } from '@/components/MdxCode'

export default function Page() {
  return <MDXContent components={mdxCodeComponents} />
}
