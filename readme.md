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


#### iOS

2. Creating main.jsbundle file.
```
yarn build:ios 
```

3. Installing xcode cocoapods on ios folder
```
cd ios 
pod install
```

#### Android

4. Setting PATH for Android.
```
export ANDROID_SDK=<path to Android SDK directory>
export ANDROID_NDK=<path to Android NDK directory> 
export PATH=$PATH:$ANDROID_SDK/tools:$ANDROID_SDK/platform-tools:$ANDROID_NDK

export JAVA_HOME="/Applications/Android Studio.app/Contents/jre/jdk/Contents/Home"
```

5. Clean before building files.
```
cd android
./gradlew clearCacheModules
```

6. Creating Apk file
```
cd android
./gradlew assembleRelease
```

Android Keystore
alias: kloutkast
storepassword: jmc@1994121