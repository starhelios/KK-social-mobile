# KloutKast

This is react native project.

## Getting Started

### Installing

#### Project Settings

1. Installing react native in project folder
```
yarn install
(If Yarn is not installed on your pc, you need to run `npm install -g yarn`.)
```

2. Replace the Text.js file of `/additional/` to `/node_modules/react-native/Libraries/Text/` folder.


#### iOS

3. Creating main.jsbundle file.
```
yarn build:ios 
```

4. Installing xcode cocoapods on ios folder
```
cd ios 
pod install
```

#### Android

5. Setting PATH for Android.
```
export ANDROID_SDK=<path to Android SDK directory>
export ANDROID_NDK=<path to Android NDK directory> 
export PATH=$PATH:$ANDROID_SDK/tools:$ANDROID_SDK/platform-tools:$ANDROID_NDK

export JAVA_HOME="/Applications/Android Studio.app/Contents/jre/jdk/Contents/Home"
```

6. Clean before building files.
```
cd android
./gradlew clearCacheModules
```

7. Creating Apk file
```
cd android
./gradlew assembleRelease
```

1. Google Login
2. Facebook Login
3. Apple Login
4. Add Payment
5. Add Withdrawal

Confirmed Bookings
Terms of Service


