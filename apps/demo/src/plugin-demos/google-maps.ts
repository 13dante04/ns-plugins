import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedGoogleMaps } from '@demo/shared';
import {} from '@dante1304/google-maps';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedGoogleMaps {}
