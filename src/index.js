import React from "react";
import ReactDOM from "react-dom";
import "./globals/styles/index.scss";
import App from "./components/app/app";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import BreakpointsProviderBootstrapContainer from "./components/breakpoints-provider/breakpoints-provider-bootstrap.container";
import PersistManager from "./components/persist-manager/persist-manager.component";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistManager>
          <BreakpointsProviderBootstrapContainer>
            <App />
          </BreakpointsProviderBootstrapContainer>
        </PersistManager>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
