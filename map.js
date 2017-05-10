var map = L.map('map', {
  minZoom: 6,
  maxZoom: 9,
  zoomControl: false
}).setView([38.9072, -77.0369], 7.5);

// base layer
var baseMaps = {};
var baseMap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    "attribution": "&copy; <a href=\"http://openstreetmap.org/copyright\", target=\"_blank\">OpenStreetMap contributors</a>"
});
baseMap.addTo(map);
baseMaps["OpenStreetMap"] = baseMap;


// popup

function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties["NCESID"]) {
        layer.on('mouseover', function (e) {
	   layer = e.target;
	   $('.information').html(layer.feature.properties ? '<b>' + layer.feature.properties["NAME"]
		 + '</b><br />' + 'NCESID: ' + layer.feature.properties["NCESID"]
		   :'Hover over a district');
        });
        layer.on('mouseout', function (e) {
	    $('.information').html('');
        });

    }

}

// styling
function getValue1(x) {
    return x == "MA" ? "#7F7F7F" :
        x >= "i" ? "#B10026" :
        x >= "h" ? "#E31A1C" :
        x >= "g" ? "#FC4E2A" :
        x >= "f" ? "#FD8D3C" :
        x >= "e" ? "#FEB24C" :
        x >= "d" ? "#FED976" :
        x >= "c" ? "#FFEDA0" :
        x >= "b" ? "#E3F2DE" :
        x == "a" ? "#D2F3FA" :
        "";
}

function style1(feature) {
    return {
        "fillColor": getValue1(feature.properties["PrScRSR"]),
        "color": "#FFFFFF",
        "weight": 2,
        "opacity": 1,
        "fillOpacity": 1
    };
}

// data layers
var group = new L.featureGroup;

function addDataToMap(data, style, label, layer, lc) {
    featureLayers = L.geoJson(data2, {
        onEachFeature: (typeof onEachFeature == "undefined") ? undefined : onEachFeature,
        pointToLayer: (typeof label == "undefined") ? (function(feature, latlng) {
            return L.circleMarker(latlng);
        }) : (function(feature, latlng) {
            return L.circleMarker(latlng).bindLabel(feature.properties[label], {
                direction: 'right'
            });
        }),
        style: style
    });
    featureLayers.addTo(map);
    group.addLayer(featureLayers)



};

if (typeof style1 == "undefined") style1 = undefined;
if (typeof label1 == "undefined") label1 = undefined;

addDataToMap(data2, style1, label1, "map", "add");
