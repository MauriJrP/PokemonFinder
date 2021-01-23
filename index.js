const buscar = document.getElementById('buscar');
const pokemon__right = document.getElementsByClassName('pokemon__right')[0];
const pokemon__features = document.getElementsByClassName(
  'pokemon__features'
)[0].children;

buscar.addEventListener('click', getPokemon);

async function getPokemon(poke, prueba = null) {
  const url = prueba  ? `https://pokeapi.co/api/v2/pokemon/${poke}/`
                      : `https://pokeapi.co/api/v2/pokemon/${document.getElementById('pokemon__elegido').value.toLowerCase()}/`;
  const pokemon = document.getElementById('pokemon__name');
  const imagen = document.getElementsByClassName('pokemon__left')[0];
  const html = document.implementation.createHTMLDocument();
  const mainLoader = document.querySelector('.div-main-loader');
  setTimeout( () => mainLoader.className += ' active', 100);

  try {
    const request = await fetch(url);
    const requestJSON = await request.json();
    await renderMainPokemon(requestJSON, pokemon, imagen, html);
  } catch (error) {
    clearScreen(error, pokemon, imagen);
  }

  setTimeout( () => mainLoader.className = 'div-main-loader', 100);
}

const renderMainPokemon = (requestJSON, pokemon, imagen, html) => {
  pokemon.innerHTML = `pokemon: ${requestJSON.name}`;
  html.body.innerHTML = `<img id="pokemon__image" class="pokemon__image" src="${requestJSON.sprites.front_default}" alt="pokemon" />`;
  if (imagen.children[1]) {
    imagen.children[1].remove();
  }
  imagen.append(html.body.children[0]);

  pokemon__right.className = 'pokemon__right';
  pokemon__features[0].innerHTML = `<strong>Tipo</strong><br>&nbsp${requestJSON.types[0].type.name}`;

  let abilitiesString = `<strong>Habilidades</strong><ul>`;
  requestJSON.abilities.forEach( ( abilities ) => {
    abilitiesString += `<li>${abilities.ability.name}`;
  })
  pokemon__features[1].innerHTML = '</ul>' + abilitiesString;

  pokemon__features[2].innerHTML = `<strong>Altura</strong><br>&nbsp${
    requestJSON.height * 6
  }cm.`;
  pokemon__features[3].innerHTML = `<strong>Peso</strong><br>&nbsp${
    requestJSON.weight / 10
  }kg.`;
};

const clearScreen = (error, pokemon, imagen) => {
  pokemon.innerHTML = 'Pokemon no encontrado';
  console.error(error);
  if (imagen.children[1]) {
    imagen.children[1].remove();
  }
  pokemon__right.className = 'pokemon__right hide';
};

// -------- ------- ------ ----- Pokemon List ----- ------ ------- --------

const pokemonPage =  async (  ) => {
  let counter = 1;
  // let url =  `https://pokeapi.co/api/v2/pokemon/?offset=${counter}&limit=20`
  let urlBase =  `https://pokeapi.co/api/v2/pokemon/`;

  return {
    getPage: async  (  ) => {
      let urls = [];
      for ( let i = 0; i <= 19; i++ ) {
        urls.push(`${urlBase}${counter}/`);
        counter++;
      }
      const urlPromises = urls.map( url => fetch(url))
      const request = await Promise.all(urlPromises);
      const requestPromises = request.map( pokemonObject => pokemonObject.json() )
      const requestJSON = await Promise.all(requestPromises);
      const names = requestJSON.map( pokemonObject => pokemonObject.name );
      const images = requestJSON.map( pokemonObject => pokemonObject.sprites.front_default )
      const types = requestJSON.map( pokemonObject => pokemonObject.types[0].type.name );
      return {names, images, types};
    },

    pokemonTemplate:  ( page ) => {
      let template = [];
      let rotate = ``;
      for ( let i = 0; i <= 19; i++ ) {
        rotate = i % 2 === 0 ? 'right' : 'left';
        const name = page.names[i]
        template[i] = `<div class="${name} section-list__div-item ${rotate}">
                        <p class="${name} section-list__p">${name}</p>
                        <img src="${page.images[i]}" class="${name} section-list__img" alt="${name}">
                        <div class="section-list__div-rectangle ${page.types[i]}"></div>
                      </div>`
      }
      return template;
    }
  }
}

const renderPokemonList = async () => {
  const pokemonPageGenerator =  await pokemonPage();

  return {
    renderTypeColors: () => {
      types = ['grass', 'fire', 'water', 'bug', 'normal', 'poison', 'electric', 'ground', 'fairy', 'rock']
      const typesColors = document.querySelector('.section-types');
      const html = document.implementation.createHTMLDocument();
      types.forEach( ( type ) => {
        html.body.innerHTML = `<div class="section-types__div">
                                <div class="${type}"></div>
                                <p>${type}</p>
                              </div>`;
        typesColors.append(html.body.children[0]);
      })
    },

    renderPage: async () => {
      const page = await pokemonPageGenerator.getPage();
      const html = document.implementation.createHTMLDocument();
      const pokemones = pokemonPageGenerator.pokemonTemplate(page);
      const sectionList = document.querySelector('.section-list__div');
      pokemones.forEach( ( pokemon ) => {
        html.body.innerHTML = pokemon
        sectionList.append(html.body.children[0]);
        sectionList.lastChild.addEventListener('click', ( pokemon ) => {
          const poke = pokemon.target.className.split(' ')[0];
          getPokemon(poke, 1);
          document.scrollingElement.scrollTop = 0;
        })
      })
    }
  }
}

async function loadPokemonPage () {
  const pokemonList = await renderPokemonList()
  pokemonList.renderTypeColors();
  await pokemonList.renderPage();
  const loadMore = document.getElementsByClassName('section-list__button')[0];
  loadMore.addEventListener('click',  async (  ) => {
    let loader = document.querySelector('.loader');
    loader.className += 'loader';
    await pokemonList.renderPage()
    loader.className += ' hide';
  })

}
loadPokemonPage();