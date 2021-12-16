// types
export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";

export const toggleFavorite = (pokemon) => {
  return {
    type: TOGGLE_FAVORITE,
    payload: pokemon,
  };
};
