mapboxgl.accessToken = mapToken ;

const map = new mapboxgl.Map({
	container: 'map', // container ID
	center: campground.geometry.coordinates , // starting position [lng, lat]
	zoom: 10, // starting zoom
    
});
map.addControl(new mapboxgl.NavigationControl());
const marker = new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .addTo(map); // add the marker to the map