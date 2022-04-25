import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// eslint-disable-next-line
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { createBrowserHistory } from "history";

const root = ReactDOM.createRoot(document.getElementById("root"));
const history = createBrowserHistory();

root.render(
  <React.StrictMode>
    {/* <HashRouter history={history}> */}
    <BrowserRouter history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
    {/* </HashRouter> */}
  </React.StrictMode>
);
