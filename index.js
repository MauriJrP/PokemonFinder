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
    // console.log( requestJSON )
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

// -------- ------- ------ ----- Pokemon List ----- ------ ------- --------
const pokemonPage =  async (  ) => {
  let counter = 1;
  // let url =  `https://pokeapi.co/api/v2/pokemon/?offset=${counter}&limit=20`     // page
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
        template[i] = `<div class="section-list__div-item" id="${page.names[i]}">
                        <p class="section-list__p">${page.names[i]}</p>
                        <img src="${page.images[i]}" class="section-list__img" alt="${page.names[i]}">
                      </div>`
      }
      return template;
    }
  }
}

// const page2 = await pokemonPageGenerator.getPage();
// console.log( page2.names );

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
          console.log( pokemon )
        })
        // console.log( sectionList.lastChild )
      })
      // console.log(sectionList)
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
    // console.log( `asdf` )
  })
  // await asd.drawPage();

}
adf();

// const 6
// loadMore.addEventListener = d