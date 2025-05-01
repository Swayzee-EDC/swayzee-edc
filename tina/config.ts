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
      mediaRoot: "images/uploads",
      publicFolder: "static",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "news",
        label: "Post",
        path: "content/news",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true, },
          { type: "string", name: "description", label: "Description", },
          { type: "string", name: "author", label: "Author", },
          { 
            type: "datetime", name: "date", label: "Publish Date",
            ui: {
              timeFormat: "HH:mm"
            }, 
          },
          {
            type: "image", label: "Feature image", name: "image"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
