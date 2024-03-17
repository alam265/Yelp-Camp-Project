mapboxgl.accessToken = mapToken ;

const map = new mapboxgl.Map({
	container: 'map', // container ID
	center: campground.geoLocation.coordinates , // starting position [lng, lat]
	zoom: 10, // starting zoom
    
});

const marker = new mapboxgl.Marker()
    .setLngLat(campground.geoLocation.coordinates)
    .addTo(map); // add the marker to the map