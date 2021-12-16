import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import AppNavigator from "./components/AppNavigator";
import Favorites from "./containers/Favorites";
import Pokedex from "./containers/Pokedex";
import PokemonDetails from "./containers/PokemonDetails";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AppNavigator />
          <Routes>
            <Route path="/" element={<Pokedex />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
