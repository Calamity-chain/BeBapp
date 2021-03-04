// IIFE pokemonRepository
let pokemonRepository = (function() {
  /*stores the list of pokemons and characteristics*/
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=10';
  let modalContainer = document.querySelector('#modal-container');

  /* Displays an asynchronous loading message */
  function showLoadingMessage() {
    let pokemonList = document.querySelector('.pokemon-list');
    let div = document.createElement('div');
    div.setAttribute('class', 'pokemon-list__item');
    div.innerText = 'loading your Pokemon data...';
    pokemonList.prepend(div);
  }
  /* Hides the loading message */
  function hideLoadingMessage() {
    let div = document.querySelector('div.pokemon-list__item');
    div.parentElement.removeChild(div);
  }

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
    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    button.classList.add('list-group-item');
    button.classList.add('text-capitalize');
    button.setAttribute('type', 'button');
    button.classList.add('btn');
    button.classList.add('btn-outline-dark');
    button.setAttribute('data-target', '#pokemon-info');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-bs-name', pokemon.name);
    listpokemon.appendChild(button);
    buttonListener(button, pokemon);
    pokemonList.appendChild(listpokemon);
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
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
          console.log(pokemon);
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
    // let modalId = $('#pokemon-id');

    modalTitle.empty();
    modalBody.empty();
    // modalId.empty();

    let pokemonId = document.createElement('p');
    pokemonId.innerText = 'ID: ' + pokemon.id;
    let pokemonImage = document.createElement('img');
    pokemonImage.setAttribute('src', pokemon.imageUrl);
    pokemonImage.classList.add('img-fluid');
    pokemonImage.classList.add('mb-2');
    pokemonImage.classList.add('pokepic');
    let pokemonHeight = document.createElement('p');
    pokemonHeight.innerText = 'Height : ' + pokemon.height / 0.1 + ' cm';
    let pokemonWeight = document.createElement('p');
    pokemonWeight.innerText = 'Weight : ' + pokemon.weight / 10 + ' kg';
    let pokemonTypes = document.createElement('p');
    pokemonTypes.innerText = 'Types : ' + pokemon.types;
    let pokemonAbilities = document.createElement('p');
    pokemonTypes.innerText = 'Abilities : ' + pokemon.abilities;

    modalTitle.append(pokemon.name);
    modalBody.append(pokemonId);
    modalBody.append(pokemonImage);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonWeight);
    modalBody.append(pokemonTypes);
    modalBody.append(pokemonAbilities);
  }

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  //FORM REAL-TIME VALIDATION SECTION

  (function() {
    let form = document.querySelector('#register-form');
    let emailInput = document.querySelector('#email');
    let passwordInput = document.querySelector('#password');

    function validateEmail() {
      let value = emailInput.value;

      if (!value) {
        showErrorMessage(emailInput, 'Email is a required field.');
        return false;
      }

      if (value.indexOf('@') === -1) {
        showErrorMessage(emailInput, 'You must enter a valid email address.');
        return false;
      }

      showErrorMessage(emailInput, null);
      return true;
    }

    function validatePassword() {
      let value = passwordInput.value;
      //return value && value.length >= 8;
      if (!value) {
        showErrorMessage(passwordInput, 'Password is a required field.');
        return false;
      }
      if (value.length < 8) {
        showErrorMessage(
          passwordInput,
          'The password needs to be at least 8 characters long.'
        );
        return false;
      }
      showErrorMessage(passwordInput, null);
      return true;
    }

    function showErrorMessage(input, message) {
      let container = input.parentElement; // The .input-wrap per
      //Remove an existing error
      let error = container.querySelector('.error-message');
      if (error) {
        container.removeChild(error);
      }
      //Add the error if the message isn't empty
      if (message) {
        let error = document.createElement('div');
        error.classList.add('error-message');
        error.innerText = message;
        container.appendChild(error);
      }
    }

    function validateForm() {
      let isValidEmail = validateEmail();
      let isValidPassword = validatePassword();
      return isValidEmail && isValidPassword;
    }

    form.addEventListener('submit', e => {
      e.preventDefault(); // Do not submit to the server
      if (validateForm()) {
        alert('Success!');
      }
    });

    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
  })();

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
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
