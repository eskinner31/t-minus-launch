var city = document.getElementById('city'),
    output = document.getElementById('output'),
    weather = document.getElementById('press'),
    launch = document.getElementById('launch'),
    video = document.getElementById('video');
    video.style.visibility ="hidden"


function getWeather(){
  orbit.get("http://api.openweathermap.org/data/2.5/weather?q={"+city.value+"}", function(){
    var data = JSON.parse(this.response);
    console.log(data)
    output.innerHTML += "<p> Weather Description: "+(data.weather[0].description)+"</p>"
    output.innerHTML += "<p> Humidity: "+data.main.humidity+"%</p>"
    output.innerHTML += "<p> Temperature: "+data.main.temp+"K</p>"
    output.innerHTML += "<p> Wind Speed: "+data.wind.speed+"mph</p>"
    output.innerHTML += "<p> Pressure: "+data.main.pressure+"pascals</p>"
  })
}

function liftoff(){
  console.log(video.src)
  video.style.visibility="visible";
  video.src ="https://www.youtube.com/embed/zRGeLQkWuYk&autoplay=1";
}

weather.addEventListener('click',function(e){
  getWeather();
})

launch.addEventListener('click',function(e){
  liftoff();
})
