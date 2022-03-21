const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin').default;
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");

module.exports = (env)=> ({
  entry: './src/index.js',
  output: {
      filename: env.production ? '[name].prod.[contenthash].js' : '[name].dev.[contenthash].js',
      publicPath: '/',
  },
  module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
            {
              test: /\.s?css$/i,
              use: [
                env.production ? MiniCssExtractPlugin.loader :'style-loader',
                'css-loader',
                'sass-loader',
              ],
            },
            {
              test: /\.(png|jpe?g|gif|svg)$/i,
              loader: 'file-loader',
              options: {
                name:'[name].[contenthash].[ext]',
              },
            },
      ]
  },
  plugins: [
      new HtmlWebPackPlugin({
          title: 'Форма оплаты',
      }),
      new MiniCssExtractPlugin({
        filename: env.production ? '[name].[contenthash].min.css' : '[name].[contenthash].min.css',
      }),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
  },
  optimization: {
    minimizer: [
      "...",
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              [
                "svgo",
                {
                  plugins: extendDefaultPlugins([
                    {
                      name: "removeViewBox",
                      active: false,
                    },
                    {
                      name: "addAttributesToSVGElement",
                      params: {
                        attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                      },
                    },
                  ]),
                },
              ],
            ],
          },
        },
      }),
    ],
  },

});
