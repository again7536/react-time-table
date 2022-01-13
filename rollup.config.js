import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import cssimport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import {terser} from 'rollup-plugin-terser';

export default {
    input : 'src/index.ts',
    output : {
        file : 'dist/index.js',
        format : 'esm',
        globals: {
            'react': 'React',
            'react-dom': 'ReactDOM',
        },
    },
    plugins : [
        babel({
            exclude : 'node_modules/**'
        }),
        nodeResolve(),
        commonjs({
            include: 'node_modules/**',
        }),
        typescript({ tsconfig: './tsconfig.json' }),
        postcss({
            extract: false,
            modules: true,
            sourceMap: true,
            plugins: [
              cssimport(),
              autoprefixer(),
            ],
        }),
        terser(),
    ],
    external: ['react', 'react-dom']
}