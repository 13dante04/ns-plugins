import { Application } from '@nativescript/core';
import { ShareFileCommon, ShareFileOptions } from './common';

export class ShareFile extends ShareFileCommon {
	static share(options: ShareFileOptions) {
		if (!options.path) {
			return console.error('[shareFileError] Please add a file path!');
		}
		try {
			let intent = new android.content.Intent();
			intent.addFlags(android.content.Intent.FLAG_GRANT_READ_URI_PERMISSION);

			let uris = new java.util.ArrayList();
			let uri = androidx.core.content.FileProvider.getUriForFile(Application.android.foregroundActivity || Application.android.startActivity, Application.android.packageName + '.provider', new java.io.File(options?.path));
			uris.add(uri);

			let builder = new android.os.StrictMode.VmPolicy.Builder();
			android.os.StrictMode.setVmPolicy(builder.build());

			intent.setAction(android.content.Intent.ACTION_SEND_MULTIPLE);
			intent.setType('message/rfc822');
			intent.putParcelableArrayListExtra(android.content.Intent.EXTRA_STREAM, uris);

			Application.android.foregroundActivity.startActivity(android.content.Intent.createChooser(intent, options?.android?.title ?? 'Open file:'));
		} catch (e) {
			return console.error('[shareFileError]', e);
		}
	}
}
