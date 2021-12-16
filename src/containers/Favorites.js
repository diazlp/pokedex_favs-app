import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import PokemonCard from "../components/PokemonCard";

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    height: "100vh",
    backgroundColor: "rgb(68,68,68)",
    padding: "80px 10px 0px 10px",
    textAlign: "center",
  },
}));

const Favorites = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Box>
        <Grid className={classes.pokedexContainer} container spacing={2}>
          {props.favorites.map((pokemon) => {
            return (
              <PokemonCard
                pokemon={pokemon}
                key={pokemon.id}
                image={pokemon.sprites.front_default}
              />
            );
          })}
        </Grid>
      </Box>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
