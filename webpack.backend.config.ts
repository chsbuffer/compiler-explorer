import path from 'node:path';
import {fileURLToPath} from 'node:url';
import Webpack from 'webpack';

const __dirname = path.resolve(path.dirname(fileURLToPath(import.meta.url)));

export default {
    mode: 'production',
    entry: './app.ts',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'out', 'backend'),
        filename: 'app.js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
        extensionAlias: {
            '.js': ['.ts', '.js'],
            '.mjs': ['.mts', '.mjs'],
        },
    },
    module: {
        rules: [
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                type: 'asset',
                parser: {dataUrlCondition: {maxSize: 8192}},
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig.backend.json'
                }
            },
            {
                test: /\.js$/,
                loader: 'source-map-loader',
            }
        ],
    },
    externals: {
        'snappy': 'commonjs snappy',
        'bufferutil': 'commonjs bufferutil',
        'utf-8-validate': 'commonjs utf-8-validate',
    },
} satisfies Webpack.Configuration;