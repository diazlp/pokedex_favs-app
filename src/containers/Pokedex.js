import axios from "axios";
import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Grid, makeStyles } from "@material-ui/core";
import { IMAGE_API_URL, POKEMON_API_URL } from "../config";
import PokemonCard from "../components/PokemonCard";

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    textAlign: "center",
    padding: "80px 10px 0px 10px",
    backgroundColor: "rgb(68,68,68)",
  },
}));

const Pokedex = () => {
  const classes = useStyles();
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    axios.get(`${POKEMON_API_URL}?limit=100`).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        const { results } = res.data;
        let newPokemonData = [];
        results.forEach((pokemon, index) => {
          index++;
          let pokemonObject = {
            id: index,
            url: `${IMAGE_API_URL}/${index}.png`,
            name: pokemon.name,
          };
          newPokemonData.push(pokemonObject);
        });
        setPokemonData(newPokemonData);
      }
    });
  }, []);

  return (
    <Box>
      {pokemonData ? (
        <Grid className={classes.pokedexContainer} container spacing={2}>
          {pokemonData.map((pokemon) => {
            return (
              <PokemonCard
                pokemon={pokemon}
                image={pokemon.url}
                key={pokemon.id}
              />
            );
          })}
        </Grid>
      ) : (
        <CircularProgress style={{ marginTop: 100 }} />
      )}
    </Box>
  );
};

export default Pokedex;
