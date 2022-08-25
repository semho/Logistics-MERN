import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App/App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const render = (Component) => {
  root.render(
    <StrictMode>
      <Component />
    </StrictMode>
  );
};

render(App);