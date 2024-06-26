import * as esbuild from 'esbuild';
import { clean } from 'esbuild-plugin-clean';
import htmlPlugin from '@chialab/esbuild-plugin-html';

await esbuild.build({
  entryPoints: ['src/index.html'],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  outdir: 'dist',
  assetNames: 'assets/[name]-[hash]',
  chunkNames: '[ext]/[name]-[hash]',
  plugins: [
    htmlPlugin({
      minifyOptions: {
        collapseWhitespace: true,
      },
      injectStylesAs: 'link',
    }),
    clean({
      patterns: ['dist/*'],
    }),
  ],
});
