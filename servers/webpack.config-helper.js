'use strict';

const Path = require('path')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractSASS = new ExtractTextPlugin('styles/bundle.css');

module.exports = (options) => {

  let webpackConfig = {
    devtool: options.devtool,
   
     entry: {
      app: './src/scripts/index',
    },
    output: {
      path: Path.join(__dirname, '../dist'),
      filename: 'bundle.js'
    },
    plugins: [
      new Webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(options.isProduction ? 'production' : 'development')
        }
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      })
    ],
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }]
    }
  };

  if (options.isProduction) {
    webpackConfig.entry = './src/scripts/index',
    webpackConfig.plugins.push(
      new Webpack.optimize.OccurrenceOrderPlugin(),
      new Webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      ExtractSASS
    );

    webpackConfig.module.loaders.push({
      test: /\.scss$/i,
      loader: ExtractSASS.extract(['css-loader', 'sass-loader'])
    },
    { test: /\.(woff|woff2|eot|ttf|svg)$/, 
      loader: 'file-loader?name=../fonts/[name].[ext]' 
    },
    { test: /\.(png|jp?g)$/, 
      loader: 'file-loader?name=images/[name].[ext]' 
    },
    { test: /\.(wav|mp3)$/, 
      loader: 'file-loader?name=audio/[name].[ext]' 
    });

  } else {
    webpackConfig.plugins.push(
      new Webpack.HotModuleReplacementPlugin()
    );

    webpackConfig.module.loaders.push({
      test: /\.scss$/i,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    },
    { test: /\.(woff|woff2|eot|ttf|svg)$/, 
      loader: 'file-loader?name=fonts/[name].[ext]' 
    },
    { test: /\.(png|jp?g)$/, 
      loader: 'file-loader?name=images/[name].[ext]' 
    },
    { test: /\.(wav|mp3)$/, 
      loader: 'file-loader?name=audio/[name].[ext]' 
    });

    webpackConfig.devServer = {
      contentBase: './dist',
      hot: true,
      port: options.port,
      inline: true
    };
  }

  return webpackConfig;

}