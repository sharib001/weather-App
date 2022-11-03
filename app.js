// Logic For fetching Data From The Weather API

// alert("No matter the weather, lets get Success together.")

const temperature = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateTime = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".search");
const form = document.querySelector("form");

form.addEventListener("submit", search);

// Default Location
let target = "delhi"

// Async function to Fetching the Data from the API
const fetchData = async (target) => {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=eed7b956d153463d9ae130450220311&q=${target}`
        const responce = await fetch(url);
        const data = await responce.json();

        // console.log(data);

        // Destructuring the fetched Data
        const {
            current: {
                temp_c,
                condition: { text, icon },
            },
            location: { name, localtime },
        } = data;

        // Calling Dom update Function
        updateDom(temp_c, name, localtime, icon, text);

    } catch (error) {
        alert("Location not Found !");
    }
};

// Function to Updating the Document
function updateDom(temp, city, time, emoji, text) {
    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const day = new Date(exactDate).getDay();
    const exactday = getDay(day);

    temperature.innerHTML = `${temp}°`;
    cityField.innerHTML = city;
    dateTime.innerHTML = ` ${exactTime} - ${exactday} ${exactDate}`
    emojiField.src = emoji
    weatherField.innerHTML = text
}

fetchData(target);

// function for setting the value of Location
function search(event) {
    event.preventDefault();

    target = searchField.value;
    fetchData(target);
}


// function to get the current Day
function getDay(num) {
    switch (num) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "Can't Get Day";
    }
}
