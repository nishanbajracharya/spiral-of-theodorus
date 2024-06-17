import * as esbuild from 'esbuild';
import { clean } from 'esbuild-plugin-clean';
import htmlPlugin from '@chialab/esbuild-plugin-html';

let ctx = await esbuild.context({
  entryPoints: ['src/index.html'],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  outdir: 'dist',
  assetNames: 'assets/[name]-[hash]',
  chunkNames: '[ext]/[name]-[hash]',
  plugins: [
    htmlPlugin(),
    clean({
      patterns: ['dist/*'],
    }),
  ],
});

await ctx.watch();

let { host, port } = await ctx.serve({
  servedir: 'dist',
  port: process.env.PORT || 3000,
});

console.log(`http://${host}:${port}`);
