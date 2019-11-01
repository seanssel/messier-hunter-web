const workboxBuild = require("workbox-build");

// Run after all assets are built
workboxBuild.generateSW({
  globDirectory: "public",
  globPatterns: ["**/*.{css,woff,ico,jpg,png,js,json}"],
  swDest: "public/sw.js"
});
