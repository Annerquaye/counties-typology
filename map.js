mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5uZXJxdWF5ZSIsImEiOiJjbDN1OHN1NG4wZzZvM2ZuMHkyYzRybWY0In0.rfM8ZifOkxDoNJ3y39Q5HQ";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/annerquaye/cl3z9ena0000014ok1u3ecie2",
  zoom: 2,
  maxZoom: 9,
  minZoom: 3.68,
  center: [-97.461, 39.160,],
  maxBounds: [
    [-180, 15],
    [-30, 72],
  ],
  projection: "albers",
});

map.on("load", function () {
  map.addLayer(
      {
        id: "state-typology-outline",
        type: "line",
        source: {
          type: "geojson",
          data: "data/stateTypology.geojson",
        },
        paint: {
          "line-color": "#000",
          "line-width": 0.7,
        },
      },
      "waterway-label" // Here's where we tell Mapbox where to slot this new layer
    );
    map.addLayer(
      {
        id: "state-typology",
        type: "fill",
        source: {
          type: "geojson",
          data: "data/stateTypology.geojson",
        },
        maxzoom: 6,
        paint: {
          "fill-color": [
            "match",
            ["get", "max"],
            "Nonspecialized",
            "#FAEDCA",
            "Maufacturing",
            "#7EBC89",
            "Federal/State Government",
            "#9DCDC0",
            "Recreation",
            "#C1DBB3",
            "Mining",
            "#FE5D26",
            "Farming",
            "#F2C078",
            "#ffffff",
          ],
          "fill-outline-color": "#ffffff",
        },
      },
      "state-typology-outline" // Here's where we tell Mapbox where to slot this new layer
    );

    map.addLayer({
      id: "county_typology_outline",
      type: "line",
      source: {
        type: "geojson",
        data: "data/countyTypologyCodes.geojson",
      },
      paint: {
        "line-color": "#ffffff",
        "line-width": 0.3,
      },
    }, 
    "state-typology"
    
    );
  
    map.addLayer(
      {
        id: "county_typology",
        type: "fill",
        source: {
          type: "geojson",
          data: "data/countyTypologyCodes.geojson",
        },
        minzoom: 3,
        paint: {
          "fill-color": [
            "match",
            ["get", "Economic_Type_Label"],
            "Nonspecialized",
            "#FAEDCA",
            "Maufacturing",
            "#7EBC89",
            "Federal/State Government",
            "#9DCDC0",
            "Recreation",
            "#C1DBB3",
            "Mining",
            "#FE5D26",
            "Farming",
            "#F2C078",
            "#ffffff",
          ],
        },
      },
      "county_typology_outline"
    );
    
  });

 


// click on the state Pop for Typology Data

map.on("click", "state-typology", function (e) {
  var stateName = e.features[0].properties.State;
  var state = e.features[0].properties.State;
  var economicType = e.features[0].properties.Economic_Type_Label;
  stateName = stateName.toUpperCase();
  economicType = economicType.toUpperCase();
  new mapboxgl.Popup()
  .setLngLat(e.lngLat)
  .setHTML('<h2> ' + stateName + '</h2>'
      + '<h4>' + 'Economic type -- ' + economicType + '</h4>')
  .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the us_states_elections layer.
map.on("mouseenter", "state-typology", function () {
  map.getCanvas().style.cursor = "pointer";
});
// Change it back to a pointer when it leaves.
map.on("mouseleave", "state-typology", function () {
  map.getCanvas().style.cursor = "";
});


// click on the state tupology data
map.on('click', 'county_typology', function (e) {
    var stateName = e.features[0].properties.State;
    var county = e.features[0].properties.County_name;
    var economicType = e.features[0].properties.Economic_Type_Label;
    stateName = stateName.toUpperCase();
    county = county.toUpperCase();
    economicType = economicType.toUpperCase();
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h2>' + county + ' - ' + stateName + '</h2>'
            + '<h4>' + 'Economic type -- ' + economicType + '</h4>'
            )
        .addTo(map);
  });
  map.on('mouseenter', 'county_typology', function () {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'county_typology', function () {
    map.getCanvas().style.cursor = "";
  }
  );


  mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5uZXJxdWF5ZSIsImEiOiJjbDN1OHN1NG4wZzZvM2ZuMHkyYzRybWY0In0.rfM8ZifOkxDoNJ3y39Q5HQ";
var map2 = new mapboxgl.Map({
  container: "map2",
  style: "mapbox://styles/annerquaye/cl41us0el004w14mr8gl9aoja",
  zoom: 4,
  maxZoom: 12,
  minZoom: 3.6,
  center: [-97.461, 39.160],
  maxBounds: [
    [-180, 15],
    [-30, 72],
  ],
  projection: "albers",
});

map2.on("load", function () {
  map2.addLayer(
      {
        id: "state-typology-outline",
        type: "line",
        source: {
          type: "geojson",
          data: "data/statesBrutality.geojson",
        },
        paint: {
          "line-color": "#000",
          "line-width": 0.3,
        },
      },
      "waterway-label" // Here's where we tell Mapbox where to slot this new layer
    );
      map2.addLayer({
          'id': 'brutalityPolice',
          'type': 'circle',
          'source': {
              'type': 'geojson',
              'data': 'data/policeBrutality.geojson'
          },
          'paint': {
              'circle-color': '#ff7f50',
              'circle-stroke-color': '#4d4d4d',
              'circle-stroke-width': 0.3,
              'circle-radius': 6,
              'circle-opacity': 0.1
          }
      });
  });
   
    // click on the state
    
    map2.on("click", "brutalityPolice", function (e) {
      var stateName = e.features[0].properties.city;
      var state = e.features[0].properties.description;
      cityName = cityName.toUpperCase();
      new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h2> ' + cityName + '</h2>')
      
      .addTo(map2);
    });
    