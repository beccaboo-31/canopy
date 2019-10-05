let url="https://us1.locationiq.com/v1/search.php?key=3340ae6a77d85c&q=";

//Retreive address from the page
// url=url+""+"&format=json";

const fetchPromise = fetch(url);
fetchPromise.then(response => {  //Add the lat lng obtained from the response to the database
  console.log(response);
});


//Current location of user

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        do_something(position.coords.latitude, position.coords.longitude)
      });
}

// var watchID = navigator.geolocation.watchPosition(function(position) {
//     do_something(position.coords.latitude, position.coords.longitude);
// });

//Calculating distance between user and events
var rad = function(x) {
  return x * Math.PI / 180;
};

var getDistance = function(p1, p2, p3, p4) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p3 - p1);
  var dLong = rad(p4 - p2);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1)) * Math.cos(rad(p3)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};