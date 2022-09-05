import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App/App";
import { Provider } from "react-redux";
import store from "./redux/store";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const render = (Component) => {
  root.render(
    <StrictMode>
      <Provider store={store}>
        <Component />
      </Provider>
    </StrictMode>
  );
};

render(App);
