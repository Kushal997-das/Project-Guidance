## Getting Started

First, install dependency:

```bash
npm install
```

Yarn:

```bash
yarn install
```

If facing engine compatibility error during installation use:

```bash
npm install --ignore-engines
```

Yarn:

```bash
yarn install --ignore-engines
```


## Setting Up Enviournment Variables & Sanity.io Project

Set your enviournment variables and make sure you keep them secret and do not push them accidently. A sample .env.local file can be find as .env.local.template. Just rename it to .env.local and paste your secret keys in it.

You will have to setup an project using sanity cli:

1. Login to your sanity account.
2. Install sanity cli on your computer. You can refer to [this](https://www.sanity.io/docs/getting-started-with-sanity-cli).
3. Once installed you should see something like this on running command
4. Create a new sanity project with clean template. Leave the project output path blank and rest of the configuration defalt.
5. Update your project id and api version in env file.
6. Head over to your sanity.io project dasboard and in API section create and API tocken to get you API key.
7. Update your env file and add your API key to it.
8. You can also set CORS origin in API section when running in production. Uou can add your deployed project URL in CORS settings.

Steps are shown here:

Login to your sanity cli:
```bash
sanity login
```

Initialize the project:
```bash
sanity init
```

![image](https://user-images.githubusercontent.com/63797338/216545870-9b50d4c7-4d93-4590-8689-34813f8fe25c.png)

Select default configurations and select clean schema in schema selection. Also leave the output path empty and name your project whatever you like. Enter y on using typescript. After that select a package manager of your choice (preffered yarn).

![image](https://user-images.githubusercontent.com/63797338/216552476-c94a0ca6-259c-4e67-abac-cc33d093a6b3.png)

Once the project is created you can head on to your sanity.io [Dashboard](https://www.sanity.io/manage) Login to your account and you will be able to see your project listed on the Manage section.

![image](https://user-images.githubusercontent.com/63797338/216553186-a97abb6a-e2ce-40c5-bd98-a79dbb353a82.png)

Copy the project id and move to the api section and add cors origin for http://localhost:3000 and if you deploy then deployed URL link. **Make sure to click on allow credentials.**:

![image](https://user-images.githubusercontent.com/63797338/216554057-20e35c36-8b1b-43a1-8297-6945a0a84a8f.png)

![image](https://user-images.githubusercontent.com/63797338/216553762-b93489a0-abae-45a1-9ee5-7d2f1130e34b.png)

![image](https://user-images.githubusercontent.com/63797338/216553904-d9f7d49b-7343-44d5-ba2c-bdc3816a9832.png)

Now you can delete your sanity project folder on vs code or from project directory:

![image](https://user-images.githubusercontent.com/63797338/216554531-894dbe98-e01f-4548-b8bb-2661c6deb48a.png)

Create a new api token **with editor permissions** and copy it:

![image](https://user-images.githubusercontent.com/63797338/216555212-ab2d0c33-8d26-4de2-ae54-ae54acab22fa.png)

Copy the token and keep it secret from everyone for demonstration purpose i am showing it.

![image](https://user-images.githubusercontent.com/63797338/216555444-cffd67ed-4df5-4ece-b349-2664abd832e3.png)

Open the env.local.template file and paste the required things from sanity.io and rename it to **.env.local**

![image](https://user-images.githubusercontent.com/63797338/216555842-8d66d424-3d4e-40f6-a69e-b3c105bc8fa2.png)

**Make sure you dont expose this file anywhere.**

## Running Dev Server

To run devlopment server:

```bash
npm run dev
```

Yarn:

```bash
yarn dev
```

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Adding blogs and accessing Sanity Studio.

1. To access your sanity studio and edit blogs in real time, just head over to [http://localhost:3000/studio](http://localhost:3000/studio).
2. Login with a valid account that is authorized in Sanity.io and you will be able to see studio to edit and add blogs.
3. To be able to see preview before actual update on site, you will have to activate the preview mode by visiting [http://localhost:3000/api/preview](http://localhost:3000/api/preview).
4. You will be able to see preview of changes you make on your site in realtime without even publishing them now.
5. To turn of preview mode just visit [http://localhost:3000/api/exit-preview](http://localhost:3000/api/exit-preview).

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

![image](https://user-images.githubusercontent.com/63797338/216556667-413bf056-b6fb-4aa5-8570-b536c4d04faf.png)

Go to [http://localhost:3000/studio](http://localhost:3000/studio) and login with your sanity account to access the studio.

![image](https://user-images.githubusercontent.com/63797338/216557158-7b481a6f-e77a-456a-853a-537a60763958.png)

Add a blog or edit a blog using sanity studio and publish it to see them on site.

![image](https://user-images.githubusercontent.com/63797338/216558734-f7a914d0-2ef4-4e6d-adb4-307c4c54efcd.png)

After adding/ updating.

![image](https://user-images.githubusercontent.com/63797338/216558956-5c1ae6aa-a361-47e8-88fa-5ba8bfb0cfad.png)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
