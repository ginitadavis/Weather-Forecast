var apiKey = '&APPID=0ed0de76f83b69a5e0d47aed15600404';
var url = 'http://api.openweathermap.org/data/2.5/weather?q=';
//var citySelected = document.getElementById('citySelected');
var selectedCity = document.querySelector('.selectedCity');//Displays the city name in the section on the right
var search = document.querySelector('.search');
var cityName = document.getElementById('city-name');
var temperature = document.getElementById('temperature');
var wind = document.getElementById('wind');
var humidity = document.getElementById('humidity');
var date1 = document.getElementById('date1');
var temperature1 = document.getElementById('temperature1');
var wind1 = document.getElementById('wind1');
var humidity1 = document.getElementById('humidity1');
var date2 = document.getElementById('date2');
var temperature2 = document.getElementById('temperature2');
var wind2 = document.getElementById('wind2');
var humidity2 = document.getElementById('humidity');
var date3 = document.getElementById('date3');
var temperature3 = document.getElementById('temperature3');
var wind3 = document.getElementById('wind3');
var humidity3 = document.getElementById('humidity3');
var date4 = document.getElementById('date4');
var temperature4 = document.getElementById('temperature4');
var wind4 = document.getElementById('wind4');
var humidity4 = document.getElementById('humidity4');
var date5 = document.getElementById('date5');
var temperature5 = document.getElementById('temperature5');
var wind5 = document.getElementById('wind5');
var humidity5 = document.getElementById('humidity5');
var buttonContainer = document.querySelector('.buttonContainer');

function getApi(city) {
    var queryString = url + city + apiKey;
    var urlForecast = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + apiKey

    fetch(queryString)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })

        .then(function (data) {

            var currentDate = dayjs();
            var formattedDate = currentDate.format("MM/DD/YYYY");
            var icon = data.weather[0].icon;
            tempF = (data.main.temp - 273.15) * 9 / 5 + 32;
            tempF = tempF.toFixed(2);

            cityName.textContent = data.name + '(' + formattedDate + ')'; //Need to add icon
            temperature.textContent = 'Temperature: ' + tempF + 'F°';
            wind.textContent = 'Wind: ' + data.wind.speed + ' MPH';
            humidity.textContent = 'Humidity: ' + data.main.humidity + '%';

            var urlIcon = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';

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

    var dataLenght;
    fetch(urlForecast)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            for (var i = 0; i < data.list.length; i++) {

                tempF = (data.list[i].main.temp - 273.15) * 9 / 5 + 32;
                tempF = tempF.toFixed(2);
                var date = dayjs();
                var newDate = date.add([i + 1], 'day');
                var formattedDate = newDate.format("MM/DD/YYYY");

                if (i === 0) {
                    date1.textContent = formattedDate;
                    temperature1.textContent = 'Temp: ' + tempF + ' F°';
                    wind1.textContent = 'Wind: ' + data.list[i].wind.speed + ' MPH';
                    humidity1.textContent = 'Humidity: ' + data.list[i].main.humidity + ' %';
                } else if (i === 1) {
                    date2.textContent = formattedDate;
                    temperature2.textContent = 'Temp: ' + tempF + ' F°';
                    wind2.textContent = 'Wind: ' + data.list[i].wind.speed + ' MPH';
                    humidity2.textContent = 'Humidity: ' + data.list[i].main.humidity + ' %';
                } else if (i === 2) {
                    date3.textContent = formattedDate;
                    temperature3.textContent = 'Temp: ' + tempF + ' F°';
                    wind3.textContent = 'Wind: ' + data.list[i].wind.speed + ' MPH';
                    humidity3.textContent = 'Humidity: ' + data.list[i].main.humidity + ' %';
                } else if (i === 3) {
                    date4.textContent = formattedDate;
                    temperature4.textContent = 'Temp: ' + tempF + ' F°';
                    wind4.textContent = 'Wind: ' + data.list[i].wind.speed + ' MPH';
                    humidity4.textContent = 'Humidity: ' + data.list[i].main.humidity + ' %';
                } else {
                    date5.textContent = formattedDate;
                    temperature5.textContent = 'Temp: ' + tempF + ' F°';
                    wind5.textContent = 'Wind: ' + data.list[i].wind.speed + ' MPH';
                    humidity5.textContent = 'Humidity: ' + data.list[i].main.humidity + ' %';
                }

            }

        })
        .catch(error => {
            console.error('There was a problem:', error);
        });

    var createButton = document.createElement('button');
    createButton.textContent = city;
    buttonContainer.appendChild(createButton);
    buttonContainer.className = 'btn btn-primary';

    /*var newButton = $('<button>');
    newButton.addClass('new-button btn btn-primary');
    newButton.attr('data-button', city);
    newButton.text(city);
    buttonContainer.append(newButton);*/

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

}

search.addEventListener('click', handleSearchFormSubmit);

buttonContainer.addEventListener('click', function(){
    var buttonCity = this.text;
    console.log(buttonCity);
    //getApi(buttonCity);
})