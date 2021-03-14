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
import Confirm from "./views/Auth/confim";
import Fgpass from "./views/Auth/fgpass";

AOS.init();

// You can also pass an optional settings object
// below listed default settings

// You can also pass an optional settings object
// below listed default settings
// AOS.init({
//   // Global settings:
//   disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
//   startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
//   initClassName: "aos-init", // class applied after initialization
//   animatedClassName: "aos-animate", // class applied on animation
//   useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
//   disableMutationObserver: false, // disables automatic mutations' detections (advanced)
//   debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
//   throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

//   // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
//   offset: 120, // offset (in px) from the original trigger point
//   delay: 0, // values from 0 to 3000, with step 50ms
//   duration: 400, // values from 0 to 3000, with step 50ms
//   easing: "ease", // default easing for AOS animations
//   once: false, // whether animation should happen only once - while scrolling down
//   mirror: false, // whether elements should animate out while scrolling past them
//   anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
// });

function App() {
  // const { state } = useContext(IntlProviderWrapper);
  // console.log("-----", useContext(IntlProviderWrapper));

  return (
    <IntlProviderWrapper>
      <Router>
        <div className="App">
        <Navbar />
          <Switch>
          <Route path="/confirm/:token" component={Confirm} />
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="/fgpass">
            <Fgpass />
          </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="*" component={Error} />
          </Switch>
        </div>
      </Router>
    </IntlProviderWrapper>
  );
}

export default App;
