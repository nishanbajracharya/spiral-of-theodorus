import htmlPlugin from '@chialab/esbuild-plugin-html';
import esbuild from 'esbuild';

await esbuild.serve(
  {
    servedir: 'public',
  },
  {
    entryPoints: ['src/index.html'],
    assetNames: 'assets/[name]',
    chunkNames: '[ext]/[name]',
    plugins: [htmlPlugin()],
  }
);
