/* eslint-env node */
const gulp = require("gulp");

const jasmine = require('gulp-jasmine');
// Sources for workflow
const browserSyncRef = require("browser-sync"); //  For an enhanced workflow
const autoprefixer = require("gulp-autoprefixer"); // Transforms css for the support of older browsers
const eslint = require("gulp-eslint");

// Sources for optimization
const uglifycss = require("gulp-uglifycss");
const uglify = require("gulp-uglify"); // uglify js
const pump = require("pump"); // propper stream-error reporting
const concat = require("gulp-concat");

// Static server
const browserSync = browserSyncRef.create(); // Creates new instance

//browserSync.init({
//        server: {
//                baseDir: ["app/dist"] // Array: Order where browserSync searches for files
//        }
//});


//gulp.task('lint', () => {
//        // ESLint ignores files with "node_modules" paths.
//        // So, it's best to have gulp ignore the directory as well.
//        // Also, Be sure to return the stream from the task;
//        // Otherwise, the task may end before the stream has finished.
//        return gulp.src(['app/js/**/*.js', '!node_modules/**'])
//                // eslint() attaches the lint output to the "eslint" property
//                // of the file object so it can be used by other modules.
//                .pipe(eslint())
//                // eslint.format() outputs the lint results to the console.
//                // Alternatively use eslint.formatEach() (see Docs).
//                .pipe(eslint.format())
//                // To have the process exit with an error code (1) on
//                // lint error, return the stream and pipe to failAfterError last.
//                .pipe(eslint.failAfterError());
//});


gulp.task("browserSyncWatcher", () => {
        gulp.watch("app/*.html", gulp.series("html"));
        gulp.watch("app/css/**/*.css", gulp.series("compressCss"));
        gulp.watch("app/js/**/*.js", gulp.series("testJS", "compressJs"));
        gulp.watch("spec/**/*.js", gulp.series("testJS"));

});

gulp.task("compressJs", () => {
        return gulp.src("app/js/**/*.js")
                .pipe(concat("main.min.js"))
                //.pipe(uglify())
                .pipe(gulp.dest("app/dist/js"))
                .pipe(browserSync.stream());
});


gulp.task("compressCss", () => {
        return gulp.src("app/css/**/*.css")
                .pipe(concat("main.min.css"))
                .pipe(gulp.dest("app/dist/css"))
                .pipe(browserSync.stream());
});

gulp.task("html", () => {
        return gulp.src("app/*.html")
                .pipe(gulp.dest("app/dist"))
                .pipe(browserSync.stream());
});


gulp.task("testJS", () => {
    return gulp.src('spec/**/*.js')
        // gulp-jasmine works on filepaths so you can't have any plugins before it 
     .pipe(jasmine());
});

gulp.task("compress", gulp.parallel("compressJs", "compressCss"));

gulp.task("default", gulp.series("browserSyncWatcher"));
