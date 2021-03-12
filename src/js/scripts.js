// IIFE pokemonRepository
let pokemonRepository = (function() {
  /*stores the list of pokemons and characteristics*/
  const pokemonList = [];
  const APIURL = 'https://pokeapi.co/api/v2/pokemon/?limit=10';
  let modalContainer = document.querySelector('#modal-container');

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      alert('Invalid attempt to add non-object to pokemonList');
    }
  }

  function getAll() {
    return pokemonList;
  }

  /* button to show detail of each pokemon */
  function buttonListener(button, pokemon) {
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  function addListItem(pokemon) {
    let pokemonUIList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add(
      'button-class',
      'list-group-item',
      'text-capitalize',
      'btn',
      'btn-outline-dark'
    );
    button.setAttribute('type', 'button');
    button.setAttribute('data-target', '#pokemon-info');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-bs-name', pokemon.name);
    listpokemon.appendChild(button);
    buttonListener(button, pokemon);
    pokemonUIList.appendChild(listpokemon);
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  function loadList() {
    showLoadingMessage();
    return fetch(APIURL)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        hideLoadingMessage();
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        hideLoadingMessage();
        // Now we add the details to the item
        item.id = details.id;
        item.imageUrl = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = [];
        details.types.forEach(function(itemType) {
          item.types.push(' ' + itemType.type.name + ' ');
        });
        item.abilities = [];
        details.abilities.forEach(function(itemAbilities) {
          item.abilities.push(' ' + itemAbilities.ability.name + ' ');
        });
      })
      .catch(function(e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  //SHOW MODAL with BOOTSTRAP

  //function defined here
  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');

    modalTitle.empty();
    modalBody.empty();

    let pokemonId = document.createElement('p');
    pokemonId.innerText = 'ID: ' + pokemon.id;
    let pokemonImage = document.createElement('img');
    pokemonImage.setAttribute('src', pokemon.imageUrl);
    pokemonImage.classList.add('img-fluid', 'mb-2', 'pokepic');
    let pokemonHeight = document.createElement('p');
    pokemonHeight.innerText = 'Height : ' + pokemon.height / 0.1 + ' cm';
    let pokemonWeight = document.createElement('p');
    pokemonWeight.innerText = 'Weight : ' + pokemon.weight / 10 + ' kg';
    let pokemonTypes = document.createElement('p');
    pokemonTypes.innerText = 'Types : ' + pokemon.types;
    let pokemonAbilities = document.createElement('p');
    pokemonAbilities.innerText = 'Abilities : ' + pokemon.abilities;

    modalTitle.append(pokemon.name);
    modalBody.append(
      pokemonId,
      pokemonImage,
      pokemonHeight,
      pokemonWeight,
      pokemonTypes,
      pokemonAbilities
    );
  }

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  return {
    add,
    getAll,
    addListItem,
    loadList,
    loadDetails
  };
})();

//console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  /*displays the list of pokemons and shows message for the ones bigger than 3*/
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
