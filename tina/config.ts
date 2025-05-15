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
          name: "pages",
          label: "Pages",
          path: "content",
          match: {
            include: "*",
            exclude: "*/"
          },
          ui: {
            filename: {
              readonly: false,
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
                description: 'Pages will appear around 8:00am local time on the given date'
            },
            {
                name: 'draft',
                label: 'Draft',
                type: 'boolean',
                description: 'If this is checked the page will not be published',
            },
            {
                type: "rich-text",
                name: "body",
                label: "Body",
                isBody: true,
                templates: [
                  {
                    name: 'gmap',
                    label: 'Google Maps',
                    match: {
                      start: '{{<',
                      end: '>}}',
                    },
                    fields: [
                      {
                        name: '_value',
                        label: 'Location',
                        type: 'string',
                        required: true,
                      },
                    ],
                  },
                  {
                    name: 'personnel',
                    label: 'Personnel',
                    match: {
                      start: '{{<',
                      end: '>}}',
                    },
                    fields: [
                      {
                        name: 'src',
                        label: 'Source',
                        type: 'string',
                        required: true,
                      },
                    ],
                  },
                ],
            },
            {
              type: "string",
              name: "aliases",
              label: "Page aliases",
              description: 'Alternative page names (URL suffixes) for accessing this page',
              list: true,
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
        {
          name: "personnel",
          label: "Personnel",
          path: "data",
          match: {
            include: "{officers,board-members}",
          },
          ui: {
            allowedActions: {
              create: false,
              delete: false,
              createNestedFolder: false,
            }
          },
          format: 'json',
          fields: [
            {
              type: "object",
              label: "Member",
              description: "Members of the personnel list (in display order)",
              name: "members",
              list: true,
              ui: {
                itemProps: (item) => {
                  var label = item?.name ? item?.name : "[Unnamed entry]";
                  if (item?.title) {
                    label = label + " (" + item.title + ")";
                  }
                  if (item?.image) {
                    label = label + "  🖼️";
                  }
                  return { label: label };
                }
              },
              fields: [
                {
                  label: "Name",
                  name: "name",
                  type: "string",
                  required: true,
                },
                {
                  label: "Title",
                  name: "title",
                  type: "string",
                  description: "Optional, e.g. President, Treasurer, Secretary"
                },
                {
                  type: "image",
                  label: "Image",
                  name: "image",
                  description: "Optional"
              },
              ],
            },
        ]
        } 
      ],
  },
});