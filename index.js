const buscar = document.getElementById("buscar");
const pokemon__right = document.getElementsByClassName("pokemon__right")[0];

buscar.addEventListener("click", getPokemon);

async function getPokemon() {
    pokemonElegido = document.getElementById("pokemon__elegido");
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonElegido.value}/`;
    const pokemon = document.getElementById("pokemon__name");
    const imagen = document.getElementById("pokemon__image");

    try {
        // debugger
        const request = await fetch(url);
        const requestJSON = await request.json();
        drawPokemon(requestJSON, pokemon, imagen);
        console.log(requestJSON);
    } catch (error) {
        clearScreen(error, pokemon, imagen)

    }
}

const drawPokemon =  ( requestJSON, pokemon, imagen ) => {
    pokemon.innerHTML = `pokemon: ${requestJSON.name}`;
    imagen.src = requestJSON.sprites.front_default;
    pokemon__right.className = "pokemon__right";
}

const clearScreen =  ( error, pokemon, imagen ) => {
    pokemon.innerHTML = "Pokemon no encontrado";
    console.error( error )
    imagen.src = "";
    pokemon__right.className = "pokemon__right none";
}


// async function request(url, pokemon, imagen) {
//     fetch(url)
//     .then((response) => {
//         return response.json();
//     })
//     .then((data) => {
//         pokemon.innerHTML = `pokemon: ${data.name}`;
//         imagen.src = data.sprites.front_default;
//         console.log(data);
//         pokemon__right.className = "pokemon__right"
//     })
//     .catch((error) => {
//         pokemon.innerHTML = "Pokemon no encontrado";
//         imagen.src = "";
//         pokemon__right.className = "pokemon__right none"
//     });
// }
