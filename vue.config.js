const { defineConfig } = require("@vue/cli-service");

const { REPO_NAME = "/" } = process.env;

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? REPO_NAME : "/",
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.module.rules.delete("svg");
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: "vue-svg-loader",
        },
      ],
    },
  },
});
