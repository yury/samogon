// Config

module.exports = {
  target: 'node',
  context: __dirname + "/lib",
  entry: "./cli",
  output: {
    path: __dirname + "/bin",
    filename: "samogon.js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
}
