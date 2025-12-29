# APK Size Optimizations (summary)

This project includes safe, non-UI changes to help reduce Android APK size and a set of suggestions you can apply next.

What I changed (safe, no UI changes):
- Moved `reactotron-react-native` to `devDependencies` (debug only).
- Removed duplicate/unused `react-native-async-storage` package entry.
- Added `android.enableMinifyInReleaseBuilds=true` and `android.enableShrinkResourcesInReleaseBuilds=true` in `android/gradle.properties`.
- Added `android.packagingOptions.excludes=**/*.hbc.map,**/*.map,**/*.dll,**/*.lib` to avoid packaging source maps and other debug files.
- Enabled ABI splits in `android/app/build.gradle` to generate per-ABI APKs (smaller per-APK download size).
- Added `scripts/optimize-images.js` to compress key PNG assets and produce Android WebP variants.

Next recommended steps (manual actions or optional):
1. Run image optimization locally:
   - npm install --save-dev sharp
   - npm run optimize:images
   This will compress `assets/images/splash.png`, `Order-Together-Logo.png`, `icon.png`, and produce `.webp` variants for Android.

2. Build per-ABI APKs (after the above changes an APK per ABI will be produced) or build an AAB and let Google Play deliver optimized APKs:
   - For local Gradle: `./gradlew assembleRelease` will produce split APKs under `android/app/build/outputs/apk/`.
   - Using EAS: use an AAB build (recommended for smallest install size on Google Play): `eas build -p android --profile production` (ensure `build.gradle` splits are in place or use app bundle).

3. Audit icons & fonts:
   - Consider replacing `@expo/vector-icons` font usage with SVG-based icons for a smaller footprint (refactor required), or subset font files.

4. Check for large native libraries or heavy packages (maps, ML libs) and remove if unused.

5. Test final release build size with `./gradlew :app:bundleRelease` (AAB size) and `./gradlew :app:assembleRelease` (APK sizes in `outputs/apk`) or by using EAS build artifacts.

Notes:
- All changes made aim to keep UI/structure unchanged.
- Some savings come from build-time choices (AAB vs universal APK, ABI splits, minification) and from compressed assets.
- If you'd like, I can run the image optimization and a local release build to measure before/after sizes—tell me if you want me to proceed with installing dev tools and running a build here.
