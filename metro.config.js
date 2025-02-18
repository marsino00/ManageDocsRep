const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const config = {
  resolver: {
    extraNodeModules: new Proxy(
      {},
      {
        get: (target, name) => {
          return path.join(__dirname, 'src', String(name));
        },
      },
    ),
  },
  watchFolders: [path.resolve(__dirname, 'src')],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
