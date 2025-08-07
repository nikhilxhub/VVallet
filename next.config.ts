import type { NextConfig } from "next";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";

const nextConfig: NextConfig = {
  // webpack: (config) => {
  //   config.plugins = config.plugins || [];
  //   config.plugins.push(new NodePolyfillPlugin());
  //   return config;
  // },
};

export default nextConfig;
