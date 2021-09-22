const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = () => {
  return {
    entry: './src/index.js',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
    },
    mode: 'production',
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
          HomeApp: `HomeApp@${process.env.APP_HOME}`,
          ContactApp: `ContactApp@${process.env.APP_CONTACT}`,
        }
      })
    ]
  }
}