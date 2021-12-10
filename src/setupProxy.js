const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {

    const apiurl = "http://0.0.0.0:3030/"

    app.use(
        '/api',
        createProxyMiddleware({
            target: `${apiurl}`,
            changeOrigin: true,
        })
    );
}
