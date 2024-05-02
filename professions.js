//FUNCION QUE ELIGE LA PROFESION, GUARDA SU VALOR EN EL ARRAY survivalRate Y NOS LLEVA A LA PAGINA DE PLANETAS//
function saveProfession(profession) {

    let professionValue=0;
    switch(profession) {
        case 'bounty-hunter':
            professionValue = 2; 
            break;
        case 'jedi':
            professionValue = 1; 
            break;
        case 'noble':
            professionValue = 1; 
            break;
        case 'soldier':
            professionValue = -2; 
            break;
        case 'sith':
            professionValue = -1; 
            break;
        case 'scavenger':
            professionValue = 0; 
            break;
    }
    let survivalRate = 0;
    survivalRate += professionValue;

    localStorage.setItem('survivalRate', survivalRate);
  
    window.location.href = "choose_planet.html";
}
