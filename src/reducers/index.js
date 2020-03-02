import { combineReducers } from 'redux';
import pokemonReducer from './pokemonReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  pokemonsStats: pokemonReducer,
  error: errorReducer
});
