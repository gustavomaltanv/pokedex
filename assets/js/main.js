const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('btn-loadmore');


const limit = 10;
let offset = 0;
const maxPoke = 151;

function loadPokemons(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) =>
        pokemonList.innerHTML += pokemons.map((pokemon) => `
        <li id="${pokemon.name}" class="pokemon ${pokemon.type}" onclick="openPopup('${pokemon.name}')">
            <span class="id">#${pokemon.id}</span>
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
    const qtdPokeNextPage = offset + limit;

    if (qtdPokeNextPage >= maxPoke) {
        const newLimit = maxPoke - offset;
        loadPokemons(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);

    } else {
        loadPokemons(offset, limit);
    }
});

async function openPopup(pokemonName) {
    try {
        const pokemon = await pokeApi.getPokemonByName(pokemonName);
        console.log(pokemon);
        const popup = document.getElementById('popup');
        const pokemonInfo = document.getElementById('pokemonInfo');

        pokemonInfo.innerHTML = `
        <span class="popup-name">${pokemon.name}</span>
        <span class="popup-id">#${pokemon.id}</span>

        <div class="popup-detail ${pokemon.type}">
        
            <div class="popup-sprite">
                <img src="${pokemon.sprite}" alt="${pokemon.name}">
            </div>
            
            <hr>

            <div class="popup-types">
                <ol>
                    ${pokemon.types.map((type) => `<li class="popup-type ${type}">${type}</li>`).join('')}
                </ol>
            </div>
        
            <div class="popup-about">
                <span class="popup-subtitle">About</span>
                <p><span class="popup-about--info">Height:</span> ${pokemon.height} cm</p>
                <p><span class="popup-about--info">Weight:</span> ${pokemon.weight} kg</p>
            </div>

            <div class="popup-abilities">
                <span class="popup-subtitle">Abilities</span>
                <ol>
                    ${pokemon.abilities.map((ability) => `<li class="popup-ability">${ability}</li>`).join('')}
                </ol>
            </div>
        </div>
            
        `;

        popup.style.display = 'block';
    } catch (err) {
        console.error(err);
    }
};

function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}


