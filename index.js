const buscar = document.getElementById('buscar');
const pokemon__right = document.getElementsByClassName('pokemon__right')[0];
const pokemon__features = document.getElementsByClassName(
  'pokemon__features'
)[0].children;
// console.log(pokemon__features);

buscar.addEventListener('click', getPokemon);

async function getPokemon() {
  pokemonElegido = document.getElementById('pokemon__elegido');
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonElegido.value.toLowerCase()}/`;
  const pokemon = document.getElementById('pokemon__name');
  const imagen = document.getElementById('pokemon__image');

  try {
    // debugger
    const request = await fetch(url);
    const requestJSON = await request.json();
    drawPokemon(requestJSON, pokemon, imagen);
  } catch (error) {
    clearScreen(error, pokemon, imagen);
  }
}

const drawPokemon = (requestJSON, pokemon, imagen) => {
  pokemon.innerHTML = `pokemon: ${requestJSON.name}`;
  imagen.src = requestJSON.sprites.front_default;
  pokemon__right.className = 'pokemon__right';
  pokemon__features[0].innerHTML = `<strong>Tipo</strong><br>&nbsp${requestJSON.types[0].type.name}`;
  pokemon__features[1].innerHTML = `<strong>Habilidades</strong><br>&nbsp1.-${requestJSON.abilities[0].ability.name}<br>&nbsp2.-${requestJSON.abilities[1].ability.name}`;
  pokemon__features[2].innerHTML = `<strong>Height</strong><br>&nbsp${
    requestJSON.height * 6
  }cm.`;
  pokemon__features[3].innerHTML = `<strong>Weight</strong><br>&nbsp${
    requestJSON.weight / 10
  }kg.`;
  console.log(requestJSON);
};

const clearScreen = (error, pokemon, imagen) => {
  pokemon.innerHTML = 'Pokemon no encontrado';
  console.error(error);
  imagen.src = '';
  pokemon__right.className = 'pokemon__right none';
};

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
