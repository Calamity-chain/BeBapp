
// IIFE pokemonRepository
let pokemonRepository = (function () {
  /*stores the list of pokemons and characteristics*/
  let pokemonList = [
    {
      name: 'Niki',
      height: 3,
      type:['cat','fluff','hypnotizing']
    },
    {
      name:'Patrick',
      height: 1,
      type:['bird','swearing','flying']
    },
    {
      name: 'zero',
      height: 5,
      type: ['dog','ghost','electric','floating']
    },
    {
      name: 'Lula',
      height: 0.5,
      type: ['spider','dansing','poison']
    },
    {
      name: 'janus',
      height: 0.1,
      type: ['leech','energySucking','jumping']
    }
  ];


  function add(pokemon) {
    if (typeof(pokemon) === 'object') {
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


    function showDetails(pokemon) {
      console.log(pokemon)
    }

    return {
      add: add,
      getAll: getAll,
      addListItem : addListItem
    };
})();

console.log(pokemonRepository.getAll());


/*displays the list of pokemons and shows message for the ones bigger than 3*/
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
