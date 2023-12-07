

const circumference = document.getElementById("Infocircumference");
const distance = document.getElementById("Infodistance");
const maxTemp = document.getElementById("Maxtemp");
const minTemp = document.getElementById("Mintemp");
const namePlanet = document.querySelector(".container-header-text");
const planetNameLatin = document.querySelector(".container-underheader-text");
const planetDesctiption = document.querySelector(".main-text");
const moonInfotext = document.querySelector(".moon-text");
let generatesolarData;
const Popatmosfare = document.getElementById("atmosfare-modal");
const baseUrl = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com";

/***************************async function  getApikey *************************************************************************** */

async function getApiKey() {
    try {
        const response = await fetch(`${baseUrl}/keys`, {
            method: 'POST',
        });


        if (!response.ok) {
            throw new Error('Network response was not ok');
        }


        const data = await response.json();
        const apiKey = data.key;


     
        console.log(apiKey);


        return apiKey;
    } catch (error) {
        // Handle errors that occurred during the fetch or data processing
        console.error('Error:', error);
    }
};


/* ******************************************async function with getApiKey  *********************************************************** */

 //uses the API keys to fetch informations about planets by the API


async function getSolarData() {
    try {
        // Get the solar key dynamically
        const solarKey = await getApiKey();


       
        console.log('SolarKey:', solarKey);


        // Use a specific endpoint, for example, '/bodies'
        const endpoint = '/bodies';


        let response = await fetch(`${baseUrl}${endpoint}`, {
            method: 'GET',
            headers: { 'x-zocom': solarKey }
        });


        if (!response.ok) {
            throw new Error('Network response was not ok');
        }


        const data = await response.json();


        console.log('Solar Data:', data);
        generatesolarData = data;



    } catch (error) {
        // Handle errors that occurred during the fetch or data processing
        console.error('Error:', error);
    }
}

/* **************************************function that fills html with information*************************************************************** */
 // replace the "template litterals" with the values obtained from the api
//Find the Current Planet:It uses the generatesolarData object to find information about a specific planet based on its name.

function containergridtext(planetName) {
    const currentPlanet = generatesolarData.bodies.find(
        (body) => body.name === planetName
    );

    if (currentPlanet) {
        const { name, latinName, desc, temp, moons } = currentPlanet;

        circumference.innerHTML = `${currentPlanet.circumference} KM`;
        namePlanet.innerHTML = name;
        planetNameLatin.innerHTML = latinName;
        planetDesctiption.innerHTML = desc;
        distance.innerHTML = `${currentPlanet.distance} KM`;
        maxTemp.innerHTML = `${temp.day}°C`;
        minTemp.innerHTML = `${temp.night}°C`;

        const uniqueMoons = [...new Set(moons)];
        const moonInfoString = uniqueMoons.join(", ");

        moonInfotext.innerHTML = moonInfoString;
    }
}
/* ***************************************************************************************************** */
//adds click event listners to planet elements
//Creates an array planetIds containing the IDs of different planets.
//Iterates through each planet ID.
//For each planet ID, retrieves the corresponding HTML element using document.getElementById.

function addClick() {
    const planetIds = ["Merkurius", "Venus", "Jorden", "Mars", "Jupiter", "Saturnus", "Uranus", "Neptunus"];

    planetIds.forEach(id => {
        const planetElement = document.getElementById(id);

        if (planetElement) {

            planetElement.addEventListener('click', () => handlePlanetClick(id));

        }
    });
}

//Handles the click event on a planet element
//calls the openPopup function with the clicked planet's name as an argument.
//Sets the background color of the Popatmosfare element based on the clicked planet's color using the getPlanetColor function.

function handlePlanetClick(planetName) {
    openPopup(planetName);
    Popatmosfare.style.backgroundColor = getPlanetColor(planetName);
}

function getPlanetColor(planetName) {
    // Define your planet colors based on the planetName
    switch (planetName) {
        case "Merkurius": return "#888888";
        case "Venus": return "#e7cdcd";
        case "Jorden": return "#428ed4";
        case "Mars": return "#ef5f5f";
        case "Jupiter": return "#e29468";
        case "Saturnus": return "#c7aa72";
        case "Uranus": return "#c9d4f1";
        case "Neptunus": return "#7a91a7";
        
    }
}


/* ***************************************************************************************************** */
//Opens a popup displaying information about a specific planet
//Sets the display style property of the modalPlanets element to "block," making the popup visible.
//calls the star function so it activates when the modal/popup is open

function openPopup(planetName) {
    modalPlanets.style.display = "block";
    containergridtext(planetName);
        CreateStars();
}


function closeModal() {
    modalPlanets.style.display = "none";
}
/* ***************************************************************************************************** */


// Call the asynchronous function
getSolarData().then(addClick);


/* ***************************************************************************************************** */
//Generates a star field and appends it to the body element
//Creates a container element (div) with the ID "star-container."
//Defines the number of stars
//Uses Array.from to iterate over a range of numbers


function CreateStars() {
    const starFieldContainer = document.createElement("div");
    starFieldContainer.id = "star-container";

    const numberOfStars = 60;

    Array.from({ length: numberOfStars }).forEach(() => {
        const starSize = getRandomNumber(1, 4);
        const starElement = createStarElement(starSize);
        starFieldContainer.appendChild(starElement);
    });

    document.body.appendChild(starFieldContainer);
}

function createStarElement(size) {
    const starElement = document.createElement("div");
    starElement.className = "star";
    starElement.style.width = `${size}px`;
    starElement.style.height = `${size}px`;
    starElement.style.top = `${getRandomNumber(0, 100)}vh`;
    starElement.style.left = `${getRandomNumber(0, 100)}vw`;
    return starElement;
}
//getRandomNumber Function Generates a random number within a specified range.
// A random number between min and max 
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

/* ***************************************************************************************************** */
