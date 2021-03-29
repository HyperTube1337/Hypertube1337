import "./css/App.css";
import React from "react";
import Login from "./views/Auth/login";
import Register from "./views/Auth/register";
import Home from "./views/pages/home";
import Navbar from "./Components/navbar";
import Error from "./Components/error";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { IntlProviderWrapper } from "./context/internationalization";
import AOS from "aos";
import "aos/dist/aos.css";
import Movies from "./views/pages/movies";
import Confirm from "./views/Auth/confim";
import Library from "./views/pages/research";
import Fgpass from "./views/Auth/fgpass";
import Changepass from "./views/Auth/changepass";
import Profile from "./views/pages/profile";

AOS.init();

function App() {
  return (
    <IntlProviderWrapper>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/library">
              <Library />
            </Route>
            <Route path="/movies/:id">
              <Movies />
            </Route>
            <Route path="/confirm/:token" component={Confirm} />
            <Route path="/changepass/:token" component={Changepass} />
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="/fgpass">
              <Fgpass />
            </Route>
            <Route path="/profile/:profilename">
              <Profile />
            </Route>
            <Route path="*" component={Error} />
          </Switch>
        </div>
      </Router>
    </IntlProviderWrapper>
  );
}

export default App;
