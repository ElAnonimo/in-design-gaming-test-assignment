import {
  GET_POKEMONS,
  POKEMONS_LOADING
} from '../actions/types';

const initialState = {
  pokemonsStats: [],
  loading: false
};

const pokemonReducer = (state = initialState, action) => {
  switch(action.type) {
    case POKEMONS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POKEMONS:
      return {
        ...state,
        loading: false,
        pokemonsStats: action.payload
      };
    default:
      return state;
  }
};

export default pokemonReducer;
