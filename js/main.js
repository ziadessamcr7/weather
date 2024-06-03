var searchInput = document.getElementById('searchInput')

//today variables
var today_name = document.getElementById('today_name');
var today_number = document.getElementById('today_number');
var today_month = document.getElementById('today_month');
var city_name = document.getElementById('city_name')
var temp_in_C = document.getElementById('temp_in_C')
var today_condition_img = document.getElementById('today_condition_img')
console.log(today_condition_img)
var today_condition = document.getElementById('today_condition')
var humidity = document.getElementById('humidity')
var wind_velocity = document.getElementById('wind_velocity')
var wind_dir = document.getElementById('wind_dir')

//tomorrow & after tomorrow variables
var nameOfNextDay = document.getElementsByClassName('nameOfNextDay')
var condition_img = document.getElementsByClassName('condition_img')
var max_temp = document.getElementsByClassName('max_temp')
var min_temp = document.getElementsByClassName('min_temp')
var condition = document.getElementsByClassName('condition')


var weatherArray = []


function searchData(term = "cairo") {
    var myHttpReq = new XMLHttpRequest();

    myHttpReq.open('GET', `https://api.weatherapi.com/v1/forecast.json?key=788e204a8a844367883225727232708&q=${term}&days=3`)

    myHttpReq.send();

    myHttpReq.addEventListener('loadend', function () {
        if (myHttpReq.status == 200) {
            weatherArray = JSON.parse(myHttpReq.response)
            console.log(weatherArray)
            DisplayTodayWeather()
            displayNextTwoDays()

        }
    })
}
searchData()



function DisplayTodayWeather() {
    var todayDate = new Date()


    today_name.innerHTML = todayDate.toLocaleDateString('en-us', { weekday: 'long' })
    today_number.innerHTML = todayDate.getDate()
    today_month.innerHTML = todayDate.toLocaleDateString('en-us', { month: 'long' })
    city_name.innerHTML = weatherArray.location.name
    temp_in_C.innerHTML = weatherArray.current.temp_c + '<sup>o</sup>C'
    today_condition_img.src = weatherArray.current.condition.icon
    today_condition.innerHTML = weatherArray.current.condition.text
    humidity.innerHTML = weatherArray.current.humidity + '%'
    wind_velocity.innerHTML = weatherArray.current.wind_kph + 'km/h'
    wind_dir.innerHTML = weatherArray.current.wind_dir

}

function displayNextTwoDays() {

    for (var i = 0; i < 2; i++) {

        var nextDay = new Date(weatherArray.forecast.forecastday[i + 1].date)

        nameOfNextDay[i].innerHTML = nextDay.toLocaleDateString('en-us', { weekday: 'long' })

        max_temp[i].innerHTML = weatherArray.forecast.forecastday[i + 1].day.maxtemp_c + '<sup>o</sup>C'
        min_temp[i].innerHTML = weatherArray.forecast.forecastday[i + 1].day.mintemp_c + '<sup>o</sup>C'
        condition_img[i].src = weatherArray.forecast.forecastday[i + 1].day.condition.icon
        condition[i].innerHTML = weatherArray.forecast.forecastday[i + 1].day.condition.text
    }

}

// function search(){
//     console.log(searchInput.value)
// }