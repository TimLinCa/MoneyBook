module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module-resolver',
      {
        root: ['.'],
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
        ],
        alias: {
          '@asset': './assets',
          '@images': './assets/images',
          '@components': './src/components',
          '@styles': './styles',
          '@pages': './src/pages',
          '@store': './src/store',
        },
      },
    ],
    ['module:react-native-dotenv', {
      'envName': 'MONEYBOOK',
      'moduleName': '@env',
      'path': '.env',
    }],
  ],
};
