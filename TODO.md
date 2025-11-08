# Add SEO and Search Tags to Product Upload/Update Form

## Tasks
- [ ] Update `prisma/schema.prisma` to add `seo` and `tags` fields to Product model
- [ ] Update `src/types/index.ts` to include SEO and tags in Product interface
- [ ] Update `src/data/index.ts` to handle new fields in mapping functions
- [ ] Update product form in `src/app/admin/products/[...id]/page.tsx` to include SEO and tags inputs
- [ ] Run Prisma migration to update database
- [ ] Test the form to ensure new fields work correctly
