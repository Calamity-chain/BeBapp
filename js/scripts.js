
// IIFE pokemonRepository
let pokemonRepository = (function () {
  /*stores the list of pokemons and characteristics*/
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=10';
  let modalContainer = document.querySelector('#modal-container');


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




  function loadList() {
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

  function loadDetails(object) {
    let url = object.detailsUrl;
    console.log(url);
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (json) {
      // Now we add the details to the item
      let detailsArray = [json.name, json.sprites.front_default, json.height];
      return detailsArray;
      console.log(detailsArray);
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showModal(pokemonPicture, pokemonHeight, pokemonName) {
    // query modal container and make visible
     let modalContainer = document.querySelector("#modal-container");
     modalContainer.classList.add("is-visible");

      // Clear all existing modal content
      modalContainer.innerHTML = '';
      // Create modal
      let modal = document.createElement('div');
      modal.classList.add('modal');
      modalContainer.appendChild(modal);
      // Add the new modal content
        //create modal header background
    let header = document.createElement("div");
    header.setAttribute("id", "modal-header-background");
    modal.appendChild(header);

    let modalClose = document.createElement("div");
        modalClose.classList.add("modal-close");
        modal.appendChild(modalClose);

   let button = document.createElement("button");
        button.setAttribute("id", "button-close");
        button.innerText = "close";
        modalClose.appendChild(button);
        button.addEventListener('click', (event) => {
              hideModal();

    let h1 = document.createElement('h1');
      h1.classList.add("modal-headline");
      h1.innerText = pokemonName ;
      modal.appendChild(h1);

let container = document.querySelector('#image-container');
      //create modal image section
    let img = document.createElement('img');
         img.classList.add('modal-image');
         img.setAttribute('src', pokemonPicture);
         container.appendChild(img);

    let height = document.createElement('div');
     height.classList.add('modal-height');
     height.innerText = pokemonHeight;
    modal.appendChild(height);


    let name = document.createElement('div')
    name.classList.add('modal-name')
    name.innerText = pokemonName;
    modal.appendChild(name);


        });


    }

    function hideModal() {
      modalContainer.classList.remove('is-visible');
    }

    function showDetails(item) {
      pokemonRepository.loadDetails(item).then(function (response) {
       showModal(item.name, response[0], response[1]);
      });
    }


    // document.querySelector('#show-modal').addEventListener('click', () => {
    //   showModal('Modal title', 'This is the modal content!');
    // });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      };
    });

    modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal container,
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

  return {
    add: add,
    getAll: getAll,
    addListItem : addListItem,
    loadList: loadList,
    loadDetails:loadDetails,
    showModal: showModal,
    showDetails: showDetails
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
