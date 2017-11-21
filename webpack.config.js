/*used for running example*/

var webpack = require('webpack');
var path = require('path');
var sourcePath = path.join(__dirname, './src');
// plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var outPath = path.join(__dirname, './dist');
module.exports = {
  context: sourcePath,
  devtool: "source-map",
  entry: './index.tsx',
  output: {
    path: outPath,
    filename: 'bundle.js',
    publicPath: '/'
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx', 'tls']
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // (jsnext:main directs not usually distributable es6 format, but es6 sources)
  },
  module: {
    loaders: [
      // .ts, .tsx
      
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader', 'awesome-typescript-loader'
        ],
        exclude: ["/node_modules"]
      }, {
        test: /\.xcss$/,
        loader: "style-loader!css-loader"
      }, //for import css files
      // css
      {
        test: /\.css$/, //for import as modules
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                sourceMap: true,
                importLoaders: 1,
                localIdentName: '[local]__[hash:base64:5]'
              }
            }
          ]
        })
      }, {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          }, {
            loader: "css-loader" // translates CSS into CommonJS
          }, {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      }, 
      // static assets
      {
        test: /\.html$/,
        use: 'html-loader'
      }, {test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }        
    ]
  },
  plugins: [    
    new webpack.LoaderOptionsPlugin({
      options: {
        context: sourcePath,
        postcss: [
          require('postcss-import')({addDependencyTo: webpack}),
          require('postcss-url')(),
          require('postcss-cssnext')(),
          require('postcss-reporter')(),
          require('postcss-browser-reporter')({disabled: false})
        ]
      }
    }),
    new ExtractTextPlugin({filename: 'styles.css', disable: true}),
    new HtmlWebpackPlugin({template: 'index.html'})/*,
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: Infinity
    }),
    new webpack.optimize.AggressiveMergingPlugin()*
    ,
    */
  ],
  devServer: {
    contentBase: sourcePath,
    hot: true,
    stats: {
      warnings: false
    }
  },
  node: {
    // workaround for webpack-dev-server issue
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs: 'empty',
    net: 'empty'
  }
};