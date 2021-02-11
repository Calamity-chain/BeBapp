
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


/*displays the list of pokemons and shows message for the ones bigger than 3*/
for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 3){
  document.write(pokemonList[i].name + ' (height : ' + pokemonList[i].height + ' ) - Woaw that\s a big one ! <br>');
} else {
  document.write(pokemonList[i].name + ' (height : ' + pokemonList[i].height + ' ) <br>');
  }
}
