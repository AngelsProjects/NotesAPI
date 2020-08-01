/* eslint-disable @typescript-eslint/no-unsafe-call */
const { CleanWebpackPlugin }     = require('clean-webpack-plugin'),
      Dotenv                     = require('dotenv-webpack'),
      ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin'),
      path                       = require('path'),
      TsconfigPathsPlugin        = require('tsconfig-paths-webpack-plugin'),
      nodeExternals              = require('webpack-node-externals'),
      UglifyJsPlugin             = require('uglifyjs-webpack-plugin'),
      webpack                    = require('webpack'),
      WebpackShellPlugin         = require('webpack-shell-plugin');

const env    = process.env.NODE_ENV || 'development';
console.log('env:', env);
const mode   = env === 'local' ? 'development' : env;
const isDev  = env === 'development' || env === 'local';
const output = isDev
  ? {
    libraryTarget                : 'commonjs2',
    path                         : path.join(__dirname, 'dist'),
    filename                     : 'index.js',
    // Bundle absolute resource paths in the source-map,
    // so VSCode can match the source file.
    devtoolModuleFilenameTemplate: '[absolute-resource-path]'
  }
  : {
    libraryTarget    : 'commonjs2',
    path             : path.join(__dirname, 'dist'),
    chunkFilename    : '[id].js',
    filename         : '[hash].bundle.js',
    sourceMapFilename: '[file].map'
  };

module.exports = {
  context  : __dirname,
  devServer: {
    contentBase       : path.join(__dirname, 'dist'),
    port              : 3001,
    historyApiFallback: true
  },
  devtool  : 'cheap-source-map',
  entry    : ['webpack/hot/poll?100', './src/server.ts'],
  watch    : isDev,
  externals: [nodeExternals({ allowlist: ['webpack/hot/poll?100'] })],
  target   : 'node',
  mode,
  module   : {
    rules: [
      {
        test   : /\.(ts|js)x?$/,
        include: path.resolve(__dirname, 'src'),
        exclude: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'dist'),
          path.resolve(__dirname, '**/*.spec.ts')
        ],
        use: {
          loader : 'babel-loader',
          options: {
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  regenerator: true
                }
              ],
              '@babel/proposal-class-properties',
              '@babel/proposal-object-rest-spread'
            ],
            presets: [
              [
                '@babel/preset-env',
                {
                  corejs     : '3',
                  useBuiltIns: 'entry'
                }
              ],
              '@babel/preset-typescript',
              '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/i,
        use : [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.html$/i,
        use : [
          {
            loader : 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test   : /\.json$/,
        exclude: /node_modules/,
        loader : 'json-loader',
        type   : 'javascript/auto'
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },
  output,
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.APP_VERSION': JSON.stringify(process.env.npm_package_version)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        enabled: true,
        files  : './src/**/*.{ts,tsx,js,jsx}',
        options: { cache: false }
      },
      typescript: true
    })
  ],
  resolve: {
    extensions      : ['.mjs', '.json', '.ts', '.tsx', '.js', 'jsx'],
    symlinks        : false,
    cacheWithContext: false,
    plugins         : [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json',
        logLevel  : 'info',
        extensions: ['.ts', '.tsx']
      })
    ]
  }
};

if (env === 'production') {
  module.exports.plugins.push(
    new WebpackShellPlugin({
      onBuildEnd: ['yarn serve:prod']
    })
  );
  module.exports.plugins.push(
    new Dotenv({
      path  : './.env.prod',
      safe  : './.env.prod',
      expand: true
    })
  );
}

if (env === 'development') {
  module.exports.plugins.push(
    new WebpackShellPlugin({
      onBuildEnd: ['yarn serve']
    })
  );
  module.exports.plugins.push(
    new Dotenv({
      path  : './.env.dev',
      safe  : './.env.dev',
      expand: true
    })
  );
}

if (env === 'local') {
  module.exports.plugins.push(
    new WebpackShellPlugin({
      onBuildEnd: ['yarn serve:local']
    })
  );
  module.exports.plugins.push(
    new Dotenv({
      path  : './.env.local',
      safe  : './.env.local',
      expand: true
    })
  );
}
