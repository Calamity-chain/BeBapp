
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

    return {
      add: add,
      getAll: getAll
    };
})();

console.log(pokemonRepository.getAll());


/* just FYI before deleting
PREVIOUS CODE with the $variables form you recommended me to try :

for (let i = 0; i < pokemonList.length; i++) {
if (pokemonList[i].height > 3){
document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}) - Woaw that\s a big one ! <br>`);
} else {
document.write(`${pokemonList[i].name} (height :  ${pokemonList[i].height}) <br> `);
}
}
*/

/*NEW CODE : displays the list of pokemons and shows message for the ones bigger than 3*/
pokemonRepository.getAll().forEach(function(pokemon) {
  if (pokemon.height > 3){
    document.write(pokemon.name + ' (height: ' + pokemon.height + ' ) - Woaw that\s a big one ! <br>');
  } else {
    document.write(pokemon.name + ' (height: ' + pokemon.height + ' ) <br>')
  }
});
