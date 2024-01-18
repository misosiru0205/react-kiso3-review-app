/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-named-as-default */
import React from "react";
import * as ReactDOM from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import reportWebVitals from "./reportWebVitals";
//react-routes-dom の呼び出し 画面変遷に必要

//表示するコンポーネントの呼び出し
import App from "./pages/App";

const root = document.getElementById("root");
const reactRoot = ReactDOM.createRoot(root);
reactRoot.render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>,
);

reportWebVitals();
