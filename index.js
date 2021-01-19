const buscar = document.getElementById('buscar');
const pokemon__right = document.getElementsByClassName('pokemon__right')[0];
const pokemon__features = document.getElementsByClassName(
  'pokemon__features'
)[0].children;

buscar.addEventListener('click', getPokemon);
// console.log(pokemonElegido)
// console.log('asfd')

async function getPokemon(poke, prueba = null) {
  // if (!prueba) {
  //   const poke = document.getElementById('pokemon__elegido').value.toLowerCase();
  //   console.log(poke);
  // } else {
  //   const url = `https://pokeapi.co/api/v2/pokemon/${poke}/`;
  // }
  const url = prueba ? `https://pokeapi.co/api/v2/pokemon/${poke}/` : `https://pokeapi.co/api/v2/pokemon/${document.getElementById('pokemon__elegido').value.toLowerCase()}/`;
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
  // let abilitiesString = ``;
  // requestJSON.abilities.forEach( ( abilitie ) => {
  //   abilitiesString += `<strong>Habilidades</strong><br>&nbsp1.-${requestJSON.abilities[0].ability.name}<br>&nbsp2.-${requestJSON.abilities[1].ability.name}`;
    
  // })
  // pokemon__features[1].innerHTML = abilitiesString;
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

// -------- ------- ------ ----- Pokemon List ----- ------ ------- --------

const pokemonPage =  async (  ) => {
  let counter = 1;
  // let url =  `https://pokeapi.co/api/v2/pokemon/?offset=${counter}&limit=20`
  let urlBase =  `https://pokeapi.co/api/v2/pokemon/`;

  return {
    getPage: async  (  ) => {
    let names = [];
    let images = [];
    let requestJSON;
    let request;
      for ( let i = 0; i <= 19; i++ ) {
        try {
          url = `${urlBase}${counter}/`
          request = await fetch(url);
          requestJSON = await request.json();
          names[i] = requestJSON.name;
          images[i] = requestJSON.sprites.front_default;
          counter++;
        } catch (error) {
          console.log( `${error}` );
        }
      }
      return {names, images};
    },

    pokemonTemplate:  ( page ) => {
      let template = [];
      for ( let i = 0; i <= 19; i++ ) {
        const name = page.names[i]
        template[i] = `<div class="${name} section-list__div-item">
                        <p class="${name} section-list__p">${name}</p>
                        <img src="${page.images[i]}" class="${name} section-list__img" alt="${name}">
                      </div>`
      }
      return template;
    }
  }
}

const pokemonList = async () => {
  const pokemonPageGenerator =  await pokemonPage();

  return {
    drawPage: async () => {
      const page = await pokemonPageGenerator.getPage();
      console.log( page.names );
      const html = document.implementation.createHTMLDocument();
      const pokemones = pokemonPageGenerator.pokemonTemplate(page);
      const sectionList = document.querySelector('.section-list__div');
      pokemones.forEach( ( pokemon ) => {
        html.body.innerHTML = pokemon
        sectionList.append(html.body.children[0]);
        sectionList.lastChild.addEventListener('click', ( pokemon ) => {
          const poke = pokemon.target.className.split(' ')[0];
          getPokemon(poke, 1);
          // console.log('adsf')
          console.log( poke )
        })
      })
    }
  }
}

async function adf () {
  const asd = await pokemonList()
  // console.log(asd)
  await asd.drawPage();
  const loadMore = document.getElementsByClassName('section-list__button')[0];
  loadMore.addEventListener('click',  async (  ) => {
    await asd.drawPage()
  })

}
adf();