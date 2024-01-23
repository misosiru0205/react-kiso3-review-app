/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-named-as-default */
import React from "react";
import * as ReactDOM from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
//react-routes-dom の呼び出し 画面変遷に必要

//表示するコンポーネントの呼び出し
import App from "./pages/App";
import { store } from "./store";

const root = document.getElementById("root");
const reactRoot = ReactDOM.createRoot(root);
reactRoot.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
