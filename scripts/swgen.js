const workboxBuild = require("workbox-build");

// Run after all assets are built
workboxBuild.generateSW({
  globDirectory: "public",
  globPatterns: ["**/*.{html,css,woff,ico,jpg,png,js,json}"],
  swDest: "public/sw.js",
   templatedURLs: {
    '/': [
      '../src/views/index.hbs',
     ],
  }
});
