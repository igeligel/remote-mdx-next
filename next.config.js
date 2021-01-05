module.exports = {
  webpack: (config, { isServer }) => {
    // console.log({ config });
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = { fs: 'empty' };
    }
    return config;
  },
};
