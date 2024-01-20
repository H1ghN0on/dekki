const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
            @import "@/assets/scss/_variables.scss";
          `,
      },
    },
  },
  devServer: {
    allowedHosts: [
      '.loca.lt'
    ]
  },
});
