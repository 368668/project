const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    index: path.join(__dirname, 'src/js/index.js'),
    about: path.join(__dirname, 'src/js/about.js')
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js",
    // assetsSubDirectory: 'static', // 静态文件目录
    // publicPath: './static/'
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                // "corejs": {
                //   "version": 3
                // },
                // "useBuiltIns": "usage",
              }]
            ],
            plugins: [
              ['@babel/transform-runtime', {
                "absoluteRuntime": false,
                "corejs": 3,
                "helpers": true,
                "regenerator": true,
                "useESModules": false,
                "version": "7.0.0-beta.0"
              }]
            ]
          }
        }
      }, {
        test: /\.css$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              ident: 'postcss',
              // parser: 'sugarss',
              plugins: (loader) => [
                require('postcss-import')({
                  root: loader.resourcePath
                }),
                require('postcss-cssnext')(),
                require('cssnano')()
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'file-loader'
      },
      {
        test: /\.html$/,
        //处理html中的img 引入路径  使用的是commonjs 解析
        loader: 'html-loader',
      }, {
        test: /\.(ttf|woff|eot|svg)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/views/index.html',
      chunks: ['index'],
      minify: {
        removeComments: true //移除注释
      }
    }),
    new HtmlWebpackPlugin({
      template: 'src/views/about.html',
      chunks: ['about'],
      filename: "about.html",
      minify: {
        removeComments: true //移除注释
      }
    }),
    new UglifyJsPlugin({
      cache: true,
      parallel: true
    }),
    new MiniCssExtractPlugin(),
    new OptimizeCssAssetsPlugin()
  ],
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8000,
    open: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}