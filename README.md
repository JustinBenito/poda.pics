<p align="center">
<img src = 'public/podu-icon.svg' alt='logo' width=200>
<br>
<h1><strong>podu.pics -- An Open-Source ImgBB alternative</strong>  </h1>
<br/>

[![license](https://img.shields.io/badge/license-GPL--3.0-blue?style=flat-square)](https://github.com/FOSSUChennai/podu.pics/blob/main/LICENSE) [![built with next.js](https://img.shields.io/badge/built%20with-next.js-black?style=flat-square)](https://nextjs.org/) [![typescript](https://img.shields.io/badge/typescript-007ACC?style=flat-square)](https://www.typescriptlang.org/) [![stars](https://img.shields.io/badge/stars-28-yellow?style=flat-square)](https://github.com/FOSSUChennai/podu.pics/stargazers)

</p>

<div align = 'center'>
<img src = 'public/demo.gif' alt='demo' width=700>
</div>

## What it is?
Ever heard of an image host that lets you upload images, generate shareable links in a jiffy, and is completely free and open source?

No? That's because this is the first one.

[podu.pics](podu.pics) exists because most "free" image hosts aren't really free. 

(Because remember folks, in FOSS, ***FREE AS IN FREEDOM!***)

## Tech Stack

### **These are the awesome FOSS tools used in building this awesome project!**

<p align="left">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/AWS_SDK-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS SDK" />
</p>

Built with **Next.js**, **React**, and **TypeScript**, styled with **Tailwind CSS**.

The animated background is powered by **Three.js** (via React Three Fiber, with Postprocessing for the shader effects). Images are stored in **Cloudflare R2** using the **AWS SDK**, with **NanoID** generating unique file identifiers. Icons from **Phosphor** and **Lucide**; **ESLint** keeps the codebase consistent.

## Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/FOSSUChennai/podu.pics.git
cd podu.pics
npm install
```

Copy the example environment file and fill in your own storage credentials:

```bash
cp .env.example .env
```

You'll need a Cloudflare R2 bucket (S3-compatible) — the free tier is enough for local development. You'll need your account ID, access key ID, secret access key, and bucket name from your Cloudflare dashboard.

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Contributing

Contributions are welcome! Check open [issues](https://github.com/FOSSUChennai/podu.pics/issues) for something to pick up, or open a new one to discuss a feature or bug before submitting a PR.

## License

This project is licensed under the GPL-3.0 License — see [LICENSE](https://github.com/FOSSUChennai/podu.pics/blob/main/LICENSE) for details.

---
***Developed with love by [Justin](https://github.com/JustinBenito) and [Hari](https://github.com/nammahari) ! <3***
