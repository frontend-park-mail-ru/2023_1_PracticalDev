const path = require('path');

module.exports = (env) => {
    const { mode = process.env.NODE_ENV || 'development' } = env;

    return {
        mode,
        entry: {
            index: './public/index.tsx',
            sw: './public/sw.js',
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name].js',
            library: {
                name: '@practicaldev/frontend',
                type: 'umd',
            },
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /(node_modules)/,
                    resolve: {
                        extensions: ['.ts', '.tsx'],
                    },
                    use: [{ loader: 'ts-loader' }],
                },
                {
                    test: /\.(css)$/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'static/img',
                                name: '[name].[ext]',
                            },
                        },
                    ],
                },
            ],
        },
    };
};
