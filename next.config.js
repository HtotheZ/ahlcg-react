require('dotenv').config();
const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
const commonsChunkConfig = require('@zeit/next-css/commons-chunk-config');

module.exports = withCss(withSass({
  webpack: (config, { isServer }) => {

    if (!isServer) {
      config = commonsChunkConfig(config, /\.(sass|scss|css)$/);
    }

    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();

      if (entries['main.js'] && !entries['main.js'].includes('./client/polyfills.js')) {
        entries['main.js'].unshift('./client/polyfills.js');
      }

      return entries;
    };

    return config;
  },
  publicRuntimeConfig: {
    BACKEND_URL: process.env.BACKEND_URL,
  },
}));
