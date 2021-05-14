import { ShareFileCommon, ShareFileOptions } from './common';

export class ShareFile extends ShareFileCommon {
	static getter<T>(_this2: any, property: T | { (): T }): T {
		if (typeof property === 'function') {
			return (<{ (): T }>property).call(_this2);
		} else {
			return <T>property;
		}
	}

	static share(options: ShareFileOptions) {
		if (!options.path) {
			return console.error('[shareFileError] Please add a file path!');
		}
		try {
			const appPath = ShareFile.getCurrentAppPath();
			const path = options.path.replace('~', appPath);

			let controller = UIDocumentInteractionController.interactionControllerWithURL(NSURL.fileURLWithPath(path));
			controller.delegate = new CustomUIDocumentInteractionControllerDelegateImpl();

			controller.presentOpenInMenuFromRectInViewAnimated(CGRectMake(options?.ios?.rect?.x ?? 0, options?.ios?.rect?.y ?? 0, options?.ios?.rect?.width ?? 0, options?.ios?.rect?.height ?? 0), controller.delegate.documentInteractionControllerViewForPreview(controller), options?.ios?.animated);
		} catch (e) {
			console.error(e);
		}
	}

	private static getCurrentAppPath(): string {
		const currentDir = __dirname;
		const tnsModulesIndex = currentDir.indexOf('/tns_modules');

		// Module not hosted in ~/tns_modules when bundled. Use current dir.
		let appPath = currentDir;
		if (tnsModulesIndex !== -1) {
			// Strip part after tns_modules to obtain app root
			appPath = currentDir.substring(0, tnsModulesIndex);
		}
		return appPath;
	}
}

@NativeClass()
class CustomUIDocumentInteractionControllerDelegateImpl extends NSObject implements UIDocumentInteractionControllerDelegate {
	public static ObjCProtocols = [UIDocumentInteractionControllerDelegate];

	public getViewController(): UIViewController {
		const app = ShareFile.getter(UIApplication, UIApplication.sharedApplication);
		return (app.keyWindow.rootViewController as UINavigationController).visibleViewController;
	}

	public documentInteractionControllerViewControllerForPreview(controller: UIDocumentInteractionController) {
		return this.getViewController();
	}

	public documentInteractionControllerViewForPreview(controller: UIDocumentInteractionController) {
		if (this.getViewController()) {
			return this.getViewController().view;
		} else {
			const app = ShareFile.getter(UIApplication, UIApplication.sharedApplication);
			return (app.keyWindow.rootViewController as UINavigationController).view;
		}
	}
}
