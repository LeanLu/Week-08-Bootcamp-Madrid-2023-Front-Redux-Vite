import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/app/App";
import { Provider } from "react-redux";

import "./index.css";
import { appStore } from "./store/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={appStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
