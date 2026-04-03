# 🚀 Next.js Project Setup Guide

This guide walks you through creating and running a Next.js project from scratch.

---

## 📦 Prerequisites

Make sure you have the following installed:

* Node.js (v18 or later recommended)
* npm / yarn / pnpm

Check versions:

:::code

```bash
node -v
npm -v
```

:::

---

## ⚡ Create a Next.js App

Run the following command:

:::code

```bash
npx create-next-app@latest my-app
```

```bash
yarn create next-app my-app
pnpm create next-app my-app
```

:::

---

## 🛠️ Setup Options

During setup, you’ll be prompted to configure:

* TypeScript (recommended ✅)
* ESLint
* Tailwind CSS
* App Router (recommended)
* Import alias (`@/*`)

Choose based on your needs.

---

## 📂 Project Structure

:::code

```txt
my-app/
├── app/                # App Router (pages & layouts)
├── public/             # Static assets
├── styles/             # Global styles (if not using Tailwind)
├── components/         # Reusable UI components
├── package.json        # Dependencies & scripts
└── next.config.js      # Next.js config
```

:::

---

## ▶️ Run Development Server

Navigate into your project:

:::code

```bash
cd my-app
```

:::

Start the server:

:::code

```bash
npm run dev
```

:::

Open in browser: `http://localhost:3000`

---

## 🧱 Build for Production

:::code

```bash
npm run build
```

:::

Start production server:

:::code

```bash
npm start
```

:::

---

## ✏️ Editing Pages

Edit the homepage: `app/page.js`

Changes auto-reload in the browser.

---

## 📡 API Routes (Backend inside Next.js)

Create a route: `app/api/hello/route.js`

Example:

:::code

```javascript
export async function GET() {
  return Response.json({ message: "Hello World" });
}
```

:::

Access: `http://localhost:3000/api/hello`

---

## 🎨 Styling Options

* Tailwind CSS (recommended)
* CSS Modules
* Styled Components

Example (Tailwind):

:::code

```jsx
export default function Home() {
  return <h1 className="text-2xl font-bold">Hello Next.js</h1>;
}
```

:::

---

## 🚀 Deployment

Deploy easily on:

* Vercel (recommended)
* Netlify
* AWS / Docker

For Vercel:

:::code

```bash
npm install -g vercel
vercel
```

:::

---

## 📚 Learn More

* Official Documentation: [https://nextjs.org/docs](https://nextjs.org/docs)
* Learn Next.js: [https://nextjs.org/learn](https://nextjs.org/learn)

---

## 🧠 Pro Tips

* Use **App Router** for modern apps
* Use **Server Components** for performance
* Use **API routes** instead of separate backend (if simple app)
* Enable **SSR/SSG** for SEO optimization
