import { Observable } from '@nativescript/core';

export interface ShareFileOptions {
	/**
   Path to the file being shared
   */
	path: string;
	/**
    Android specific options for file sharing
   */
	android?: ShareFileAndroidOptions;
	/**
     iOS specific options for file sharing
   */
	ios?: ShareFileIosOptions;
}

export interface ShareFileAndroidOptions {
	/***
    Title of the android sharing activity. Default is 'Share file'
   */
	title?: string;
}

export interface ShareFileIosOptions {
	/***
    iOS positioning for iPads
   */
	rect?: IosRectangle;
	/***
    Whether the popup should be animated or not
   */
	animated?: boolean;
}
export interface IosRectangle {
	x?: number;
	y?: number;
	height?: number;
	width?: number;
}
export class ShareFileCommon extends Observable {}
