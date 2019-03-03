const { series, parallel, watch } = require('gulp'),
    bs = require('browser-sync'),
    config = require('./config'),
    clean = require('./tasks/clean'),
    sprite = require('./tasks/sprite'),
    scss = require('./tasks/scss'),
    html = require('./tasks/html'),
    images = require('./tasks/images'),
    assets = require('./tasks/assets'),
    report = require('./tasks/report'),
    webpack = require('./tasks/webpack'),
    browserSync = require('./tasks/browserSync');

const tasks = [scss, html, images, assets];

function setBuild(cb) {
    global.env = 'build';
    cb();
}

function setProd(cb) {
    global.env = 'prod';
    cb();
}

function reload(cb) {
    bs.reload();
    cb();
}

function watchFiles(cb) {
    global.env = 'watch';

    watch(config.sprite.src, series(sprite, reload));
    watch(config.scss.src, scss);
    watch(config.images.src, series(images, reload));
    watch(config.html.src, series(html, reload));
    cb();
}

const _default = series(clean, setBuild, sprite, parallel(...tasks, webpack)),
    _prod = series(clean, setProd, sprite, parallel(...tasks, webpack), report),
    _watch = series(clean, watchFiles, sprite, parallel(...tasks), browserSync);

module.exports = {
    default: _default,
    production: _prod,
    watch: _watch,
};
