# Veldform site

Marketing site for **Veldform** — bespoke botanical environments. Next.js (App Router), deployed to Cloudflare Workers via OpenNext.

## Develop locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuration

Set these as environment variables (`.env.local` locally, `npx wrangler secret put <NAME>` in production):

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes, for the enquiry form | [Resend](https://resend.com) API key used to email enquiries. |
| `ENQUIRY_FROM` | Once the domain is verified in Resend | Sender, e.g. `Veldform <enquiries@veldform.com>`. |
| `ENQUIRY_TO` | No | Recipient; defaults to `site.contactEmail`. |
| `NEXT_PUBLIC_SITE_URL` | Before launch | Public origin for canonical URLs, sitemap and share tags. Defaults to `https://veldform.com`. |

## Deploy (Cloudflare)

```bash
npm run preview   # Workers build, locally
npm run deploy    # requires an authenticated Wrangler
```

After launch, submit `/sitemap.xml` in Google Search Console.

## Structure

| Path | Purpose |
| --- | --- |
| `src/content/site.ts` | Page copy and search (SEO) copy — edit here first |
| `src/content/seo.ts` | Per-page title, description, canonical and share tags |
| `src/app/` | Routes: `/`, `/lifestyle`, `/systems`, `/environments`, `/process`, `/enquire`, `/portal` (placeholder, not indexed) |
| `src/app/enquire/actions.ts` | Enquiry form handler (sends via Resend) |
| `src/app/{sitemap,robots,manifest}.ts` | Generated `sitemap.xml`, `robots.txt`, web manifest |
| `src/app/{favicon.ico,icon.png,apple-icon.png}` | Browser, Android and Apple icons |
| `src/components/environments/` | Environments page (climate explorer, plant rows) |
| `src/styles/` | Global styles (`eden.css` foundation, `veldform.css` site layout) |

### Assets (`public/`)

| Path | Contents |
| --- | --- |
| `images/home/` | Home page: desktop/mobile hero (+ B&W fade), section images, lifestyle cards, video poster |
| `images/lifestyle/` | Lifestyle page artwork |
| `images/environments/` | Climate photos, concept renders and `plants/` thumbnails |
| `images/systems/` | Materials grid and sensor icon sprites |
| `images/portal/` | Portal placeholder artwork |
| `images/shared/` | Used on every page (footer strawberry) |
| `videos/` | Home page video |
| `fonts/` | IBM Plex Mono subsets used by the Environments page |
| `og/` | Link-preview (Open Graph) image |
