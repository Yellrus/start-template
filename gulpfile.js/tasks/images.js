const changed = require('gulp-changed'),
    { src, dest } = require('gulp'),
    svgo = require('gulp-svgo'),
    config = require('../config').images;

const images = () =>
    src(config.src)
        .pipe(changed(config.dest))
        .pipe(
            svgo({
                plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
            }),
        )
        .pipe(dest(config.dest));

module.exports = images;
