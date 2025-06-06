const path = require('path');
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: path.resolve(__dirname, '../hijab/src/main/resources/static/'),

  devServer: {
    port: process.env.VUE_APP_PORT,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_BASE_URL,
      },
    }
  },

  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: [/node_modules/, /\.vue$/],
          use: {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          },
        }
      ]
    },
  },

  pluginOptions: {
    vuetify: {
      // vuetify-loader 설정은 이대로 둬도 OK
    }
  }
});
