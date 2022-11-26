import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App/App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { setup } from "./service/interceptors";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

//вставляем элемент в DOM для портала
const modal = document.createElement("div");
modal.setAttribute("id", "modal_root");
document.body.appendChild(modal);

const render = (Component) => {
  root.render(
    <Provider store={store}>
      <Component />
    </Provider>
  );
};

setup(store);

render(App);
