const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
	entry: './src/main.ts',
	// entry: path.resolve(__dirname, './src/main.js'),
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name]-[chunkhash:6].js',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.less$/,
				use: [
					miniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'less-loader',
				],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				// loader: 'file-loader',
				loader: 'url-loader',
				options: {
					name: '[name]-[hash:6].[ext]',
					publicPath: '../images',
					outputPath: 'images',
					limit: 1024 * 50, //1024等于1K  这里显示的是50k
					esModule: false,
				},
			},
			{
				test: /\.(woff|woff2|svg|eot)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					publicPath: '../font',
					outputPath: 'font',
					// publicPath: '../'
				},
			},
			{
				test: /\.ts/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			// {
			//   test: /\.js$/,
			//   use: {
			//     loader: 'babel-loader',
			//     // options: {
			//     //   presets: [
			//     //     [
			//     //       "@babel/preset-env",
			//     //       {
			//     //         "corejs": 2,
			//     //         "useBuiltIns": "usage"
			//     //       }
			//     //     ]
			//     //   ]
			//     //   // presets: ["@babel/preset-env"]
			//     // }
			//   }
			// }
		],
	},
	plugins: [
		new htmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
		}),
		new CleanWebpackPlugin(),
		new miniCssExtractPlugin({
			filename: 'css/[name].css', // [name]是根据入口的占位符生成的
		}),
		new VueLoaderPlugin(),
	],
	mode: 'development',

	devtool: 'source-map', //定位错误
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js',
			'@': path.resolve(__dirname, 'src'),
		},
	},
	devServer: {
		// contentBase: './dist', //这个一般都不会去改的
		port: 667, //服务器端口
		open: true, //自动打开浏览器的窗口
		// 配置代理 处理跨域
		proxy: {
			'/api': {
				target: 'http://localhost:777',
			},
		},
	},
}
