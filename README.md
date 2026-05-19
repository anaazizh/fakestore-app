# FakeStore E-Commerce React Project

**Author:** Ana Aziz Hemani
**Repository:** https://github.com/anaazizh/fakestore-app

## Overview

This is **Ana Aziz Hemani's FakeStore E-Commerce React project** — a single-page e-commerce application built with Vite and React that demonstrates product browsing, search, filtering, and CRUD interactions against a mock product API.

> **Note on FakeStoreAPI:** [https://fakestoreapi.com/](https://fakestoreapi.com/) is **only the external mock API** used by this project as a data source for products and to receive test CRUD responses. It is **not** the project's website, and it is **not** owned by or affiliated with the author of this project. This repository is the actual project; FakeStoreAPI is just an upstream third-party service.

## Tech Stack

- **Vite** — build tool and dev server
- **React 19** — UI library
- **React Router v7** (HashRouter) — client-side routing
- **Axios** — HTTP client for API calls
- **React Bootstrap** + **Bootstrap 5** — UI components and styling

## FakeStoreAPI Mock Behavior

The app talks to [FakeStoreAPI](https://fakestoreapi.com/), which is a **mock backend**. This has important implications:

- `GET` requests return real seed data from the mock service.
- `POST`, `PUT`, and `DELETE` requests **return a success response and echo the submitted data back, but they do not persist**. Refreshing the page or re-fetching will show the original mock data unchanged.

The UI surfaces this behavior on every create/edit/delete success screen so it is clear that no real records are being modified.

## Run Locally

```bash
# Clone the repo
git clone https://github.com/anaazizh/fakestore-app.git
cd fakestore-app

# Install dependencies
npm install

# Start the Vite dev server
npm run dev
```

Additional scripts:

```bash
npm run build    # production build → dist/
npm run preview  # serve the built bundle locally
npm run lint     # run ESLint
```

## Routes

| Path | Page | Purpose |
| --- | --- | --- |
| `/` | Home | Hero, featured products, category chips |
| `/products` | ProductListing | Full catalog, search, category filter |
| `/products/:id` | ProductDetails | Single product, Add to Cart / Edit / Delete |
| `/add-product` | AddProduct | Form → POST `/products` (mock) |
| `/edit-product/:id` | EditProduct | Prefilled form → PUT `/products/:id` (mock) |
