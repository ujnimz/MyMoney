module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'inline-dotenv',
      [
        'module-resolver',
        {
          alias: {
            _components: './src/components',
            _firebase: './src/firebase',
            _navigations: './src/navigations',
            _scenes: './src/scenes',
            _theme: './src/theme',
            _utils: './src/utils',
            _redux: './src/redux',
          },
        },
      ],
    ],
  };
};
