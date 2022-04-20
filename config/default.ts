
const del = require('del');
const gulp = require('gulp');
const yargs = require('yargs');
const replace = require('gulp-string-replace');
const dayjs = require('dayjs');

const { ng, version } = require('./cmd');
const { Dashboard } = require('./dashboard');

/** Node project configuration */
const npmconfig = require('../package.json');
/** Command line arguments */
const argv = yargs.argv;
/** Angular CLI arguments */
const ngargs: string[] = [];

const library_path = './projects/library';

if (argv.prod || (argv.demo === true && argv.prod !== 'false')) { ngargs.push('--prod'); }
if (argv.aot || (argv.demo === true && argv.aot !== 'false')) { ngargs.push('--aot'); }
if (argv.port && !isNaN(parseInt(argv.port, 10))) { ngargs.push(`--port=${parseInt(argv.port, 10)}`); }
if (argv.ssl) { ngargs.push('--ssl'); }

Dashboard.show(argv.prod ? 'prod' : 'dev');

/** Nuke old build assets */
gulp.task('clean', () => ((...globs: string[]) => del(globs))('dist/', 'compiled/', '_package'));

/** Build the library */
gulp.task('ng:build', () => ng('build', 'library', ...ngargs));

/** Serve the demo with the library */
gulp.task('ng:serve', () => ng('serve', 'demo', ...ngargs));

/** Update version details to the current time and version */
gulp.task('version:update', () => {
    const v = npmconfig.version;
    const b = dayjs().startOf('s').valueOf();
    return gulp.src([`${library_path}/src/lib/library.module.ts`]) // Any file globs are supported
        .pipe(replace(/public static version = '[0-9a-zA-Z.-]*'/g, `public static version = '${v}'`, { logs: { enabled: true } }))
        .pipe(replace(/readonly build = dayjs\([0-9]*\);/g, `readonly build = dayjs(${b});`, { logs: { enabled: true } }))
        .pipe(gulp.dest(`${library_path}/src/lib`));
});

/** Return version details back to the dev details */
gulp.task('version:clean', () => {
    const v = npmconfig.version;
    const b = dayjs().startOf('s').valueOf();
    return gulp.src([`${library_path}/src/lib/library.module.ts`]) // Any file globs are supported
        .pipe(replace(/public static version = '[0-9a-zA-Z.-]*'/g, `public static version = 'local-dev'`, { logs: { enabled: true } }))
        .pipe(replace(/readonly build = dayjs\([0-9]*\);/g, `readonly build = dayjs();`, { logs: { enabled: true } }))
        .pipe(gulp.dest(`${library_path}/src/lib`));
});

/** Copy root project version into  */
gulp.task('version:copy', () => {
    const v = require('../package.json').version;
    return gulp.src([`${library_path}/package.json`]) // Any file globs are supported
        .pipe(replace(/"version": "[0-9a-zA-Z.-]*"/g, `"version": "${v}"`, { logs: { enabled: true } }))
        .pipe(gulp.dest(library_path));
});

/** Run pre build tasks */
gulp.task('pre-build', gulp.series('version:copy', 'version:update'));

/** Run post build tasks */
gulp.task('post-build', gulp.series('version:clean'));

/** Run build tasks */
gulp.task('build', gulp.series('pre-build', 'ng:build', 'post-build'));

/** Run serve tasks */
gulp.task('serve', gulp.series('ng:serve'));