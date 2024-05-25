import React from "react";

import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";
import App from "./App";
import store from "./redux/store";
import Loading from "./components/Loading";

const persister = persistStore(store);
const Render = () => (
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persister}>
        <App />
        <Toaster />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Render />);
