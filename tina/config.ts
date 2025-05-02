import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
      outputFolder: "admin",
      publicFolder: "static",
  },
  media: {
      tina: {
          mediaRoot: "images",
          publicFolder: "assets",
      },
      accept: ['image/jpeg', 'image/webp', 'image/png', 'image/svg']
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
      stopwordLanguages: ['eng'],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
  schema: {
      collections: [
        {
          name: "news",
          label: "News",
          path: "content/news",
          ui: {
              filename: {
                  readonly: true,
                  slugify: (values) => {
                      const postDate = values.date ? new Date(values.date) : new Date();
                      return `${postDate.toISOString().split("T")[0].replace(/-/g, "")}-${values?.title?.toLowerCase()
              .replace(/ /g, "-").replace(/[^a-zA-Z0-9-]/g, '')}`
                  },
              },
          },
          fields: [
              {
                  type: "string",
                  name: "title",
                  label: "Title",
                  isTitle: true,
                  required: true,
              },
              {
                  type: "string",
                  name: "author",
                  label: "Author",
              },
              {
                  type: "datetime",
                  name: "date",
                  label: "Publish Date",
                  required: true,
                  description: 'Posts will appear around 8:00am local time on the given date'
              },
              {
                  name: 'draft',
                  label: 'Draft',
                  type: 'boolean',
                  description: 'If this is checked the post will not be published',
              },
              {
                  type: "image",
                  label: "Featured image",
                  name: "image",
                  description: "Image which appears at the top of the post"
              },
              {
                  type: "rich-text",
                  name: "body",
                  label: "Body",
                  isBody: true,
              },
          ],
          defaultItem: () => {
            return {
              "author": "Swayzee EDC",
              "date": Date(),
              "draft": false,
            }
          }
       }, 
      ],
  },
});