import { DemoSharedBase } from '../utils';
import { ShareFile } from '@13dante04/share-file';

export class DemoSharedShareFile extends DemoSharedBase {
	testIt() {
		ShareFile.share({
			path: '',
		});
	}
}
