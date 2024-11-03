&lt;div align="center"&gt;

&lt;video width="600" controls&gt;&lt;source src="public/videos/ai-product-description.mp4" type="video/mp4"&gt;Your browser does not support the video tag.&lt;/video&gt;

# Product Description Genie

## Generate Product Descriptions with AI on a WYSIWYG Text Editor

### Main Features

- **Live feedback through stream**: Content is streamed directly into the UI.
- **Tailored Content Generation**: User can prompt any product and get a description.
- **Multilanguage**: Content will be generated in the prompted language.
- **Automatic Product Tags:** Tags are generated automatically.
- **Image description**: This features allows the user to upload an image and get a photo description

### Installation:

- We'll use pnpm

  ```sh
  pnpm install
  ```

- Setup your environment variables

```bash
cp .env.example .env.development.local
```

- Then, open the `.env.development.local` file and fill in the required environment variables.
- You'll also need an `OPENAI_API_KEY` to access the OpenAI API.
- You'll need all the `POSTGRES_*` variables from the Vercel dashboard to access the Vercel Postgres API. The Vercel Postgres API is used to store the current backgrounds and their status.
- You'll need a `BLOB_READ_WRITE_TOKEN` from the Vercel dashboard to access the Vercel Blob API. The Vercel Blob API is used to store the uploaded images.
- You can get all the Vercel variables by using the Vercel CLI:

  1. Follow these[ ](https://vercel.com/docs/cli/project-linking)[these steps.](https://vercel.com/docs/cli/link)

- Initialize your DB

  ```
  psql "<YOUR POSTGRES_URL>" -f src/db/schema.psql
  ```

- Run the development server

```
pnpm dev
```

```
pnpm dev
```
