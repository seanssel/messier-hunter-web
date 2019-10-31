const workboxBuild = require("workbox-build");

// Run after all assets are built
workboxBuild.generateSW({
  globDirectory: "public",
  globPatterns: ["**/*.{css,woff,jpg,js,json}"],
  swDest: "public/sw.js"
});
