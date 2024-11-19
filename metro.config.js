/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
module.exports = {
    resolver: {
      // Specify the supported extensions
      sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs', 'json', 'svg'],
      assetExts: ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'tiff', 'webp'],
    },
  };

  const { getDefaultConfig } = require('@expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { assetExts } = config.resolver;

  // Extend the asset extensions to include `.ttf`
  config.resolver.assetExts = [...assetExts, 'ttf'];

  return config;
})();