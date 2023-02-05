var apiKey = '&APPID=0ed0de76f83b69a5e0d47aed15600404';
var url = 'http://api.openweathermap.org/data/2.5/weather?q=';
//var citySelected = document.getElementById('citySelected');
var selectedCity = document.querySelector('.selectedCity');//Displays the city name in the section on the right
var search = document.querySelector('.search');
var cityName = document.getElementById('city-name');
var temperature = document.getElementById('temperature');
var wind = document.getElementById('wind');
var humidity = document.getElementById('humidity');

function getApi(city) {
    var queryString = url + city + apiKey;
    var urlForecast = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + apiKey
    console.log('queryString ' + queryString);
    console.log('urlForecast ' + urlForecast);

    fetch(queryString)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })

        .then(function (data) {

            console.log(data.name);
            var currentDate = dayjs();
            var formattedDate = currentDate.format("MM/DD/YYYY");
            var icon = data.weather[0].icon;
            tempF = (data.main.temp - 273.15) * 9 / 5 + 32;
            tempF = tempF.toFixed(2);
        
            cityName.textContent = data.name + '(' + formattedDate + ')'; //Need to add icon
            temperature.textContent = 'Temperature: ' + tempF + 'F°';
            wind.textContent = 'Wind: ' + data.wind.speed + ' MPH';
            humidity.textContent = 'Humidity: ' + data.main.humidity + '%';

            console.log(data.weather[0].icon);
            var urlIcon = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';

            console.log(urlIcon);
            fetch(urlIcon)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.blob();
                })
                .then(blob => {
                    const imageUrl = URL.createObjectURL(blob);
                    // Do something with the image URL, for example:
                    const imgElement = document.createElement('img');
                    imgElement.src = imageUrl;
                    cityName.append(imgElement);

                })
                .catch(error => {
                    console.error('There was a problem:', error);
                });

        });

    fetch(urlForecast)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('There was a problem:', error);
        });

    for (var i = 0; i < data.length; i++){
        
    }

}



function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchCity = document.querySelector('.cityText').value;
    console.log(searchCity);

    if (!searchCity) {
        console.error('You need a search input value!');
        return;
    }

    getApi(searchCity);

    //location.assign(queryString);
    //queryString api.openweathermap.org/data/2.5/weather?q=Orlando&APPID=0ed0de76f83b69a5e0d47aed15600404
}


search.addEventListener('click', handleSearchFormSubmit);