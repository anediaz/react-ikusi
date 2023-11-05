import path from 'path';
import babel from '@rollup/plugin-babel';
import del from 'rollup-plugin-delete';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import svgr from '@svgr/rollup';
import url from '@rollup/plugin-url';
const pkg = require('./package.json');
import dts from "rollup-plugin-dts";

const BUILD_DIR = '.';
const getPath = (filepath) => path.resolve(BUILD_DIR, filepath);

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    input: 'src/index.ts',
    output: [
      {
          file: `${getPath(pkg.main)}`,
          format: 'cjs',
          sourcemap: true,
          name: 'react-ts-lib'
      },
      {
          file: `${getPath(pkg.module)}`,
          format: 'esm',
          sourcemap: true
      }
    ],
    plugins: [
      external(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
      babel({
        babelrc: false,
        babelHelpers: 'runtime',
        exclude: '**/node_modules/**',
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: ['@babel/plugin-transform-runtime'],
      }),
      postcss({
        minimize: true,
        modules: false,
        use: {
          sass: null,
          stylus: null,
          less: { javascriptEnabled: true },
        },
      }),
      url(),
      svgr(),
      del({ targets: ['.dist/*'] }),
    ],

    external: Object.keys(pkg.peerDependencies || {}),
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/],
  },
];
