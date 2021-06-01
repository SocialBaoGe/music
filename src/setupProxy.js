const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(createProxyMiddleware('/api', {
    target: 'http://mobilecdnbj.kugou.com/',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/api"
    }
  }))
}