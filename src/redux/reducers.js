import { TOGGLE_FAVORITE } from "./action";

const INITIAL_STATE = {
  favorites: [],
};

const pokemonReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      let pokemonFavorites = state.favorites.find(
        (favPokemon) => action.payload.id === favPokemon.id
      ); //returns an object (if found) OR undefined
      return {
        ...state,
        favorites: pokemonFavorites
          ? [
              ...state.favorites.filter(
                (pokemon) => pokemon.id !== pokemonFavorites.id
              ),
            ]
          : [...state.favorites, action.payload],
      };

    /* 
      if (pokemonFavorites.includes(action.payload)) {
        return pokemonFavorites.filter((e) => e != action.payload);
      }
     
      return [...state, action.payload];
     */
    default:
      return state;
  }
};

export default pokemonReducer;
