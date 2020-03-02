import { GET_POKEMONS } from '../actions/types';

const initialState = '';

const errorReducer = (state = initialState, action) => {
  switch(action.types) {
    case GET_POKEMONS:
      return {
        ...state,
        message: action.message
      };
    default:
      return state;
  }
};

export default errorReducer;
