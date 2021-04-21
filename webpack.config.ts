import svgToMiniDataURI from 'mini-svg-data-uri';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { VueLoaderPlugin } = require('vue-loader');

export default {
    target: 'web',
    bail: true,
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.vue', '.json'],
        // modules: ['node_modules', path.resolve(__dirname, 'src')],
    },
    plugins: [new VueLoaderPlugin()],
    module: {
        rules: [
            {
                test: /\.svg$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            generator: (content: Buffer): string =>
                                svgToMiniDataURI(content.toString()),
                        },
                    },
                ],
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                            transpileOnly: true,
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                indentedSyntax: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.html?$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src'],
                    },
                },
            },
        ],
    },
};
