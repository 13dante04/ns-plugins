import { Marker } from '..';
import { MapViewBase } from '../common';

declare var com;
declare var java;

export const LatLngBounds = com.google.android.gms.maps.model.LatLngBounds;
export const CameraUpdateFactory = com.google.android.gms.maps.CameraUpdateFactory;
export const ClusterManager = com.google.maps.android.clustering.ClusterManager;
export const DefaultClusterRenderer = com.google.maps.android.clustering.view.DefaultClusterRenderer;

export const CustomClusterItem = java.lang.Object.extend({
	interfaces: [com.google.maps.android.clustering.ClusterItem],

	marker: null, // will be attached manually later

	init: function () {},

	getMarker: function () {
		return this.marker;
	},

	getPosition: function () {
		return this.marker.position.android;
	},

	getTitle: function () {
		return this.marker.title;
	},

	getSnippet: function () {
		return this.marker.snippet;
	},
});

@NativeClass()
class CustomClusterManager extends ClusterManager {
	constructor(public context, public mapView) {
		super(context, mapView);
		return global.__native(this);
	}

	onMarkerClick(item) {
		this.mapView.findMarker((marker) => {
			if (marker.position.latitude === item.getPosition().latitude && marker.position.longitude === item.getPosition().longitude) {
				this.mapView.notifyMarkerEvent('markerSelect', marker);
				return true;
			} else {
				return false;
			}
		});
	}
}

@NativeClass()
class CustomClusterRenderer extends DefaultClusterRenderer {
	constructor(public context, public gMap, public clusterManager, private maxZoomLevel: number, private mapView: MapViewBase, private clusterMinNumber: number) {
		super(context, gMap, clusterManager);

		this.maxZoomLevel = this.mapView.gMap.getMaxZoomLevel() - 4;
		return global.__native(this);
	}

	onBeforeClusterItemRendered(item, markerOptions) {
		this.super.onBeforeClusterItemRendered(item, markerOptions);
		var androidIcon = com.google.android.gms.maps.model.BitmapDescriptorFactory.fromBitmap(item.marker.icon.imageSource.android);
		markerOptions.anchor(0, 0);
		markerOptions.icon(androidIcon);
	}
	shouldRenderAsCluster(cluster) {
		if (this.gMap.getCameraPosition().zoom > this.maxZoomLevel) {
			return false;
		}
		return cluster.getSize() > this.clusterMinNumber;
	}
}

export { CustomClusterManager, CustomClusterRenderer };
