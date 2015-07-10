var city = document.getElementById('city'),
    output = document.getElementById('output'),
    weather = document.getElementById('press');


function getWeather(){
  orbit.get("http://api.openweathermap.org/data/2.5/weather?q={"+city.value+"}", function(){
    var data = JSON.parse(this.response);
    console.log(data)
    output.innerHTML += "<p> Weather Description: "+(data.weather[0].description)+"</p>";
  })
}

weather.addEventListener('click',function(e){
  console.log('bar')
  getWeather();
  console.log('foo')
})
