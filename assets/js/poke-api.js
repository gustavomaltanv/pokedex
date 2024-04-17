const pokeApi = {};

pokeApi.getPokemonModel = (pokemonDetail) => {
    const pokemon = new Pokemon();
    pokemon.id = pokemonDetail.id;
    pokemon.name = pokemonDetail.name;
    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;
    pokemon.type = type;
    pokemon.types = types;
    pokemon.sprite = pokemonDetail.sprites.other['official-artwork'].front_default;
    return pokemon;
};

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((res) => res.json())
        .then(pokeApi.getPokemonModel)
        .catch((err) => console.error(err));
};

pokeApi.getPokemons = (offset, limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((res) => res.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .catch((err) => console.error(err));
};

