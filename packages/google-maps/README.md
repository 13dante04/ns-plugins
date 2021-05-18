# @dante1304/google-maps

```javascript
ns plugin add @dante1304/nativescript-google-maps
```

## Usage

# NativeScript plugin for the Google Maps SDK

This is a cross-platform (iOS & Android) Nativescript plugin for the [Google Maps API](https://developers.google.com/maps/).

# Prerequisites

**iOS** - [Cocoapods](https://guides.cocoapods.org/using/getting-started.html#getting-started) must be installed.

**Android** - The latest version of the [Google Play Services SDK](https://developer.android.com/sdk/installing/adding-packages.html) must be installed.

**Google Maps API Key** - Visit the [Google Developers Console](https://console.developers.google.com), create a project, and enable the `Google Maps Android API` and `Google Maps SDK for iOS` APIs. Then, under credentials, create an API key.

## Configure API Key for Android

Start by copying the necessary template resource files in to the Android app resources folder:

```
cp -r node_modules/nativescript-google-maps-sdk/platforms/android/res/values app/App_Resources/Android/src/main/res
```

Next, modify your `app/App_Resources/Android/src/main/res/values/nativescript_google_maps_api.xml` file by uncommenting the `nativescript_google_maps_api_key` string, and replace `PUT_API_KEY_HERE` with the API key you created earlier.

Finally, modify your `app/App_Resources/Android/src/main/AndroidManifest.xml` file by inserting the following in between your `<application>` tags:

```(xml)
<meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="@string/nativescript_google_maps_api_key" />
```

The plugin will default to the latest available version of the Google Play Services SDK for Android. If you need to change the version, you can add a `project.ext` property, `googlePlayServicesVersion`, like so:

```
//   /app/App_Resources/Android/app.gradle

project.ext {
    googlePlayServicesVersion = "+"
}
```

## Configure API Key for iOS

In your `app.js`, use the following code to add your API key (replace `PUT_API_KEY_HERE` with the API key you created earlier):

```
if (application.ios) {
    GMSServices.provideAPIKey("PUT_API_KEY_HERE");
}
```

If you are using Angular, modify your `app.module.ts` as follows:

```
import * as platform from "platform";
declare var GMSServices: any;

....

if (platform.isIOS) {
    GMSServices.provideAPIKey("PUT_API_KEY_HERE");
}
```

## Adding the MapView

Modify your view by adding the `xmlns:maps="nativescript-google-maps-sdk"` namespace to your `<Page>` tag, then use the `<maps:mapView />` tag to create the MapView:

```
<!-- /app/main-page.xml -->

<Page
    xmlns="http://www.nativescript.org/tns.xsd"
    xmlns:maps="nativescript-google-maps-sdk"
>
    <GridLayout>
        <maps:mapView
            latitude="{{ latitude }}"
            longitude="{{ longitude }}"
            zoom="{{ zoom }}"
            bearing="{{ bearing }}"
            tilt="{{ tilt }}"
            mapAnimationsEnabled="{{ mapAnimationsEnabled }}"
            padding="{{ padding }}"
            mapReady="onMapReady"
            markerSelect="onMarkerSelect"
            markerBeginDragging="onMarkerBeginDragging"
            markerEndDragging="onMarkerEndDragging"
            markerDrag="onMarkerDrag"
            cameraChanged="onCameraChanged"
            cameraMove="onCameraMove"
        />
    </GridLayout>
</Page>
```

## Properties

The following properties are available for adjusting the camera view:

| Property               | Description and Data Type                                                                                                 |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| `latitude`             | Latitude, in degrees: `number`                                                                                            |
| `longitude`            | Longitude, in degrees: `number`                                                                                           |
| `zoom`                 | Zoom level (described [here](https://developers.google.com/maps/documentation/javascript/tutorial#zoom-levels)): `number` |
| `bearing`              | Bearing, in degrees: `number`                                                                                             |
| `tilt`                 | Tilt, in degrees: `number`                                                                                                |
| `padding`              | Top, bottom, left and right padding amounts, in Device Independent Pixels: `number[]` (array)                             |
| `mapAnimationsEnabled` | Whether or not to animate camera changes: `Boolean`                                                                       |

## Events

The following events are available:

| Event                    | Description                                                                                                                                                    |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mapReady`               | Fires when the MapView is ready for use                                                                                                                        |
| `myLocationTapped`       | Fires when the 'My Location' button is tapped                                                                                                                  |
| `coordinateTapped`       | Fires when a coordinate is tapped on the map                                                                                                                   |
| `coordinateLongPress`    | Fires when a coordinate is long-pressed on the map                                                                                                             |
| `markerSelect`           | Fires when a marker is selected                                                                                                                                |
| `markerBeginDragging`    | Fires when a marker begins dragging                                                                                                                            |
| `markerEndDragging`      | Fires when a marker ends dragging                                                                                                                              |
| `markerDrag`             | Fires repeatedly while a marker is being dragged                                                                                                               |
| `markerInfoWindowTapped` | Fires when a marker's info window is tapped                                                                                                                    |
| `markerInfoWindowClosed` | Fires when a marker's info window is closed                                                                                                                    |
| `shapeSelect`            | Fires when a shape (e.g., `Circle`, `Polygon`, `Polyline`) is selected _(Note: you must explicity configure `shape.clickable = true;` for this event to fire)_ |
| `cameraChanged`          | Fires after the camera has changed                                                                                                                             |
| `cameraMove`             | Fires repeatedly while the camera is moving                                                                                                                    |
| `indoorBuildingFocused`  | Fires when a building is focused on (the building currently centered, selected by the user or by the location provider)                                        |
| `indoorLevelActivated`   | Fires when the level of the focused building changes                                                                                                           |

## Native Map Object

The MapView's `gMap` property gives you access to the platform's native map object–––consult the appropriate SDK reference on how to use it: [iOS](https://developers.google.com/maps/documentation/ios-sdk/reference/interface_g_m_s_map_view) | [Android](https://developers.google.com/android/reference/com/google/android/gms/maps/GoogleMap)

## UI Settings

You can adjust the map's UI settings after the `mapReady` event has fired by configuring the following properties on `mapView.settings`:

| Property                   | Description and Data Type                                                          |
| :------------------------- | :--------------------------------------------------------------------------------- |
| `compassEnabled`           | Whether the compass is enabled or not: `Boolean`                                   |
| `indoorLevelPickerEnabled` | Whether the indoor level picker is enabled or not: `Boolean`                       |
| `mapToolbarEnabled`        | \*\* **Android only** \*\* Whether the map toolbar is enabled or not: `Boolean`    |
| `myLocationButtonEnabled`  | Whether the 'My Location' button is enabled or not: `Boolean`                      |
| `rotateGesturesEnabled`    | Whether the compass is enabled or not: `Boolean`                                   |
| `scrollGesturesEnabled`    | Whether map scroll gestures are enabled or not: `Boolean`                          |
| `tiltGesturesEnabled`      | Whether map tilt gestures are enabled or not: `Boolean`                            |
| `zoomGesturesEnabled`      | Whether map zoom gestures are enabled or not: `Boolean`                            |
| `zoomControlsEnabled`      | \*\* **Android only** \*\* Whether map zoom controls are enabled or not: `Boolean` |

## Styling

Use `gMap.setStyle(style);` to set the map's styling ([Google Maps Style Reference](https://developers.google.com/maps/documentation/android-api/style-reference) | [Styling Wizard](https://mapstyle.withgoogle.com/)).

### Angular

Use `this.mapView.setStyle(<MapStyle>JSON.parse(this.styles));` inside of the `onMapReady` event handler. In this example, `this.mapView` is the `MapView` object and `this.styles` is a reference to a JSON file that was created using the [Styling Wizard](https://mapstyle.withgoogle.com/). The `<MapStyle>` type was imported from the plugin as `{ MapStyle }`.

## Basic Example

```
//  /app/main-page.js

var mapsModule = require("dante1304/nativescript-google-maps");

function onMapReady(args) {
    var mapView = args.object;

    console.log("Setting a marker...");
    var marker = new mapsModule.Marker();
    marker.position = mapsModule.Position.positionFromLatLng(-33.86, 151.20);
    marker.title = "Sydney";
    marker.snippet = "Australia";
    marker.userData = { index : 1};
    mapView.addMarker(marker);

    // Disabling zoom gestures
    mapView.settings.zoomGesturesEnabled = false;
}

function onMarkerSelect(args) {
    console.log("Clicked on " +args.marker.title);
}

function onCameraChanged(args) {
    console.log("Camera changed: " + JSON.stringify(args.camera));
}

function onCameraMove(args) {
    console.log("Camera moving: "+JSON.stringify(args.camera));
}

exports.onMapReady = onMapReady;
exports.onMarkerSelect = onMarkerSelect;
exports.onCameraChanged = onCameraChanged;
exports.onCameraMove = onCameraMove;
```

## Usage with Angular

```
// /app/map-example.component.ts

import {Component, ElementRef, ViewChild} from '@angular/core';
import {registerElement} from "nativescript-angular/element-registry";

// Important - must register MapView plugin in order to use in Angular templates
registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);

@Component({
    selector: 'map-example-component',
    template: `
    <GridLayout>
        <MapView (mapReady)="onMapReady($event)"></MapView>
    </GridLayout>
    `
})
export class MapExampleComponent {

    @ViewChild("MapView") mapView: ElementRef;

    //Map events
    onMapReady = (event) => {
        console.log("Map Ready");

}
```

## Marker clustering

To setup the marker cluster use MapView's `setupMarkerCluster` instead of adding markers to map like this:

```javascript
function onMapReady(args) {
	var mapView = args.object;
	var markers = [];

	for (i = 0; i < 5; i++) {
		var marker = new mapsModule.Marker();
		marker.position = mapsModule.Position.positionFromLatLng(-33.86, 151.2);
		marker.title = `Marker ${i + 1}`;
		marker.snippet = `Marker ${i + 1}`;
		marker.userData = { index: i };
		markers.push(marker);
	}

	// The second argument is the minimum number of items that should form a cluster
	mapView.setupMarkerCluster(markers, 2);

	// Disabling zoom gestures
	mapView.settings.zoomGesturesEnabled = false;
}
```

## License

Apache License Version 2.0
