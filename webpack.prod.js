const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');


module.exports = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[hash].js'
    },
    entry: './src/index.prod.js',
    module: {
        
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },{
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                        importLoaders: 1,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer'),
                                    require('cssnano')({preset: ['default', {discardComments: {removeAll: true}}]})
                                ];
                            }
                        }
                    },
                ]
            },{
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                'file-loader'
                ]
            },{
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                {
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'asstes',
                        publicPath: 'assets'
                    }
                }
                ]
            }
            
        ]
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                terserOptions: {
                    output: {
                        comments: false,
                    }
                },
                extractComments: false,
                minify: TerserPlugin.uglifyJsMinify,

            }),
        ]
    },
    externals: {
        jquery: 'jQuery'
    },
    plugins: [
        /* 只是要在 HTML 添加打包好的 webpack 檔案 */
        // new HtmlWebpackPlugin(),
        /* 或者也可以定義要使用的樣版，或其他更多參數 */
        new HtmlWebpackPlugin({
            title: 'MTK',
            template: 'src/index.html'          // 以 index.html 這支檔案當作模版注入 html
        }),
        // 將樣式輸出成 css 檔
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        }),
        new CopyPlugin({
            patterns: [
            { from: 'src/assets', to: 'assets', noErrorOnMissing: true },
            { from: 'src/vendors', to: 'vendors', noErrorOnMissing: true},
            { from: 'src/config.prod.js', to: './config.js'}
            ],
        }),
        new HtmlWebpackTagsPlugin({
            append: true, 
            useHash:true,
            scripts: [{path:'config.js'} ]
        }),
        new CleanWebpackPlugin()
    ]
}