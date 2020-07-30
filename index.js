buscar = document.getElementById("buscar");
pokemon__right = document.getElementsByClassName("pokemon__right")[0]

buscar.addEventListener("click", () => {
    console.log(`click`);
    pokemonElegido = document.getElementById("pokemon__elegido");
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonElegido.value}/`;
    const pokemon = document.getElementById("pokemon__name");
    const imagen = document.getElementById("pokemon__image");

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            pokemon.innerHTML = `pokemon: ${data.name}`;
            imagen.src = data.sprites.front_default;
            console.log(data);
            pokemon__right.className = "pokemon__right"
        })
        .catch((error) => {
            pokemon.innerHTML = "Pokemon no encontrado";
            imagen.src = "";
            pokemon__right.className = "pokemon__right none"
        });
});
