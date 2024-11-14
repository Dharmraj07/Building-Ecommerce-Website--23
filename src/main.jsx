import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { AuthContextProvider } from "./redux/auth-context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthContextProvider>

      <BrowserRouter>
        <App />
      </BrowserRouter>
      </AuthContextProvider>

    </Provider>
  </StrictMode>
);
