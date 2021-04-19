import path from "path";
import babel from "@rollup/plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import del from "rollup-plugin-delete";
import pkg from "./package.json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

const BUILD_DIR = ".";
const getPath = (filepath) => {
  return path.resolve(BUILD_DIR, filepath);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: "./src/index.js",
  output: [{ file: `${getPath(pkg["main"])}.js`, format: "cjs" }],
  plugins: [
    peerDepsExternal(),
    nodeResolve(),
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
    commonjs(),
    terser(),
    del({ targets: ["dist/*"] }),
  ],

  external: Object.keys(pkg.peerDependencies || {}),
};

