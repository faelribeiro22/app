const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const dotenv = require('dotenv').config();

module.exports = () => {
  console.log('aquiiiiiii', dotenv);
  return {
    entry: './src/index.js',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, './dist'),
      publicPath: 'http://localhost:9001/',
    },
    mode: 'development',
    devServer: {
      port: 9001,
      historyApiFallback: true,
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              require.resolve('@babel/preset-react')]
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        }
      ]
    },
    plugins: [
      new HTMLWebpackPlugin({
        filename: 'index.html',
        template: './public/index.html',
        title: 'App'
      }),
      new ModuleFederationPlugin({
        name: 'App',
        remotes: {
          HomeApp: `HomeApp@${dotenv.parsed.APP_HOME}`,
          ContactApp: `ContactApp@${dotenv.parsed.APP_CONTACT}`,
        }
      })
    ]
  }
}