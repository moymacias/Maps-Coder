// navigation
import MainNavigator from "./navigation";
import { Provider } from "react-redux";
import React from "react";
import { init } from "./db";
import store from "./store";

init()
  .then(() => console.log("Base de datos iniciada"))
  .catch(err => {
    console.log("Base de datos no creada");
    console.log(err.message);
  });

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
