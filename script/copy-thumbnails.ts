import { promises as fs } from 'fs'
import path from 'path'

async function copyThumbnails() {
  const srcRoot = path.join(process.cwd(), 'content-master', 'blogs')
  const destRoot = path.join(process.cwd(), 'public', 'blogs')

  try {
    const entries = await fs.readdir(srcRoot, { withFileTypes: true })
    let copied = 0
    let skipped = 0

    for (const entry of entries) {
      if (!entry.isDirectory()) continue
      const slug = entry.name
      const src = path.join(srcRoot, slug, 'thumbnail.png')
      const destDir = path.join(destRoot, slug)
      const dest = path.join(destDir, 'thumbnail.png')

      try {
        await fs.access(src)
      } catch {
        skipped++
        continue
      }

      await fs.mkdir(destDir, { recursive: true })
      await fs.copyFile(src, dest)
      copied++
      console.log(`📸 Copied ${path.relative(process.cwd(), src)} -> ${path.relative(process.cwd(), dest)}`)
    }

    console.log(`✅ Done. Copied: ${copied}, Skipped (missing): ${skipped}`)
  } catch (err) {
    console.error('❌ Failed to copy thumbnails:', err)
    process.exit(1)
  }
}

copyThumbnails()

