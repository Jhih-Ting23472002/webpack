const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

module.exports = {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
    },
    entry: './src/index.dev.js',
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
                        sourceMap: true
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
                        comments: true,
                    }
                }
            })
        ]
    },
    externals: {
        jquery: 'jQuery'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'MTK',
            template: 'src/index.html' // 以 index.html 這支檔案當作模版注入 html
        }),
        // 將樣式輸出成 css 檔
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        }),
        //如果需要額外複製檔案至指令位置，請在下列設定
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets' , noErrorOnMissing: true},
                { from: 'src/vendors', to: 'vendors', noErrorOnMissing: true},
                { from: 'src/config.dev.js', to: './config.js', noErrorOnMissing: true}
            ],
        }),
        //額外加工 html inject 指定的 script 或 tag
        new HtmlWebpackTagsPlugin({
            append: true, 
            useHash:true,
            scripts: [{path:'config.js'} ]
        }),
        new CleanWebpackPlugin({
            verbose: true,
        })
    ]
}