/* eslint-disable @typescript-eslint/no-explicit-any */
import * as webpack from 'webpack';
import * as path from 'path';
import * as fs from 'fs';
import * as TerserPlugin from 'terser-webpack-plugin';
import {Configuration} from 'webpack';

// バージョン情報など
const pjson = require('./package.json');
// 現在の時刻（ビルド時刻）
const build: string = new Date().toISOString();

// Meta.tsを書き込む
fs.writeFileSync(
  path.resolve(path.join(__dirname, 'src/Meta.ts')),
  `import MetaInterface from './interfaces/MetaInterface';

// This file is auto-generated by the build system.
const meta: MetaInterface = {
  version: '${pjson.version}',
  date: '${build}',
};
export default meta;
`
);

module.exports = (env: any, argv: any): Configuration => {
  const isProduction: boolean = argv.mode === 'production';
  const banner = `${pjson.name} v${pjson.version} | ${pjson.author.name} | license: ${pjson.license} | build: ${build}`;

  return {
    mode: isProduction ? 'production' : 'development',
    target: 'node',
    devtool: !isProduction ? 'source-map' : false,
    devServer: {
      contentBase: 'docs',
      open: false,
    },
    entry: {
      reverb: './src/Reverb.ts',
    },
    output: {
      path: path.resolve(__dirname, 'bin'),
      filename: !isProduction ? '[name].js' : '[name].min.js',
      library: 'Reverb',
      libraryTarget: 'umd',
      umdNamedDefine: true,
      globalObject: "(typeof self !== 'undefined' ? self : this)",
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: 2020,
            compress: {drop_console: true},
            output: {
              comments: false,
              beautify: false,
            },
          },
        }),
      ],
      splitChunks: {
        minSize: 0,
      },
      concatenateModules: false,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
        },
      ],
    },
    resolve: {
      modules: [`${__dirname}/src`, 'node_modules'],
      extensions: ['webpack.ts', '.ts', '.tsx'],
    },
    plugins: [
      new webpack.BannerPlugin({
        banner: banner,
      }),
    ],
  };
};
