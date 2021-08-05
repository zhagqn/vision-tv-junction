module.exports = {
  productionSourceMap: false,
  publicPath: "./",
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    proxy: {
      "^/junction": {
        target: "https://junction.hs.titansys.cn/api/junctioncore/v1",
        changeOrigin: true,
        pathRewrite: {
          "^/junction": "",
        },
      },
    },
  },
  configureWebpack: {
    devtool: "source-map",
    performance: {
      hints: "warning",
      maxEntrypointSize: 10000000,
      maxAssetSize: 10000000,
    },
  },
};
