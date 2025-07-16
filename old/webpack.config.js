// webpack.config.js
const path = require('path')
const webpack = require('webpack')

const pathOutput = path.resolve(__dirname, 'dev')
const pathBuild = path.resolve(__dirname, 'build')
const pathNodeModules = path.resolve(__dirname, 'node_modules')

const env = process.env.NODE_ENV
const isProd = env === 'production'
const libraryName = 'alfrid'
console.log('Environment isProd :', isProd)

const entryPoint = process.argv.filter(arg => arg.indexOf('.js') > -1)[0]
const entryJs = entryPoint || './dev/main.js'
console.log('Entry Point :', entryJs)

const plugins = isProd
  ? [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        drop_debugger: true,
        drop_console: false,
        screw_ie8: true
      },
      comments: false,
      mangle: false
    })
  ] : [
    new webpack.HotModuleReplacementPlugin()
  ]

const entry = isProd ? { app: `./src/${libraryName}.js` }
  : { app: entryJs }
const output = isProd ? {
  path: pathBuild,
  filename: `./${libraryName}.js`,
  library: libraryName,
  libraryTarget: 'umd',
  umdNamedDefine: true
} : {
  filename: 'bundle.js',
  path: pathOutput
}

const devtool = 'source-map'

const config = {
  entry,
  devtool,
  devServer: {
    host: '0.0.0.0',
    contentBase: './dev',
    hot: true,
    disableHostCheck: true
  },
  plugins,
  output,
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
        // exclude: pathNodeModules
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: pathNodeModules
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: pathNodeModules
      },
      {
        test: /\.(glsl|vert|frag)$/,
        use: ['raw-loader', 'glslify-loader'],
        exclude: pathNodeModules
      }
    ]
  },
  resolve: {
    alias: {
      shaders: path.resolve(__dirname, 'dev/shaders'),
      src: path.resolve(__dirname, 'src')
    }
  }
}

module.exports = config
