
//FUNCIONES PARA LLAMAR A LA API DE ESPECIES Y MOSTRARME LA CANTIDAD QUE LE DIGA A SPECIE_NUMBER//


const SPECIE_NUMBER = 15;
async function fetchSpecies() {
    try {
        const speciesToLoad = Array.from({length: SPECIE_NUMBER}).map(async (_, index) => {const petition = await fetch(`https://www.swapi.tech/api/species/${index+1}`)
        return petition.json()
    });
        return await Promise.all(speciesToLoad);
    } catch (error) {
        console.error("Error fetching species:", error);
    }
}

function displaySpecies(species) {
    const specieCardsContainer = document.getElementById("specieCards");
    species.forEach(({result: {properties}}) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const imgContainer = document.createElement("div");
        imgContainer.classList.add("image-container");
        const img = document.createElement("img");
        img.src = `images_species/${properties.name.toLowerCase().replace(/\s/g, '-')}.png`;
        img.alt = properties.name;
        imgContainer.appendChild(img);
        card.appendChild(imgContainer);

        const contentContainer = document.createElement("div");
        contentContainer.classList.add("content-container");
        contentContainer.innerHTML = `
            <h2>${properties.name}</h2>
            <p>Classification: ${properties.classification}</p><br>
            <p>Average height: ${properties.average_height}</p><br>
            <p>Skin color: ${properties.skin_colors}</p><br>
            <p>Eye colors: ${properties.eye_colors}</p><br>
            <p>Hair colors: ${properties.hair_colors}</p>
        `;
        card.appendChild(contentContainer);

        card.dataset.value = getValueForSpecie(properties.name);

        // Aquí agregamos el evento de clic a cada tarjeta individualmente
        card.addEventListener('click', () => {
            const specieValue = parseInt(card.dataset.value);
            let survivalRate = parseInt(localStorage.getItem('survivalRate'));
            if (isNaN(survivalRate)) {
                survivalRate = 0;
            }
            survivalRate += specieValue;
            localStorage.setItem('survivalRate', survivalRate);
            window.location.href = "result.html";
        });

        specieCardsContainer.appendChild(card);
    })
}

        
  

function getValueForSpecie(specieName) {
    switch (specieName) {
        case 'Human':
            return 1;
        case 'Droid':
            return -4;
        case 'Wookie':
            return 3;
        case 'Rodian':
            return -1;
        case 'Hutt':
            return 2;
        case "Yoda's species":
            return 5;
        case 'Trandoshan':
            return -2;
        case 'Mon Calamari':
            return -1;
        case 'Ewok':
            return 1;
        case 'Sullustan':
            return 0;
        case 'Neimodian':
            return -1;
        case 'Gungan':
            return 4;
        case 'Toydarian':
            return -1;
        case 'Dug':
            return -1;
        case "Twi'lek":
            return -2;
        default:
            return 0; // Valor predeterminado si el planeta no tiene un valor asignado
    }
}

async function loadSpecies() {
    const species = await fetchSpecies()
    if (species) {
        displaySpecies(species);
    } else {
        // TODO Hacer página de error
    }
}

// Función para guardar la elección de especie y mostrar el resultado final
function saveSpecies() {

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('card')) {
            const specieValue = parseInt(e.target.dataset.value); // Obtener el valor de la tarjeta de planeta
            let survivalRate = parseInt(localStorage.getItem('survivalRate')); // Obtener el valor de localStorage
            if (isNaN(survivalRate)) {
                survivalRate = 0; // Establecer un valor predeterminado si no hay valor en localStorage
            }
            survivalRate += specieValue; // Sumar el valor de la tarjeta al valor en localStorage
            localStorage.setItem('survivalRate', survivalRate); // Guardar el nuevo valor en localStorage
            window.location.href = "result.html"; // Redirigir a la página "choose_species.html"
            
        }
    });  
   
}