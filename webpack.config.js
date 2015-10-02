var path = require('path'),
    webpack = require('webpack')

var port = 8888

module.exports = {
  port: port,
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:' + port,
    'webpack/hot/only-dev-server',
    './src/lib/main'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'assets/js/[name].js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['react-hot', 'babel-loader'], exclude: /node_modules/ },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader?modules!postcss-loader'] },
    ]
  },
  postcss: [
    require('autoprefixer-core')
  ]
}