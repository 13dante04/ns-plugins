import { Component, NgZone } from '@angular/core';
import { DemoSharedShareFile } from '@demo/shared';
import { ShareFile } from '@13dante04/share-file';

@Component({
	selector: 'demo-share-file',
	templateUrl: 'share-file.component.html',
})
export class ShareFileComponent {
	demoShared: DemoSharedShareFile;

	constructor(private _ngZone: NgZone) {}

	ngOnInit() {
		this.demoShared = new DemoSharedShareFile();
	}
}
