# FakeStore — React + FakeStoreAPI demo

A submission-ready Vite + React e-commerce SPA built for the FakeStore assignment. Wired entirely to [FakeStoreAPI](https://fakestoreapi.com) — no backend.

## Stack

- **Vite** + **React 19**
- **React Router** v7 (HashRouter — works on any static host)
- **Axios** for API calls
- **React Bootstrap** + **Bootstrap 5** (imported in `src/main.jsx`)

## Routes

| Path | Page | Purpose |
| --- | --- | --- |
| `/` | Home | Hero, featured products, category chips |
| `/products` | ProductListing | Full catalog, search, category filter |
| `/products/:id` | ProductDetails | Single product, Add to Cart / Edit / Delete |
| `/add-product` | AddProduct | Form → POST `/products` |
| `/edit-product/:id` | EditProduct | Prefilled form → PUT `/products/:id` |

## Run locally

```bash
cd fakestore-app
npm install
npm run dev      # vite dev server
npm run build    # production build → dist/
npm run preview  # serve the built bundle
```

## Mock API caveat

FakeStoreAPI is a **mock backend**. POST / PUT / DELETE requests return success and echo data back, but they do **not** persist. Every success surface in this app explains this clearly.
