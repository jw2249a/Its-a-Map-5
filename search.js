var searchControl = new L.Control.Search({
  layer: featureLayers,
  initial: false,
  collapsed: false,
  propertyName: 'NAME',
  marker: false,
  moveToLocation: function(latlng, title, map) {
    //map.fitBounds( latlng.layer.getBounds() );
    var zoom = map.getBoundsZoom(latlng.layer.getBounds());
      map.setView(latlng, zoom-1); // access the zoom
  }
});
function onEachFeature(feature, layer){
  searchControl.on('search:locationfound', function(e) {
    var popup = L.popup({closeButton:false})
    .setLatLng(e.latlng)
          .setContent("<table>" +
          "<tr class='oddrowcol'><td><b>Name: </b></td><td>" + feature.properties["NAME"] + "</td></tr>" +
          "</table>")
          .openOn(map);
  });
  layer.on('mouseover', function (e) {
	this.closePopup();
});
popup.on('mouseover', function (e) {
	this.closePopup();
});


map.addControl(searchControl);
