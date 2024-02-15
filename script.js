
//Variables a usar
const pokemonImage = document.getElementById('pokemon-image');
const pokemonName = document.getElementById('pokemon-name');
const pokemonPS = document.getElementById('pokemon-ps');
const pokemonInfo = document.getElementById('pokemon-info');
const pokemonAttack = document.getElementById('pokemon-attack');
const pokemonType = document.getElementById('pokemon-type');
const pokemonWeakness = document.getElementById('pokemon-weakness');
const pokemonTypeImage = document.getElementById('imagen-tipo');
const pokemonContainer = document.getElementsByName('pokemon-container');
const pokemonCountAttack = document.getElementById('pokemon-countAttack');

// Iconos tipos
const typeImages = {
    fire: './icons/fire.png',
    water: './icons/water.png',
    grass: './icons/grass.png',
    rock: './icons/rock.png',
    bug: './icons/bug.png',
    electric: './icons/electric.png',
    psychic: './icons/psychic.png',
    dragon: './icons/dragon.png',
    ice: './icons/ice.png',
    dark: './icons/dark.png',
    ghost: './icons/ghost.png',
    normal: './icons/normal.png',
    poison: './icons/poison.png',
    steel: './icons/steel.png',
    fighting: './icons/fight.png',
    fairy: './icons/fairy.png',
    ground: './icons/ground.png',
    flying: './icons/flying.png'
};

//Background de la carta
const backgroundCard = {
    fire: './background/fire.jpg',
    water: './background/water.jpg',
    grass: './background/grass.jpg',
    rock: './background/rock.jpg',
    bug: './background/bug.jpg',
    electric: './background/electric.jpg',
    psychic: './background/psychic.jpg',
    dragon: './background/dragon.jpg',
    ice: './background/ice.jpg',
    dark: './background/dark.jpg',
    ghost: './background/ghost.jpg',
    normal: './background/normal.jpg',
    poison: './background/poison.jpg',
    steel: './background/steel.jpg',
    fighting: './background/fight.jpg',
    fairy: './background/fairy.jpg',
    ground: './background/ground.jpg',
    flying: './background/flying.jpg'
}

//fondo de la pagina de acuerdo al tipo

const fondPage = {
    fire: 'linear-gradient(-60deg, rgb(204, 133, 51) 50%, rgb(255, 51, 0) 50%)',
    water: 'linear-gradient(-60deg, rgb(94, 212, 236) 50%, rgb(0, 153, 255) 50%)',
    grass: 'linear-gradient(-60deg, #6c3 50%, rgb(174, 255, 0) 50%)',
    rock: 'linear-gradient(-60deg, rgb(234, 234, 234) 50%, rgb(171, 139, 59) 50%)',
    bug: 'linear-gradient(-60deg, rgb(191, 204, 51) 50%, rgb(26, 159, 35) 50%)',
    electric: 'linear-gradient(-60deg, rgb(204, 150, 51) 50%, rgb(255, 183, 0) 50%)',
    psychic: 'linear-gradient(-60deg, rgb(204, 51, 201) 50%, rgb(102, 0, 255) 50%)',
    dragon: 'linear-gradient(-60deg, rgb(166, 211, 241)50%, rgb(213, 121, 74) 50%)',
    ice: 'linear-gradient(-60deg, rgb(181, 238, 242) 50%, #09f 50%)',
    dark: 'linear-gradient(-60deg, rgb(89, 55, 174) 50%, rgb(17, 46, 65) 50%)',
    ghost: 'linear-gradient(-60deg, rgb(84, 24, 144) 50%, rgb(0, 0, 0) 50%)',
    normal: 'linear-gradient(-60deg, #6c3 50%, #09f 50%)',
    poison: 'linear-gradient(-60deg, rgb(128, 51, 204) 50%, rgb(255, 0, 140) 50%)',
    steel: 'linear-gradient(-60deg, rgb(203, 202, 205) 50%, rgb(7, 6, 6) 50%)',
    fighting: 'linear-gradient(-60deg, rgb(210, 162, 51) 50%, rgb(221, 221, 221) 50%)',
    fairy: 'linear-gradient(-60deg, rgb(241, 124, 229) 50%, #09f 50%)',
    ground: 'linear-gradient(-60deg, rgb(145, 111, 50) 50%, rgb(98, 73, 10) 50%)',
    flying: 'linear-gradient(-60deg, rgb(255, 255, 255) 50%, #09f 50%)'
}

