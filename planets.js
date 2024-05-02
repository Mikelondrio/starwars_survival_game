//FUNCIONES PARA LLAMAR A LA API DE PLANETAS Y MOSTRARME LA CANTIDAD QUE LE DIGA A PLANET_NUMBER//

const PLANET_NUMBER = 15;
async function fetchPlanets() {
    try {
        const planetsToLoad = Array.from({length: PLANET_NUMBER}).map(async (_, index) => {const petition = await fetch(`https://www.swapi.tech/api/planets/${index+1}`)
        return petition.json()
    });
        return await Promise.all(planetsToLoad);
    } catch (error) {
        console.error("Error fetching planets:", error);
    }
}

function displayPlanets(planets) {
    const planetCardsContainer = document.getElementById("planetCards");
    planets.forEach(({ result: { properties } }) => {
        const card = document.createElement("div");
        card.classList.add("card");

        // Crear contenedor para la imagen
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("image-container");
        
        // Crear imagen del planeta
        const img = document.createElement("img");
        img.src = `images_planets/${properties.name.toLowerCase().replace(/\s/g, '-')}.png`;
        img.alt = properties.name;

        // Agregar imagen al contenedor de la imagen
        imgContainer.appendChild(img);

        // Agregar contenedor de imagen a la carta del planeta
        card.appendChild(imgContainer);

        // Crear contenedor para la información del planeta
        const contentContainer = document.createElement("div");
        contentContainer.classList.add("content-container");

        // Agregar información del planeta a la tarjeta
        contentContainer.innerHTML = `
            <h2>${properties.name}</h2>
            <p>Climate: ${properties.climate}</p><br>
            <p>Diameter: ${properties.diameter}</p><br>
            <p>Gravity: ${properties.gravity}</p><br>
            <p>Population: ${properties.population}</p>
        `;

        // Agregar contenedor de información a la carta del planeta
        card.appendChild(contentContainer);

        // Asignar el valor del planeta a la tarjeta
        card.dataset.value = getValueForPlanet(properties.name);

        // Agregar evento de clic a la carta del planeta
        card.addEventListener('click', () => {
            const planetValue = parseInt(card.dataset.value);
            let survivalRate = parseInt(localStorage.getItem('survivalRate'));
            if (isNaN(survivalRate)) {
                survivalRate = 0;
            }
            survivalRate += planetValue;
            localStorage.setItem('survivalRate', survivalRate);
            window.location.href = "choose_species.html";
        });

        // Agregar la carta del planeta al contenedor principal
        planetCardsContainer.appendChild(card);
    });
}

function getValueForPlanet(planetName) {
    switch (planetName) {
        case 'Tatooine':
            return -3;
        case 'Alderaan':
            return 3;
        case 'Naboo':
            return 3;
        case 'Yavin IV':
            return 0;
        case 'Hoth':
            return -3;
        case 'Dagobah':
            return -1;
        case 'Bespin':
            return -5;
        case 'Endor':
            return 1;
        case 'Coruscant':
            return -1;
        case 'Kamino':
            return -2;
        case 'Geonosis':
            return -3;
        case 'Utapau':
            return 0;
        case 'Mustafar':
            return -6;
        case 'Kashyyyk':
            return 3;
        case 'Polis Massa':
            return -3;
        default:
            return 0; // Valor predeterminado si el planeta no tiene un valor asignado
    }
}

async function loadPlanets() {
    const planets = await fetchPlanets()
    if (planets) {
        displayPlanets(planets);
    } else {
        // TODO Hacer página de error
    }
}
// FUNCION PARA GUARDAR EL VALOR DEL PLANETA SELECCIONADO EN EL ARRAY survivalRate Y PASAR A LA PAGINA DE ESPECIES//
function savePlanet() {
    // Agregar un manejador de clic a la tarjeta de planeta
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('card')) {
            const planetValue = parseInt(e.target.dataset.value); // Obtener el valor de la tarjeta de planeta
            let survivalRate = parseInt(localStorage.getItem('survivalRate')); // Obtener el valor de localStorage
            if (isNaN(survivalRate)) {
                survivalRate = 0; // Establecer un valor predeterminado si no hay valor en localStorage
            }
            survivalRate += planetValue; // Sumar el valor de la tarjeta al valor en localStorage
            localStorage.setItem('survivalRate', survivalRate); // Guardar el nuevo valor en localStorage
            window.location.href = "choose_species.html"; // Redirigir a la página "choose_species.html"
        }
    });
}
