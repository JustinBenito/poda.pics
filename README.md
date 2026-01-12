# Podu.pics

**Fast, open-source image hosting with a stunning experience.**

Podu.pics is a developer-focused, privacy-first image hosting utility built with Next.js and Cloudflare R2. It turns your images into shareable links instantly, without the bloat of traditional hosting platforms.

![Podu.pics Preview](public/preview.png)

## Features

- **Instant Uploads**: Optimized upload flow using presigned URLs direct to the edge.
- **Dither Visuals**: A unique, interactive background experience powered by Three.js and custom shaders.
- **Privacy First**: Anonymous uploads, zero tracking, and no database requirements.
- **Edge Storage**: Powered by Cloudflare R2 for zero-egress fees and global speed.
- **Short Links**: Clean, URL-friendly IDs generated via NanoID.

## Architecture

Podu.pics is built for maximum speed and minimum cost:
- **Client**: Direct-to-Edge uploads via S3 Presigned URLs.
- **Serverless**: Dynamic image serving through Next.js App Router.
- **Storage**: Cloudflare R2 (S3-compatible, zero-egress storage).

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Visuals**: [Three.js](https://threejs.org/) & [React Three Fiber](https://r3f.docs.pmnd.rs/)
- **Icons**: [Phosphor Icons](https://phosphoricons.com/)
- **Storage**: [Cloudflare R2](https://www.cloudflare.com/products/r2/)
- **ID Generation**: [NanoID](https://github.com/ai/nanoid)

## Getting Started

### Prerequisites

You will need a Cloudflare Account with an R2 bucket configured.

### Environment Setup

Copy `.env.example` to `.env.local` and fill in your Cloudflare credentials:

```bash
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=your_bucket_name
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Contributing

Contributions are welcome! Please check our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Developed with care by [Justin](https://github.com/JustinSane) and [Hari](https://github.com/Hari-Haran-Dev).
