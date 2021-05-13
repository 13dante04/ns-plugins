import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { ShareFileComponent } from './share-file.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: ShareFileComponent }])],
	declarations: [ShareFileComponent],
	schemas: [NO_ERRORS_SCHEMA],
})
export class ShareFileModule {}
