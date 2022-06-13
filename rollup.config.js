import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
    input: 'src/index.ts',
    output: [
        // {
        //     file: pkg.main,
        //     format: 'iife',
        //     name: 'LitPopup',
        // },
        {
            file: pkg.main,
            format: 'esm',
        },
    ],
    plugins: [
        peerDepsExternal(),
        resolve({ extensions }),
        eslint(),
        typescript({
            typescript: require('typescript'),
        }),
        terser(),
    ],
};
