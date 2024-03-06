# The Grid MVP

## App (Cordova)

### Setup

**Android Studio**

Install Android Studio
`brew install --cask android-studio`

Open Android Studio and then click on Tools > SDK Manager. Under SDK Platforms, tick all Android 13 (Tiramasu) items and untick everything else and Apply.

Whilst in SDK Manager go to SDK Tools and expand everything (Show Package Details). Under Android SDK Build-Tools XX-xxx tick 33.0.2 and untick everything else. Apply.

This will download the version we need for the tablets we are supporting.

**Development Requirements**

Install Cordova
`npm install -g cordova`

Add Android platform
`cordova platform add android`

Test to see if you are able to emulate Android
`cordova requirements`

If any of these fail, you may need to:

 - Install Java - `brew install openjdk@11` then `sudo ln -sfn /opt/homebrew/opt/openjdk@11/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-11.jdk`
 - Install Gradle - `brew install gradle@7` then `brew link --overwrite gradle@7`
 - Set Android SDK up correctly in your base_profile - see below

`vim ~/.bash_profile`

Then paste

`export ANDROID_HOME=~/Library/Android/sdk`
`export ANDROID_SDK_ROOT=~/Library/Android/sdk`
`export ANDROID_AVD_HOME=~/.android/avd`

Save and quit - `:wq`