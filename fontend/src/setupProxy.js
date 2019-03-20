const proxy = require('http-proxy-middleware');

module.exports = function (app) {

  app.use(proxy('/api', {
    "target":  "http://cms.maocanhua.cn/", //"http://localhost:8080/", //
    // "pathRewrite": {
    //   "^/api": "/"
    // },
    "secure": false,
    "changeOrigin": true
  }));
};
