window.onload = function () {
  var map = L.map('map', {
      center: [30.0, 0.0],
      zoom: 2,
    });
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'vinh3928.mm7kl4j4',
        accessToken: 'pk.eyJ1IjoidmluaDM5MjgiLCJhIjoiMDg0MTkyMmIwM2QxZGQzY2QyMzk1ZDE4ODEzZmE3MjQifQ.NnSoDirsaFSkazrlHnHlXQ'
    }).addTo(map);

    L.tileLayer('http://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png', {
        attribution: 'Map data © OpenWeatherMap',
        maxZoom: 18
    }).addTo(map);
}
