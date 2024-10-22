## Product Description Genie: Generate Product Descriptions with AI on a WYSIWYG Text Editor

1. Install Dependencies

   ```
   pnpm install
   ```

   1. Setup your environment variables

```bash
cp .env.example .env.development.local
```

1. Then, open the `.env.development.local` file and fill in the required environment variables.

- You'll also need an `OPENAI_API_KEY` to access the OpenAI API.
- You'll need all the `POSTGRES_*` variables from the Vercel dashboard to access the Vercel Postgres API. The Vercel Postgres API is used to store the current backgrounds and their status.
- You'll need a `BLOB_READ_WRITE_TOKEN` from the Vercel dashboard to access the Vercel Blob API. The Vercel Blob API is used to store the uploaded images.
  1. You can get all the Vercel variables by using the Vercel CLI:

```
vercel env pull
```

1. Initialize your DB

   ```
   psql "<YOUR POSTGRES_URL>" -f src/db/schema.psql
   ```

2. Run the development server

   ```
   pnpm dev
   ```
