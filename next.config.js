const withSass = require('@zeit/next-sass');

function HACK_removeMinimizeOptionFromCssLoaders(config) {
    console.warn(
        'HACK: Removing `minimize` option from `css-loader` entries in Webpack config',
    );
    config.module.rules.forEach(rule => {
        if (Array.isArray(rule.use)) {
            rule.use.forEach(u => {
                if (u.loader === 'css-loader' && u.options) {
                    delete u.options.minimize;
                }
            });
        }
    });
}

module.exports = withSass(
    Object.assign(
        {},
        {
            sassLoaderOptions: {
                name: '[name].css'
            }
        },
        {
            webpack(config) {
                config.node = {
                    'net': 'empty',
                    'fs': 'empty',
                    'child_process': 'empty'
                };
                config.module.rules.push(
                    {
                        test: /\.svg$/i,
                        use: [
                            {
                                loader: 'file-loader',
                                options: {
                                    name: '[Folder]-[name].[ext]',//todo для боя хэши сделать
                                    outputPath: 'static/css/images',//todo хак с путями, надо разобраться
                                    publicPath: '../../static/css/images',
                                },
                            }
                        ]
                    });
                HACK_removeMinimizeOptionFromCssLoaders(config);
                return config;
            }
        }
    )
);
// http://localhost:3000/_next/36d1a97216ac2a406cd413789d004f76.svg
