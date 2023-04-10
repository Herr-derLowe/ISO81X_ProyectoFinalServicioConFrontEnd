const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    const appProxy = createProxyMiddleware({
        target: process.env.API_URL,
        secure: false
    });

    app.use(
        '/api',
        appProxy
    );
};
