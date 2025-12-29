const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // 1. SVG transformer
  config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
    minifierConfig: {
      keep_classnames: false,
      keep_fnames: false,
    },
  };

  // 2. Fix resolver for SVG
  const { assetExts, sourceExts } = config.resolver;
  config.resolver = {
    ...config.resolver,
    assetExts: assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...sourceExts, "svg"],
  };

  // 3. Add TTF support safely
  if (!config.resolver.assetExts.includes("ttf")) {
    config.resolver.assetExts.push("ttf");
  }

  return config;
})();
