# Veltform site

Marketing site for **Veltform** — bespoke greenhouses and climate systems. Photography and project visualizations live in `public/images/`.

## Develop locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Cloudflare (later)

Preview the Workers build locally:

```bash
npm run preview
```

Deploy when Wrangler is authenticated and the `veltform` worker name is available in your account:

```bash
npm run deploy
```

Optional next steps: R2 incremental cache, D1 for leads, `/portal` auth — see [OpenNext on Cloudflare](https://opennext.js.org/cloudflare/get-started).

## Structure

| Path | Purpose |
| --- | --- |
| `src/content/site.ts` | All marketing copy (edit here first) |
| `src/styles/eden.css` | edenOS visual foundation |
| `src/styles/veltform.css` | Veltform layout helpers |
| `src/app/portal/` | Placeholder for future customer portal |
| `public/images/` | Reference photography and visualizations |
