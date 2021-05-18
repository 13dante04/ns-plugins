import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { HomeComponent } from './home.component';

const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'google-maps', loadChildren: () => import('./plugin-demos/google-maps.module').then((m) => m.GoogleMapsModule) },
	{ path: 'share-file', loadChildren: () => import('./plugin-demos/share-file.module').then((m) => m.ShareFileModule) },
];

@NgModule({
	imports: [NativeScriptRouterModule.forRoot(routes)],
	exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
