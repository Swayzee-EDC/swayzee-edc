[![Netlify Status](https://api.netlify.com/api/v1/badges/0a8dce28-a380-4270-b0a0-93ba62b9aab5/deploy-status)](https://app.netlify.com/sites/swayzee-edc/deploys)

# Dependencies
- npm
- hugo

# Install
```shell
# get the source
git clone --recursive git@github.com:csparker247/swayzee-edc.git

# install requirements
npm install
```

# Build
```shell
npm run build
```

# Run the dev server
```shell
# start the web server
hugo server --port 3000

# Run the dev server with local Tina CMS support
npm run start:tina
```