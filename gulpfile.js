var gulp = require('gulp'),
    webpack = require('webpack'),
    webpackDevServer = require('webpack-dev-server'),
    config = require('./webpack.config'),
    argv = require('yargs').argv,
    preprocess = require('gulp-preprocess')

gulp.task('default', ['html:watch'], function() {
  new webpackDevServer(webpack(config), {
    contentBase: config.output.path,
    hot: true,
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" }
  }).listen(config.port, 'localhost', function (err, result) {
    if (err) {
      console.log(err)
    }
    console.log('Listening at localhost:' + config.port)
  })
})

gulp.task('html', function() {
  return gulp.src('./src/*.html')
    .pipe(preprocess({context: { NODE_ENV: argv.production ? 'production' : 'development'}}))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('html:watch', ['html'], function() {
  gulp.watch('./src/*.html', ['html'])
})