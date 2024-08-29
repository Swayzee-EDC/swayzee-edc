import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
    "stackbitVersion": "~0.6.0",
    "nodeVersion": "18",
    "ssgName": "hugo",
    "contentSources": [
        new GitContentSource({
          rootPath: __dirname,
          contentDirs: ["content"],
          models: [
            {
              name: "Post",
              type: "news",
              urlPath: "/{slug}",
              filePath: "content/news/{slug}.md",
              fields: [
                  { label: "Title", name: "title", type: "string", required: true },
                  { label: "Description", name: "description", type: "string" },
                  { label: "Author", name: "author", type: "string", default: "Swayzee EDC" },
                  { label: "Publish Date", name: "date", type: "datetime" },
                  { label: "Tags", name: "tags", type: "list", required: false },
                  { label: "Featured Image", name: "image", type: "image", required: false },
                  { label: "Body", name: "body", widget: "markdown" }
              ]
            }
          ],
          assetsConfig: {
            referenceType: "static",
            staticDir: "static",
            uploadDir: "images/uploads",
            publicPath: "/images/uploads"
          }
        })
    ],
    "postInstallCommand": "npm i --no-save @stackbit/types"
})
