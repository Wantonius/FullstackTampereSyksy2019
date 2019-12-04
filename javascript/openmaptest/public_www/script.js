var map;

window.onload = function() {
	map = new ol.Map({
		target:'mymap',
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM()
			})
		],
		view: new ol.View({
			center:ol.proj.fromLonLat([23.76,61.49]),
			zoom:10
		})
	});
}

function setCoords() {
	let lat = document.getElementById("latitude").value;
	let lon = document.getElementById("longitude").value;	
	let zoom = document.getElementById("zoom").value;
	map.getView().setCenter(ol.proj.fromLonLat([lon,lat]));
	map.getView().setZoom(zoom);
}

function moveToCurrentPos() {
	if("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
			map.getView().setCenter(ol.proj.fromLonLat([position.coords.longitude,
			position.coords.latitude]));
		});
	} else {
		console.log("No support for geolocation!");
	}
}















