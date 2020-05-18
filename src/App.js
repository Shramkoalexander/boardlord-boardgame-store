import React, { useState } from "react";
import "./App.scss";
import Header from "./components/header/header.component";
import { Switch, Route, Redirect } from "react-router-dom";
import ShopPage from "./pages/shop-page/shop-page.component";
import { COLLECTION_DATA } from "./components/collection/collection.data";

function App() {
  const initialState = COLLECTION_DATA;
  const [collection] = useState(initialState.collection);
  const [currency] = useState(initialState.currency);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/shop" />} />
        <Route
          path="/shop"
          render={() => (
            <ShopPage collection={collection} currency={currency} />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
