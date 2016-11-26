var segment = 0
var divisions = 1000
var journeytime = 30 * 1000
var updates = 0
var latitude = 42.345573;
var longitude = -71.098326;
var randomcounter = 0

var fenway = {lat: latitude, lng: longitude};
  var map = new google.maps.Map(document.getElementById('map'), {
    center: fenway,
    zoom: 14
  });
  var panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano'), {
        position: fenway,
        pov: {
          heading: 34,
          pitch: 10
        }
      });
  map.setStreetView(panorama);

function update(){
var start = Date.now()
var proportion = [0, 0.10791616144119175472024943703447, 0.72631214273341416940931924476009, 1]
var coordinates = [
  [22.290156 , 113.938713],
  [22.291706, 113.932658],
  [22.269341, 113.907729],
  [22.256287, 113.901401]
]
var timerId = setInterval(function () {
  if(updates > divisions*proportion[segment+1]) {
  	if(++segment > 2){
    	clearInterval(timerId)
    }
  }
  else {
    var localprop = ((Date.now() - start)/journeytime - proportion[segment]) / (proportion[segment+1] - proportion[segment])
    latitude = localprop*coordinates[segment+1][0] + (1-localprop)*coordinates[segment][0];
    longitude = localprop*coordinates[segment+1][1] + (1-localprop)*coordinates[segment][1];
    console.log(segment)
    updates++;
	map.setCenter(new google.maps.LatLng(latitude, longitude))
  }
}, journeytime/divisions)
}

update();