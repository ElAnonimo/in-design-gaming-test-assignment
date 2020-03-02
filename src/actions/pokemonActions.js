import {
  GET_POKEMONS,
  POKEMONS_LOADING,
  GET_POKEMONS_ERROR
} from './types';

const API_PATH = 'https://pokeapi.co/api/v2';

// get pokemons
export const getPokemonsStats = pokemonNumber => async dispatch => {
  dispatch(setLoading());

  try {
    const pokemonList = await fetch(`${API_PATH}/pokemon/?limit=${pokemonNumber}`);

    const pokemons = await pokemonList.json();
    // console.log('pokemonActions pokemons.results:', pokemons.results);

    const pkmnNames = [];

    for (let pkmn of pokemons.results) {
      pkmnNames.push(pkmn.name);
    }
    // console.log('pokemonActions pkmnNames:', pkmnNames);

    const pokemonsStats = [];

    for (let pkmnName of pkmnNames) {
      // console.log('pokemonActions pkmnName:', pkmnName);
      let pokemonStatsByName = await fetch(`${API_PATH}/pokemon/${pkmnName}`);
      let pokemonStatsByNameToJson = await pokemonStatsByName.json();
      // console.log('pokemonActions pokemonStatsByNameToJson:', pokemonStatsByNameToJson);

      // let typeNames = pokemonStatsByNameToJson.types.map(type => type.map(tp => tp.type.name).join(','));
      console.log('pokemonActions types:', pokemonStatsByNameToJson.types);

      pokemonsStats.push({
        name: pokemonStatsByNameToJson.name,
        pic: pokemonStatsByNameToJson.sprites.front_default,
        types: pokemonStatsByNameToJson.types,
        height: pokemonStatsByNameToJson.height,
        weight: pokemonStatsByNameToJson.weight,
        abilities: pokemonStatsByNameToJson.abilities
      });
    }
    // console.log('pokemonActions pokemonsStats:', pokemonsStats);

    dispatch({
      type: GET_POKEMONS,
      payload: pokemonsStats
    });
  } catch(err) {
    dispatch({
      type: GET_POKEMONS_ERROR,
      message: 'Smth went wrong fetching pokemons. Please try again.'
    });
  }
};

// set loading
const setLoading = () => ({
  type: POKEMONS_LOADING
});
