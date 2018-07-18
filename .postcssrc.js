/**
 * Created by wangsw on 08/05/2016.
 * @version 1.0.4
 */
module.exports = {
  plugins: [
    require('postcss-smart-import')({ /* ...options */ }),
    require('precss')({ /* ...options */ }),
    require('autoprefixer')({ /* ...options */ }),
    require('postcss-mixins'),
		require('cssnano')
  ]
};