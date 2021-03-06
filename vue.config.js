module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/tao/' : '/',
    css: {
        loaderOptions: {
            css: {
                // 这里的选项会传递给 css-loader

            },
            postcss: {
                // 这里的选项会传递给 postcss-loader
                autoprefixer: {
                    browsers: ['Android >= 4.0', 'iOS >= 8'],
                },
                'postcss-pxtorem': {
                    rootValue: 37.5,
                    propList: ['*'],
                },
            }
        }

    }
}