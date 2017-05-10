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
searchControl.on('search:locationfound', function(e) {

  //console.log('search:locationfound', );
  //map.removeLayer(this._markerSearch)
  e.layer.setStyle({color: 'yellow'});
}).on('search:collapsed', function(e) {
  featuresLayer.eachLayer(function(layer) {	//restore feature color
    featuresLayer.resetStyle(layer);
  });
});

map.addControl(searchControl);
