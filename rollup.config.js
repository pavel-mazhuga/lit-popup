import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
import css from 'rollup-plugin-css-porter';
import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const external = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})];

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'umd',
            name: 'LitPopup',
        },
        {
            file: pkg.module,
            format: 'esm',
        },
    ],
    external,
    plugins: [
        resolve({ extensions }),
        css({
            raw: 'dist/css/lit-popup.css',
            minified: 'dist/css/lit-popup.min.css',
        }),
        eslint(),
        typescript({
            typescript: require('typescript'),
        }),
        terser(),
    ],
};
