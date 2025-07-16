import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  if (command === 'build') {
    // Library build mode
    return {
      build: {
        lib: {
          entry: 'src/alfrid/index.ts',
          name: 'Alfrid',
          fileName: 'alfrid',
          formats: ['es', 'umd'],
        },
        outDir: 'dist',
        sourcemap: true,
        rollupOptions: {
          external: [],
          output: {
            globals: {},
          },
        },
      },
      resolve: {
        alias: {
          '@': '/src',
        },
      },
    };
  } else {
    // Development mode
    return {
      root: '.',
      build: {
        outDir: 'dist',
        sourcemap: true,
      },
      server: {
        port: 9957,
        open: true,
      },
      resolve: {
        alias: {
          '@': '/src',
        },
      },
    };
  }
});
