import './App.css';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import DetailPage from './pages/DetailPage';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom/cjs/react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/Login" component={LoginPage} />
          <Route exact path="/Home" component={HomePage} />
          <Route exact path="/detail/:id" component={DetailPage} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
