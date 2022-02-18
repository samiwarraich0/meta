import { BrowserRouter as Router, Route } from "react-router-dom";

import Product from "./components/Products";
import ProductDetail from "./components/ProductDetail";

const App = () => {
  return (
    <Router>
      <Route path="/" component={Product} exact />
      <Route path="/product/:id" component={ProductDetail} />
    </Router>
  );
};

export default App;
