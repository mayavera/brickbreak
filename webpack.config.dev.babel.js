import merge from 'webpack-merge'
import config from './webpack.config.babel'

export default merge(config, {
  mode: 'development'
})