# Contentstack + Next.js Landing Page with Syntax Highlighting

This is a basic landing page built with [Contentstack CMS](https://www.contentstack.com/) and [Next.js](https://nextjs.org/), with server-side code highlighting using `rehype-highlight`.

---

## Features

- Content-managed pages using Contentstack
- Modular blocks: Hero, Blogs, CTA, Code Blocks
- Syntax-highlighted code blocks via `<pre>` tags
- Language switcher and copy button for code
- Responsive layout with Tailwind CSS

---

## Tech Stack

- Next.js
- Contentstack CMS
- Tailwind CSS
- Rehype + rehype-highlight
- html-react-parser

---

## 1. Contentstack Setup

### Create a `page` Content Type with:

- `title` (Text)
- `url` (Text)
- `page_components` (Modular Block)

#### Modular Blocks:

- `hero_banner`: title, subtitle, image
- `blog`: references to blog entries
- `cta`: heading, button, link
- `code_block`: title, description, language, code (rich text with `<pre>`)

---

## 2. Project Setup

### Install dependencies

```bash
npm install
````

### Create `.env.local`

```env
CONTENTSTACK_API_KEY=your_api_key
CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
CONTENTSTACK_ENVIRONMENT=your_env
```

---

## 3. Development

### Start the dev server

```bash
npm run dev
```

Then visit: `http://localhost:3000/sdk/java` or `/sdk/typescript` (based on your CMS data).

```

