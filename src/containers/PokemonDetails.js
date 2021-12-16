import axios from "axios";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { POKEMON_API_URL } from "../config";
import { toggleFavorite } from "../redux/action";

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    height: "80vh",
    backgroundColor: "black",
    color: "white",
    marginTop: 100,
    textAlign: "center",
    borderRadius: 10,
    paddingTop: 30,
  },
  textTitle: {
    textTransform: "upperCase",
    fontFamily: "fantasy",
  },
  pokemonImage: {
    width: "170px",
    height: "170px",
  },
  pokemonInfoContainer: {
    bottom: 60,
    position: "absolute",
    width: "100%",
  },
  separator: {
    height: "0.01mm",
    width: "95%",
    color: "white",
  },
  favorite: {
    height: 50,
    width: 50,
    marginTop: 15,
    color: "white",
  },
  text: {
    fontSize: 30,
  },
}));

const PokemonDetails = (props) => {
  // props.favorites.map(({ name }) => console.log(name));
  const classes = useStyles();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${POKEMON_API_URL}/${id}`).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setSelectedPokemon(res.data);
      }
    });
  }, [id]);

  const favoriteChecker = (pokemon) => {
    let found = false;

    props.favorites?.map((favPokemon) => {
      if (favPokemon.id === pokemon.id) {
        found = true;
      }
    });
    return found;
  };

  if (!selectedPokemon) {
    return <CircularProgress style={{ marginTop: 100 }} />;
  }

  // console.log(selectedPokemon);
  const { name, sprites, height, weight, types } = selectedPokemon;
  return (
    <Box>
      <Box className={classes.pokedexContainer}>
        <Typography className={classes.textTitle} variant="h1">
          {name}
        </Typography>
        <img src={sprites.front_default} className={classes.pokemonImage} />
        <Box className={classes.pokemonInfoContainer}>
          <hr className={classes.separator} />
          <Grid container>
            <Grid item md={1}>
              <Button
                className={classes.favorite}
                onClick={() => props.toggleFavorite(selectedPokemon)}
              >
                <FavoriteIcon
                  style={{
                    color: favoriteChecker(selectedPokemon) ? "red" : "white",
                    fontSize: 50,
                  }}
                />
              </Button>
            </Grid>
            <Grid item md={2}>
              <Typography className={classes.text}>
                Name: <br /> {name}
              </Typography>
            </Grid>
            <Grid item md={2}>
              <Typography className={classes.text}>
                Height: <br /> {height}m
              </Typography>
            </Grid>
            <Grid item md={2}>
              <Typography className={classes.text}>
                Weight: <br /> {weight}kg
              </Typography>
            </Grid>
            {types.map(({ type }) => {
              const { name } = type;
              return (
                <Grid item md={2} key={name}>
                  <Typography className={classes.text}>
                    Type: <br /> {name}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
  };
};

const mapDispatchToProps = {
  toggleFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetails);
