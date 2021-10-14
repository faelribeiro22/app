import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

import './app.css';

const App = () => {

  const HomePage = React.lazy(() => import("HomeApp/HomePage"));
  const TesteComponent = React.lazy(() => import("HomeApp/Teste"));
  const ContactPage = React.lazy(() => import("ContactApp/ContactPage"));
  const callInApp = (val) => console.log('call in app', val);

  window.testeInfo = "testeInfo";

  return(
    <Router>
      <div>
        <Navbar color="light" light expand="md">
          <NavItem>
            <Link to="/">Home</Link>
          </NavItem>
          <NavItem>
            <Link to="/contact">Contact</Link>
          </NavItem>
        </Navbar>
        <Switch>
          <Route exact path="/">
            <Suspense fallback={<div>Loading...</div>}>
              <HomePage submitButton={callInApp} nameButton="Um novo dia pra testar"/>
              <TesteComponent/>
            </Suspense>
          </Route>
          <Route exact path="/contact">
            <Suspense fallback={<div>Loading...</div>}>
              <ContactPage />
            </Suspense>
          </Route>
        </Switch>
      </div>
    </Router>
  )
};

export default App;