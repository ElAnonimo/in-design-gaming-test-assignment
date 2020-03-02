const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js$/,
        exclude: /node_modules/,
        sourceMap: true
      })
    ]
  },
  mode: 'production',
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
				use: [
					MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                localIdentName: '[hash:base64:6]'
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({ template: './src/index.html' }),
		new MiniCssExtractPlugin({ filename: 'style.css' }),
    // make OptimizeCssAssetsPlugin generate style.css.map. It won't w/o the cssProcessorOptions listed
    // https://github.com/webpack-contrib/mini-css-extract-plugin/issues/141#issuecomment-409335555
    // for OptimizeCssAssetsPlugin options see the link at the post #1 bottom at
    // https://github.com/NMFR/optimize-css-assets-webpack-plugin/issues/81
		new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        map: {
          inline: false,
          annotation: true
        }
      }
    }),
		new CompressionPlugin({ algorithm: 'gzip' }),
		new BrotliPlugin()
	]
};
