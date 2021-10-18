const path = require("path");

module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias["components"] = path.resolve("components");
    return config;
  },
  images: {
    domains: ["via.placeholder.com"]
  }
};
