const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: [
    'webpack-hot-middleware/client?reload=true',
	  './src/index.js'
  ],
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	devtool: 'source-map',
	mode: 'development',
	devServer: {
		contentBase: path.join(__dirname, '/dist'),
		hot: true,
		open: false,
		historyApiFallback: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: [
					'babel-loader',
					'eslint-loader'
				]
			},
			{
				test: /\.s?css$/,
        // https://github.com/webpack-contrib/mini-css-extract-plugin/issues/29
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:6]'
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
			},
      {
        test: /\.s?css$/,
        include: path.resolve(__dirname, 'node_modules/bootstrap'),
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({ template: './src/index.html' }),
		new MiniCssExtractPlugin({ filename: 'style.css' })
	]
};