//Funcion para obtener las debilidades del pokemon por su tipo
async function obtenerDebilidadesPokemon(tipo) {
    const apiUrl = `https://pokeapi.co/api/v2/type/${tipo}`;

    try {
        const respuesta = await fetch(apiUrl);
        const data = await respuesta.json();
        
        // Extraer las debilidades del tipo
        const weaknesses = data.damage_relations.double_damage_from.map(weakness => ({
            name: weakness.name, //relacionar el tipo con la imagen de la debilidad
            image: typeImages[weakness.name],
        }));

        return weaknesses;
    } catch (error) {
        console.error('Error al obtener las debilidades del tipo:', error);
        return [];
    }
}


//Funcion principal para obtener un pokemon de forma aleatoria
async function obtenerPokemonAleatorio() {
    const pokemonId = Math.floor(Math.random() * 300) + 1; // Hay actualmente 898 Pokémon

    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

    function cambiarColor(imagenFondo) {
        const nombrePokemon = document.getElementById("pokemon-name");
        const psPokemon = document.getElementById("pokemon-ps");
        const parrafoPS = document.querySelector(".rightText");
        const fondoAnimado = document.querySelector(".bg");

        if (imagenFondo === "dark.jpg") {
            nombrePokemon.style.color = "white";
            psPokemon.style.color = 'white';
            parrafoPS.style.color = 'white';
            fondoAnimado.style.backgroundImage = 'background-image: linear-gradient(-60deg, rgb(89, 55, 174) 50%, rgb(17, 46, 65) 50%)';
        } else {
            nombrePokemon.style.color = "black";
            psPokemon.style.color = 'black';
            parrafoPS.style.color = 'black';
            fondoAnimado.style.backgroundImage = 'background-image: linear-gradient(-60deg, #6c3 50%, #09f 50%)';
        }
    }

    try {
        const respuesta = await fetch(apiUrl);
        const data = await respuesta.json();

        const imagenUrl = data.sprites.other.dream_world.front_default;
        const name = data.name;
        //nombre con la primera en mayuscula
        const nameMayus = name.charAt(0).toUpperCase() + name.slice(1);
        
        const ps = data.stats[0].base_stat;
        const type = data.types.map(type => type.type.name);
        const height = data.height;
        const weight = data.weight;
        const attack = data.moves[0].move.name;
        
        // Obtener las debilidades del Pokémon usando el async await anterior
        //llamamos a obtener debilidades
        const weaknesses = await obtenerDebilidadesPokemon(type[0]);
        const tipoPokemon = data.types[0].type.name;
        const backgroundUrl = backgroundCard[tipoPokemon]; // Obtén la URL de la imagen de fondo del tipo de Pokémon
        document.getElementById("pokemon-container").style.backgroundImage = `url(${backgroundUrl})`;
        cambiarColor(backgroundUrl.split("/").pop());

        const backgroundAnimated = fondPage[tipoPokemon];
        const elementoBg = document.querySelectorAll(".bg");

        //recorrer todas las clases
        elementoBg.forEach(elemento => {
            elemento.style.backgroundImage = backgroundAnimated;
        } );

        pokemonImage.src = imagenUrl;
        pokemonName.innerText = nameMayus;
        pokemonPS.innerText = ps;
        pokemonInfo.innerText = `#${data.id} ${type} - Altura: ${height}m - Peso: ${weight}kg`;
        pokemonAttack.innerText = attack;
        pokemonType.innerHTML = type.map(type => `<img src="${typeImages[type]}" alt="${type}">`).join('');
        pokemonTypeImage.innerHTML = type.map(type => `<img src="${typeImages[type]}" alt="${type}">`).join('');
        pokemonWeakness.innerHTML = weaknesses.length > 0 ? 
        weaknesses.map(weakness => `<img src="${weakness.image}" alt="${weakness.name}">`).join('') : 
        "No se pudieron obtener las debilidades";



    } catch (error) {
        console.error('Error al obtener el Pokémon:', error);
    }
}

obtenerPokemonAleatorio();
