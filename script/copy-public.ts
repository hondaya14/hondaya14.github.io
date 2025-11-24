import { promises as fs } from "fs";
import path from "path";

const TARGET_EXTENSIONS = new Set(["png", "jpg", "jpeg", "webp", "gif"]);

async function copyPublic() {
  const srcRoot = path.join(process.cwd(), "content-master", "blog");
  const destRoot = path.join(process.cwd(), "public", "blog");

  try {
    const entries = await fs.readdir(srcRoot, { withFileTypes: true });
    let copied = 0;
    let skipped = 0;

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const slug = entry.name;
      const dirPath = path.join(srcRoot, slug);
      const files = await fs.readdir(dirPath, { withFileTypes: true });
      const destDir = path.join(destRoot, slug);
      await fs.mkdir(destDir, { recursive: true });

      let foundAny = false;
      for (const f of files) {
        if (!f.isFile()) continue;
        const ext = path.extname(f.name).replace(/^\./, "").toLowerCase();
        if (!TARGET_EXTENSIONS.has(ext)) continue;
        const src = path.join(dirPath, f.name);
        const dest = path.join(destDir, f.name);
        await fs.copyFile(src, dest);
        copied++;
        foundAny = true;
        console.log(
          `📸 Copied ${path.relative(process.cwd(), src)} -> ${path.relative(process.cwd(), dest)}`,
        );
      }
      if (!foundAny) skipped++;
    }

    console.log(`✅ Done. Copied: ${copied}, Skipped (no matches): ${skipped}`);
  } catch (err) {
    console.error("❌ Failed to copy thumbnails:", err);
    process.exit(1);
  }
}

await copyPublic();
