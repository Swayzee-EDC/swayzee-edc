import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
    "stackbitVersion": "~0.6.0",
    "nodeVersion": "18",
    "ssgName": "hugo",
    "preInstallCommand": "IFS=:; find -L $PATH -maxdepth 1 -type f -perm -100 -print;",
    "postInstallCommand": "npm i --no-save @stackbit/types @stackbit/cms-git",
    "devCommand": "hugo server --port {PORT} --baseURL {HOSTNAME}",
    "contentSources": [
        new GitContentSource({
          rootPath: __dirname,
          contentDirs: ["content"],
          models: [
            {
              type: "page",
              name: "news",
              label: "Post",
              urlPath: "/{slug}",
              filePath: "content/news/{slug}.md",
              fields: [
                  { name: "title", type: "string", required: true },
                  { name: "description", type: "string" },
                  { name: "author", type: "string", default: "Swayzee EDC" },
                  { label: "Publish Date", name: "date", type: "datetime" },
                  { name: "tags", type: "list", items: { "type": "string" }},
                  { label: "Featured Image", name: "image", type: "image", required: false },
                  { name: "content", type: "markdown" }
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
    ]
})
