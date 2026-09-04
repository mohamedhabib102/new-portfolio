import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prisma = new PrismaClient();

async function main() {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../portfolio-data.json'), 'utf8'));
  const projects = data.projects;

  console.log(`Found ${projects.length} projects to sync...`);

  for (const proj of projects) {
    console.log(`Upserting project: ${proj.slug} (${proj.titleEn})`);
    await prisma.project.upsert({
      where: { id: proj.id },
      create: {
        id: proj.id,
        slug: proj.slug,
        titleEn: proj.titleEn,
        titleAr: proj.titleAr,
        descriptionEn: proj.descriptionEn,
        descriptionAr: proj.descriptionAr,
        videoUrl: proj.videoUrl,
        liveUrl: proj.liveUrl,
        githubUrl: proj.githubUrl,
        githubPrivate: Boolean(proj.githubPrivate),
        tags: proj.tags || [],
        featured: Boolean(proj.featured),
        order: proj.order || 0,
        featuresEn: proj.featuresEn || [],
        featuresAr: proj.featuresAr || [],
      },
      update: {
        slug: proj.slug,
        titleEn: proj.titleEn,
        titleAr: proj.titleAr,
        descriptionEn: proj.descriptionEn,
        descriptionAr: proj.descriptionAr,
        videoUrl: proj.videoUrl,
        liveUrl: proj.liveUrl,
        githubUrl: proj.githubUrl,
        githubPrivate: Boolean(proj.githubPrivate),
        tags: proj.tags || [],
        featured: Boolean(proj.featured),
        order: proj.order || 0,
        featuresEn: proj.featuresEn || [],
        featuresAr: proj.featuresAr || [],
      },
    });
  }

  console.log('Sync completed successfully!');
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
