const { src, dest } = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    handleErrors = require('../util/handleErrors'),
    config = require('../config').scss,
    postcss = require('gulp-postcss'),
    gulpif = require('gulp-if'),
    nano = require('cssnano'),
    autoprefixer = require('autoprefixer'),
    postcssCustomMedia = require('postcss-custom-media'),
    importer = require('postcss-import'),
    mqpacker = require('css-mqpacker'),
    svgInline = require('postcss-inline-svg'),
    objectFit = require('postcss-object-fit-images'),
    removeClasses = require('../util/removeCssClasses')(config.remove);

const procesors = [
    importer,
    removeClasses,
    postcssCustomMedia,
    autoprefixer(),
    mqpacker({
        sort: true,
    }),
    objectFit,
    svgInline,
];

function scss() {
    const isProd = global.env === 'prod';

    if (isProd) {
        procesors.push(nano(config.compression));
    }

    return (
        src(config.src)
            // Sourcemaps if not prod
            .pipe(gulpif(!isProd, sourcemaps.init()))

            .pipe(sass(config.options))
            .on('error', handleErrors)

            // Post processing
            .pipe(postcss(procesors))

            // Sourcemaps if not prod
            .pipe(gulpif(!isProd, sourcemaps.write()))

            // Dest & reloading
            .pipe(dest(config.dest))
            .pipe(gulpif(!isProd, browserSync.reload({ stream: true })))
    );
}

module.exports = scss;
