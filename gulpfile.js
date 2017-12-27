var gulp = require('gulp'),
    header = require('gulp-header'),
    pkg = require('./package.json'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass')
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    handlebars = require('gulp-compile-handlebars'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    // uglify = require('gulp-uglify'); //es5
    uglify = require('gulp-uglify-es').default, // es6
    browserSync = require('browser-sync').create();

var config = {
    header: '/*!\n* <%= pkg.name %> - v <%= pkg.version %> \n* <%= pkg.description %> \n* Author :<%= pkg.author %>\n*/\n\n',
    sassOptions: {
        outputStyle: 'compressed'
    },
    src: {
        css: '../src/assets/site/css',
        js: '../src/assets/site/js',
        img_src: "./dist/assets/img/**/*",
        img_dist: "../src/assets/site/img",
        fonts_src: "./dist/assets/fonts/**/*",
        fonts_dist: "../src/assets/site/fonts",
    },
    css: {
        src: ['./src/scss/**/*.scss'],
        dist: "./dist/assets/css",
        map: "./maps",
        prefixerOptions: {
            browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
        }
    },
    js: {
        src: [
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/popper.js/dist/umd/popper.js',
            './node_modules/bootstrap/dist/js/bootstrap.min.js',
            './node_modules/wowjs/dist/wow.min.js',
            './node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
            './node_modules/jquery-parallax.js/parallax.min.js',
            './src/js/scripts.js'
        ],
        watch: './src/js/scripts.js',
        dist: "./dist/assets/js",
        file: "script.js"
    },
    

    html: {
        src: './src/templates/*.hbs',
        watch: ['./src/templates/**/*.hbs', './src/json/*.json'],
        ltrData: './src/json/en.json',
        rtlData: require('./src/json/ar.json'),
        options: {
            ignorePartials: true,
            batch: ['./src/templates/partials'],
            helpers: {
                capitals: function (str) {
                    return str.toUpperCase();
                },
                reverse: function (arr) {
                    arr.reverse();
                },
                delay: function (num, del) {
                    return num / 2 * del;
                },
                plus: function (num, inc) {
                    return num + inc;
                }
            }
        }
    }
}

 

// ----------------------------------------------------
// -------------   handlebars/html  -------------------
// ----------------------------------------------------

 
gulp.task('hbs', function () {
    return gulp.src(config.html.src)
        .pipe(handlebars(config.html.rtlData, config.html.options))
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(rename({
            suffix: '-rtl',
            extname: '.html'
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream({once: true}));
});


// ----------------------------------------------------
// -----------------   sass/css  ----------------------
// ----------------------------------------------------

gulp.task('style', function () {
    return gulp.src(config.css.src)
        // .pipe(sourcemaps.init())
        .pipe(sass(config.sassOptions).on('error', sass.logError))
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(header(config.header, {
            pkg: pkg
        }))
        .pipe(autoprefixer(config.css.prefixerOptions))
        //  .pipe(sourcemaps.write(config.css.map))
        .pipe(gulp.dest(config.css.dist))
        .pipe(browserSync.stream());
})

// ----------------------------------------------------
// -----------------   javascript/js  -----------------
// ----------------------------------------------------
gulp.task('script', function () {
    browserSync.notify("please wait");
    return gulp.src(config.js.src)
        .pipe(concat(config.js.file))
        .pipe(uglify({
            mangle: true
        }))
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(header(config.header, {
            pkg: pkg
        }))
        .pipe(gulp.dest(config.js.dist))
        .pipe(browserSync.stream());
}) 





var slider= {
    src: [
        './src/js/jquery.themepunch.tools.min.js',
        './src/js/jquery.themepunch.revolution.min.js',
        './src/js/slider.js'
    ],
    dist: "./dist/assets/js",
    file: "slider.js"
};

gulp.task('slider', function () {
    browserSync.notify("please wait");
    return gulp.src(config.slider.src)
        .pipe(concat(config.slider.file))
        .pipe(uglify({
            mangle: false
        }))
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(header(config.header, {
            pkg: pkg
        }))
        .pipe(gulp.dest(config.slider.dist));

})

// ----------------------------------------------------
// -----------------   watch/files  -----------------
// ---------------------------------------------------- 

gulp.task('watch', function () {
    browserSync.init({
        port: 4300,
        server: {
            baseDir: "./dist" 
        }
    });
    gulp.watch(config.js.watch, ['script']);
    gulp.watch(config.css.src, ['style']);
    gulp.watch(config.html.watch, ['hbs']);
    gulp.watch(config.slider.src, ['slider']);
})
 


 
gulp.task('default', ['script', 'style', 'hbs', 'watch']);


handlebars.Handlebars.registerHelper('isequal', function (v1, v2, options) {

    if (v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this)
})

handlebars.Handlebars.registerHelper('times', function (n, block) {
    var accum = '';
    for (var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});
handlebars.Handlebars.registerHelper('for', function (from, to, incr, block) {
    var accum = '';
    for (var i = from; i < to; i += incr)
        accum += block.fn(i);
    return accum;
});

handlebars.Handlebars.registerHelper('each_upto', function (ary, max, options) {
    if (!ary || ary.length == 0)
        return options.inverse(this);

    var result = [];
    for (var i = 0; i < max && i < ary.length; ++i)
        result.push(options.fn(ary[i]));
    return result.join('');
});

handlebars.Handlebars.registerHelper('each_fromto', function (ary, from, max, options) {
    if (!ary || ary.length == 0)
        return options.inverse(this);

    var result = [];
    for (var i = from; i < max + from && i < ary.length; ++i)
        result.push(options.fn(ary[i]));
    return result.join('');
});