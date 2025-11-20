# Node.js & App Router Migration Guide

## ✅ Completed Migration Steps

### 1. Dependencies Updated
- ✅ Next.js: 12.0.9 → 15.0.0
- ✅ React: 17.0.2 → 18.3.1
- ✅ React DOM: 17.0.2 → 18.3.1
- ✅ TypeScript: 4.6.1-rc → 5.3.0
- ✅ All MDX and remark/rehype plugins updated
- ✅ Removed Preact (now using React 18)

### 2. App Router Structure Created
- ✅ `app/layout.tsx` - Root layout with metadata
- ✅ `app/page.tsx` - Homepage (Server Component)
- ✅ `app/blog/page.tsx` - Blog listing page
- ✅ `app/blog/page/[page]/page.tsx` - Blog pagination
- ✅ `app/blog/[...slug]/page.tsx` - Individual blog posts
- ✅ `app/projects/page.tsx` - Projects page
- ✅ `app/talks/page.tsx` - Talks page
- ✅ `app/tags/page.tsx` - Tags listing
- ✅ `app/tags/[tag]/page.tsx` - Tag pages
- ✅ `app/not-found.tsx` - 404 page

### 3. Components Updated
- ✅ `components/PostHogProvider.tsx` - Client component for PostHog
- ✅ `components/ClientReload.tsx` - Updated for App Router navigation
- ✅ `app/layout.tsx` - Integrated PostHog and ClientReload

### 4. Configuration Updated
- ✅ `next.config.js` - Updated for Next.js 15, removed Preact
- ✅ `package.json` - Updated all dependencies
- ✅ `tsconfig.json` - Already compatible

## ⚠️ Required: Node.js Upgrade

**Current Node.js**: v15.14.0  
**Required**: Node.js 18.18.0 or higher (Node.js 22 recommended)

### Upgrade Steps:

1. **Using nvm (recommended)**:
   ```bash
   nvm install 22
   nvm use 22
   ```

2. **Or download from nodejs.org**:
   - Visit https://nodejs.org/
   - Download Node.js 22 (current version)
   - Install and restart terminal

3. **Verify installation**:
   ```bash
   node --version  # Should show v22.x.x or v18.18+
   npm --version
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Test the build**:
   ```bash
   npm run build
   ```

## 📝 Migration Notes

### App Router vs Pages Router

The migration uses **App Router** (new) alongside **Pages Router** (legacy). Next.js 15 supports both:

- **App Router** (`app/` directory): 
  - Server Components by default
  - Better performance
  - Modern React features
  - Used for: homepage, blog, projects, talks, tags

- **Pages Router** (`pages/` directory):
  - Still works for compatibility
  - Can be migrated gradually
  - Currently: `_app.tsx`, `_document.tsx`, `404.tsx` still in pages

### Key Changes

1. **Server Components**: All App Router pages are Server Components by default
2. **Metadata**: Uses `metadata` export instead of `<Head>` or SEO components
3. **Static Params**: `generateStaticParams()` replaces `getStaticPaths()`
4. **Data Fetching**: Direct async functions in components instead of `getStaticProps()`
5. **Navigation**: `useRouter` from `next/navigation` instead of `next/router`

### Breaking Changes

- Removed Preact alias (now using React 18)
- Client components must use `'use client'` directive
- Some hooks moved to `next/navigation`

## 🚀 Next Steps After Node.js Upgrade

1. Run `npm install` to install updated dependencies
2. Test locally: `npm run dev`
3. Build: `npm run build`
4. Gradually migrate remaining pages from Pages Router to App Router
5. Remove `pages/` directory once fully migrated (optional)

## 📚 Resources

- [Next.js 15 Upgrade Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
- [App Router Documentation](https://nextjs.org/docs/app)
- [React Server Components](https://react.dev/reference/rsc/server-components)

