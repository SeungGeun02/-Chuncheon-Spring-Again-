export default defineConfig(({ mode }) => {
  return {
    base: '/Chuncheon-Spring-Again/',
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
