
// IIFE pokemonRepository
let pokemonRepository = (function () {
  /*stores the list of pokemons and characteristics*/
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=10';
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });


  function add(pokemon) {
    if (typeof(pokemon) === 'object' &&
      "name" in pokemon &&
    "detailsUrl" in pokemon) {
      pokemonList.push(pokemon);
    }
    else {console.error('Invalid attempt to add non-object to pokemonList')}
  }

  function getAll() {
    return pokemonList;
  }

  /* button to show detail of each pokemon */
  function buttonListener (button, pokemon) {
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    buttonListener(button, pokemon);
    pokemonList.appendChild(listpokemon);
  }

//MODAL SECTION
  function showModal(pokemonName, pokemonHeight, pokemonPic){
    let modalContainer = document.querySelector('#modal-container');
    // clear all existing modal content
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');
    // add the new modal content
    let titleElement = document.createElement ('h1');
    titleElement.innerText = title ;

    let closeButtonElement = document.createElement ('button');
    closeButtonElement.classList.add ('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener ('click', hideModal);


    let img = document.createElement('img');
    img.classList.add('modal-image');
    img.setAttribute('src', pokemonPicture);



    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);
    modal.appendChild(img);

    modalContainer.classList.add('is-visible');
  }

  function hideModal () {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

    window.addEventListener ('keydown', (e) => {
      let modalContainer = document.querySelector ('#modal-container');
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
        hideModal();
      }
    });



    document.querySelector('#show-modal').addEventListener('click', () => {
        showModal();
      });


  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal (pokemon.name, pokemon.height, pokemon.pic);
    });
  }

  // function showLoadingMessage (){
  //   document.write('loading')
  // }


  function loadList() {
    // showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    // showLoadingMessage()
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }


  return {
    add: add,
    getAll: getAll,
    addListItem : addListItem,
    loadList: loadList,
    loadDetails:loadDetails
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


//FORM REAL-TIME VALIDATION SECTION

(function() {
  let form = document.querySelector('#register-form');
  let emailInput = document.querySelector('#email');
  let passwordInput = document.querySelector('#password');

  function validateEmail() {
    let value = emailInput.value;
    // let hasAtSign = value.indexOf('@')> -1;
    // let hasDot = value.indexOf('.')> -1;
    // return value && hasAtSign && hasDot;

    if (!value){
      showErrorMessage (emailInput, 'Email is a required field.');
      return false;
    }

    if (value.indexOf('@') === -1) {
      showErrorMessage (emailInput, 'You must enter a valid email address.');
      return false;
    }

    showErrorMessage (emailInput, null);
    return true;
  }

  function validatePassword() {
    let value = passwordInput.value;
    //return value && value.length >= 8;
    if (!value) {
      showErrorMessage (passwordInput, 'Password is a required field.');
      return false;
    }
    if (value.length < 8) {
      showErrorMessage (passwordInput, 'The password needs to be at least 8 characters long.');
      return false;
    }
    showErrorMessage (passwordInput, null);
    return true;
  }

  function showErrorMessage (input, message) {
    let container = input.parentElement; // The .input-wrap per
  //Remove an existing error
    let error = container.querySelector('.error-message');
    if (error){
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
    return isValidEmail && isValidPassword ;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Do not submit to the server
    if (validateForm()) {
      alert('Success!');
    }
  })

  emailInput.addEventListener('input', validateEmail);
  passwordInput.addEventListener('input', validatePassword);
})();
