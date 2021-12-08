const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {

    const apiurl = "http://localhost:3030/"

    app.use(
        '/api',
        createProxyMiddleware({
            target: `${apiurl}`,
            changeOrigin: true,
        })
    );
}
