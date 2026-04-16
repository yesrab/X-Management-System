const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = (options) => ({
  ...options,
  externals: [
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../../node_modules'),
      allowlist: [],
    }),
  ],
  resolve: {
    ...options.resolve,
    alias: {
      ...options.resolve?.alias,
      '@x-mgmt/prisma-client': path.resolve(
        __dirname,
        '../../libs/prisma-client/src/index.ts',
      ),
    },
  },
});
