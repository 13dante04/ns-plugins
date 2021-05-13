# @nativescript/share-file

```javascript
ns plugin add @1304dante/ns-share-file
```

Share files between apps on android and ios

## Usage

On android you need to add a file provider to `AndroidManifest.xml` and a download paths value file,
here's and example with one located in `App_Resources\Android\src\main\res\xml\download_path.xml`

`AndroidManifest.xml`

```XML
<provider
  android:name="androidx.core.content.FileProvider"
  android:authorities="com.package.name.provider"
  android:grantUriPermissions="true"
  android:exported="false">
  <meta-data
    android:name="android.support.FILE_PROVIDER_PATHS"
    android:resource="@xml/download_path"
    tools:replace="android:resource" />
</provider>
```

`download_path.xml`

```XML
<?xml version="1.0" encoding="utf-8"?>
<paths xmlns:android="http://schemas.android.com/apk/res/android">
      <external-path
        name="external"
        path="." />
      <external-files-path
        name="external_files"
        path="." />
      <cache-path
        name="cache"
        path="." />
      <external-cache-path
        name="external_cache"
        path="." />
    <files-path
        name="files"
        path="." />
</paths>
```

TypeScript usage:

```TypeScript
    import { ShareFile } from '@1304dante/ns-share-file';
    import { knownFolders, path} from '@nativescript/core';

    export class SharingClass {
        constructor() {
            let fileName = this.documentsLocation() + 'path/to/file'
            ShareFile.share({
                path: fileName,
                android: { //android specific
                  title: 'Open text file with:'
                },
                ios: { //ios specific
                  animated: true,
                  rect: { //ipad specific
                      x: 110,
                      y: 110,
                      width: 0,
                      height: 0
                  }
                }
            });
        }

      public documentsLocation() {
          if (global.isAndroid) {
              return android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).toString() +
              '/documents';
          }

          if (global.isIOS) {
             return path.join(knownFolders.currentApp().path) + '/documents';
          }
      }
    }
```

## License

Apache License Version 2.0
