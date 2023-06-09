module.exports = {
  presets: [
    [
      '@parcel/babel-preset-env',
      {
        bugfixes: true,
        targets: {
          browsers: 'Chrome >= 74, Safari >= 13.1, iOS >= 13.3, Firefox >= 78, Edge >= 79',
          node: 12,
        },
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@parcel/babel-plugin-transform-runtime',
    ['@babel/plugin-transform-typescript', { isTSX: true }],
  ],
};
