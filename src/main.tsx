import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./i18n.ts";

import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import UserProvider from "./hooks/useAuth.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
        <App />
      </UserProvider>
    </Provider>
  </React.StrictMode>
);
