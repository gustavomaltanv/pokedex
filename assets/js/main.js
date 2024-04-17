const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('btn-loadmore');

const limit = 10;
let offset = 0;
const maxPoke = 151;

function loadPokemons(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => 
        pokemonList.innerHTML += pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.id}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.sprite}"
                    alt="${pokemon.name}">
            </div>
        </li>`
        ).join('')
    );
};

loadPokemons(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdPokeNextPage = offset + limit ;

    if(qtdPokeNextPage >= maxPoke) {
        const newLimit = maxPoke - offset;
        loadPokemons(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);

    } else {
        loadPokemons(offset, limit);
    }
});
