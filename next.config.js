module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = { fs: "empty", module: "empty" };
    }
    return config;
  },
  images: {
    domains: [
      "i.scdn.co",
      "scontent-ort2-2.xx.fbcdn.net",
      "scontent-ort2-1.xx.fbcdn.net",
    ],
  },
};
