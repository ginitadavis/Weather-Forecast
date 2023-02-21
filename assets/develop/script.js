var apiKey = '&APPID=0ed0de76f83b69a5e0d47aed15600404';
var url = 'https://api.openweathermap.org/data/2.5/weather?q=';
var selectedCity = document.querySelector('.selectedCity');
var search = document.querySelector('.search');
var historyBtn = document.querySelector('.history');
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
var humidity2 = document.getElementById('humidity2');
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
var boxContainers = document.querySelectorAll('.box');
var weatherSectionContainer = document.querySelector('.weather-section-container');

var cityLocalStorage = localStorage.getItem('citySaved');

console.log('TEST')
console.log(cityLocalStorage)

if (cityLocalStorage){
    getApi(cityLocalStorage);
}

function getApi(city) {
    
    document.querySelector('.cityText').value = '';
    localStorage.setItem('citySaved', city);
    
    //I first get the complete url with the city parameter entered by the user
    var queryString = url + city + apiKey;
    //The second url gets the forecast
    var urlForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + apiKey;

    fetch(queryString)
        .then(function (response) {
            if (!response.ok) {
                window.alert('Not a valid city');
                throw new Error('Network response was not ok'); //response.json();
            }
            return response.json();
        })
        .then(function (data) {

            //if fetch was successful
            var currentDate = dayjs();
            var formattedDate = currentDate.format("MM/DD/YYYY");
            var icon = data.weather[0].icon;
            tempF = (data.main.temp - 273.15) * 9 / 5 + 32;
            tempF = tempF.toFixed(2);
            cityName.textContent = data.name + '(' + formattedDate + ')'; //Need to add icon
            temperature.textContent = 'Temperature: ' + tempF + 'F°';
            wind.textContent = 'Wind: ' + data.wind.speed + ' MPH';
            humidity.textContent = 'Humidity: ' + data.main.humidity + '%';

            var urlIcon = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';

            //Save the last searched city into the local storage

            //Second fetch
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

        })
        .catch(error => {
            console.error('There was a problem:', error);
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
            // show the boxes here??
            weatherSectionContainer.setAttribute('style', 'display: block');
            boxContainers.forEach(function(section) {
                section.setAttribute('style', 'display: block');
            });
        })
        .catch(error => {
            console.error('There was a problem:', error);
        });

        var checkIfButtonExists = document.getElementsByClassName('newButton');
        if (checkIfButtonExists.length > 0){
            for (var x = 0; x < checkIfButtonExists.length ; x++){
                if (checkIfButtonExists[x].textContent === city){
                    return;
                }
            }
        }
        
        var createButton = document.createElement('button');
        createButton.className = 'newButton btn btn-primary my-2';
        createButton.textContent = city;
        buttonContainer.appendChild(createButton);
        buttonContainer.className = 'buttonContainer d-flex pl-5 pb-2 pr-5 flex-column'
    
}

//I get the text from the textarea and if the item is not null, I call function getApi
function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchCity = document.querySelector('.cityText').value;

    if (!searchCity) {
        window.alert('Please enter a city name');
        return null;
    } 
    
    getApi(searchCity);

}

//Any time an user clicks on the search button calls the function handleSearchFormSubmit
search.addEventListener('click', handleSearchFormSubmit);

//Any time there is a search for a new city a new button is created in the buttonContainer section
//When one of those buttons is clicked, then this function gets the button text and calls the
//function getApi and sends the city name
buttonContainer.addEventListener('click', function(event){
    var buttonCity = event.target.innerHTML;
    getApi(buttonCity);
})
    
historyBtn.addEventListener('click', retrieveHistory);

function retrieveHistory(e){

    e.preventDefault();


    //If local Storage is not null
    if (localStorage.getItem('city')){

        //Gets the cities from the local Storage that are separated by -
        var cities = localStorage.getItem('city').split('-');

        //Gets only the unique cities
        let uniqueArray = cities.filter((item, index) => cities.indexOf(item) === index);
        console.log(uniqueArray);
        
        //Pulls all the buttons with the cities searched  previously
        for (var y=0 ; y < uniqueArray.length; y++){
            var createButton = document.createElement('button');
            createButton.className = 'newButton btn btn-primary my-2';
            createButton.textContent = uniqueArray[y];
            buttonContainer.appendChild(createButton);
            buttonContainer.className = 'buttonContainer d-flex pl-5 pb-2 pr-5 flex-column';
        }
    } else {
        window.alert('There is no history');
    }
    
}


