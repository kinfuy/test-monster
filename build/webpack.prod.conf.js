const { merge } = require('webpack-merge');
const webapckBaseConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const CompressPlugin = require('./plugin/CompressPlugin');
const pkg = require('./../package.json');
const CopyPlugin = require('copy-webpack-plugin');
const copyResources = [
  {
    from: path.resolve(__dirname, path.join('../src/manifest.json')),
    to: `${path.resolve('dist')}/manifest.json`,
  },
  {
    from: path.resolve(__dirname, path.join('../src/assets')),
    to: `${path.resolve('dist')}/assets`,
  },
  {
    from: path.resolve(__dirname, path.join('../src/style')),
    to: `${path.resolve('dist')}/libs/style`,
  },
  {
    from: path.resolve(__dirname, path.join('../src/libs/plugin/hot-reload.js')),
    to: `${path.resolve('dist')}/libs/plugin/hot-reload.js`,
  },
];
module.exports = merge(webapckBaseConfig, {
  mode: 'production',
  entry: {
    popup: path.resolve(__dirname, '../src/source/popup.ts'),
    option: path.resolve(__dirname, '../src/source/option.ts'),
    content: path.resolve(__dirname, '../src/libs/content.ts'),
    inject: path.resolve(__dirname, '../src/libs/inject.ts'),
    background: path.resolve(__dirname, '../src/libs/background.ts'),
  }, // 入口文件
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '../../assets',
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '../../assets/font',
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist/libs/script'),
    libraryTarget: 'umd', //类库加载方式
    umdNamedDefine: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: copyResources,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './../src/views/popup.html'),
      filename: '../views/popup.html',
      chunks: ['popup'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './../src/views/option.html'),
      filename: '../views/option.html',
      chunks: ['option'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './../src/views/background.html'),
      filename: '../views/background.html',
      chunks: ['background'],
    }),
    // new CompressPlugin({
    //   fileName: `EasySwitch-V${pkg.version}.zip`,
    //   target: 'version',
    // }),
    // new FileManagerPlugin({
    //   events: {
    //     onEnd: {
    //       delete: [`EasySwitch-V${pkg.version}.zip`],
    //       archive: [{ source: './dist', destination: `EasySwitch-V${pkg.version}.zip` }],
    //     },
    //   },
    // }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false, //不将注释提取到单独的文件中
      }),
    ],
  },
});
