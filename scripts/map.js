var obj_events=[];
//Current location of user
// console.log("POSITION CURRENT: "+position.coords);
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
      obj_events=do_something(position.coords.latitude, position.coords.longitude)
    //   console.log(position.coords);
    });
}

do_something=(userLat, userLon)=>{
    var arr=[];
    db.collection('events').get().then((snapshot) => {
        snapshot.docs.map(doc => {
            var d = getDistance(Number(doc.data()["lat"]),Number(doc.data()["lon"]),userLat,userLon);
            if(d<=4000){
                arr.push(doc);
            }
        })
    });
    return arr;
    //console.log(doc);
    // console.log(getDistance(userLat, userLon, 19.046128, 72.870977))
};
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
