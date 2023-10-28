import "./style.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, NavLink } from "react-router-dom";
import RoutesComponent from "./Routes";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="text-end me-3 mt-1">
          <NavLink to="/">Product Form</NavLink>
          <NavLink to="/product-list" className="ms-5">
            Product List
          </NavLink>
        </div>
        <RoutesComponent />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
