const buscar = document.getElementById('buscar');
const pokemon__right = document.getElementsByClassName('pokemon__right')[0];
const pokemon__features = document.getElementsByClassName(
  'pokemon__features'
)[0].children;

buscar.addEventListener('click', getPokemon);

async function getPokemon() {
  pokemonElegido = document.getElementById('pokemon__elegido');
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonElegido.value.toLowerCase()}/`;
  const pokemon = document.getElementById('pokemon__name');
  const imagen = document.getElementsByClassName('pokemon__left')[0];
  const html = document.implementation.createHTMLDocument();

  try {
    const request = await fetch(url);
    const requestJSON = await request.json();
    drawMainPokemon(requestJSON, pokemon, imagen, html);
  } catch (error) {
    clearScreen(error, pokemon, imagen, html);
  }
}

const drawMainPokemon = (requestJSON, pokemon, imagen, html) => {
  pokemon.innerHTML = `pokemon: ${requestJSON.name}`;
  html.body.innerHTML = `<img id="pokemon__image" class="pokemon__image" src="${requestJSON.sprites.front_default}" alt="pokemon" />`;
  if (imagen.children[1]) {
    imagen.children[1].remove();
  }
  imagen.append(html.body.children[0]);

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

const clearScreen = (error, pokemon, imagen, html) => {
  pokemon.innerHTML = 'Pokemon no encontrado';
  console.error(error);
  if (imagen.children[1]) {
    imagen.children[1].remove();
  }
  pokemon__right.className = 'pokemon__right none';
};

// -------- ------- ------ ----- revisar ----- ------ ------- --------

// // -------- ------- ------ ----- Pokemon List ----- ------ ------- --------
// const pokemonPage =  async (  ) => {
//   // let pokemones = 1;
//   let counter = 0;
//   let url =  `https://pokeapi.co/api/v2/pokemon/?offset=${counter}&limit=20`
//   console.log( `jdfsofij` )

//   return {
//     getPage: async  (  ) => {
//       try {
//         request = await fetch(url);
//         requestJSON = await request.json();
//         console.log( `${request}` )
//         counter += 20;
//         return requestJSON;
//       } catch (error) {
//         console.log( `${error}` )
//       }
//     }
//   }
// }

// const pagination = pokemonPage();
// // console.log( `${pagination.getPage}` )

// const loadMore = document.getElementsByClassName('section-list__button')[0];
// // loadMore.addEventListener = 