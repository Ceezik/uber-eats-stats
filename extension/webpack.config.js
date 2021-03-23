const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        content: path.join(__dirname, 'src/index.ts'),
        background: path.join(__dirname, 'background/index.ts'),
    },
    plugins: [new CleanWebpackPlugin()],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../build/js'),
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx'],
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.ts$|tsx/,
                use: { loader: 'awesome-typescript-loader' },
            },
        ],
    },
};
