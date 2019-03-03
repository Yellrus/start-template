const browserSync = require('browser-sync');
const config = require('../config').browserSync;
const webpack = require('webpack'),
    getWebpackConfig = require('../util/getWebpackConfig'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware');

function browserSyncTask(done) {
    const wpConfig = getWebpackConfig('watch'),
        bundler = webpack(wpConfig);

    config.middleware = [
        webpackDevMiddleware(bundler, {
            publicPath: wpConfig.output.publicPath,
            stats: 'minimal',
            hot: true,
        }),
        webpackHotMiddleware(bundler),
    ];

    browserSync.init(config);
    done();
}

module.exports = browserSyncTask;
