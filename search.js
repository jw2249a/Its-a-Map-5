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


map.addControl(searchControl);
