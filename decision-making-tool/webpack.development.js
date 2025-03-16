import { merge } from 'webpack-merge';
import common from './webpack.common.js';

export default merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    open: true,
    host: 'localhost',
    port: 4200,
    hot: true,
    historyApiFallback: true,
  },
});
