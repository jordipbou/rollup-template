import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/main.js',
  output: {
    file: 'public/bundle.js',
    format: 'iife',
    sourcemap: true,
    name: 'App'
  },
  plugins: [
    resolve (),
    commonjs (),

    postcss ({
      config: { path: "./postcss.config.js" },
      extensions: ['.css'],
      extract: true,
      minimize: production
    }),

    !production && serve ({
      contentBase: ['public'],
      host: 'localhost',
      port: 10001
    }),
    !production && livereload ('public'),

    production && terser ()
  ]
}
    
