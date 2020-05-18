import React, { useState } from "react";
import "./App.scss";
import Header from "./components/header/header.component";
import { COLLECTION_DATA } from "./components/collection/collection.data";

function App() {
  const initialState = COLLECTION_DATA;
  const [collection] = useState(initialState.collection);
  const [currency] = useState(initialState.currency);

  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
