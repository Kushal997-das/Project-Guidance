## Getting Started

First, install dependency:

```bash
npm install
# or
yarn install
```

## Setting Up Enviournment Variables & Sanity.io Project

Set your enviournment variables and make sure you keep them secret and do not push them accidently. A sample .env.local file can be find as .env.local.template. Just rename it to .env.local and paste your secret keys in it.

You will have to setup an project using sanity cli:

1. Install sanity cli on your computer. You can refer to [https://www.sanity.io/docs/getting-started-with-sanity-cli](this).
2. Create a new sanity project with clean template.
3. Update your project id and api version in env file.
4. Head over to your sanity.io project dasboard and in API section create and API tocken to get you API key.
5. Update your env file and add your API key to it.
6. You can also set CORS origin in API section when running in production. Uou can add your deployed project URL in CORS settings.

## Running Dev Server

To run devlopment server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Adding blogs and accessing Sanity Studio.

1. To access your sanity studio and edit blogs in real time, just head over to [http://localhost:3000/studio](http://localhost:3000/studio).
2. Login with a valid account that is authorized in Sanity.io and you will be able to see studio to edit and add blogs.
3. To be able to see preview before actual update on site, you will have to activate the preview mode by visiting [http://localhost:3000/api/preview](http://localhost:3000/api/preview).
4. You will be able to see preview of changes you make on your site in realtime without even publishing them now.
5. To turn of preview mode just visit [http://localhost:3000/api/exit-preview](http://localhost:3000/api/exit-preview).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
