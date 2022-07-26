import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GlobalStyle } from "./index.styles";
import { PersistGate } from "redux-persist/integration/react";
import LoadingSpinner from "./components/loading-spinner/loading-spiner.component";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
        <BrowserRouter>
          <GlobalStyle />
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
