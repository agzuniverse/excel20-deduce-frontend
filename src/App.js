/* eslint-disable */
// Temperorily disabling eslint to make some changes

import React, { useEffect, useState } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import ContextProvider from "./context/context";
import Navbar from "./components/navbar/Navbar";
import Main from "./components/main/Main";
import Alertbox from "./components/alertbox/Alertbox";
import history from "./utils/history";
import Reload from "./components/reload/Reload";
import {checkAuth} from "./auth0/http";
import { login, handleAuthentication } from "./auth0/auth0";
import Landing from "./components/Landing/Landing";

function App() {
  const [screen, setScreen] = useState(true);

  useEffect(() => {
    if (window.innerWidth < window.innerHeight) {
      setScreen(false);
    }
  }, []);

  return (
    <ContextProvider>
        <Reload screen={screen} setScreen={setScreen}/>
      <Router history={history}>
        <Alertbox />
        <Switch>
          <Route exact path="/game" render={() => (
            checkAuth() ? 
            (

                (<React.Fragment>
                  <Navbar score={30} />
                  <Main />
                </React.Fragment>)
            ):
            (<Redirect to="/login" />)
          )} />
          <Route exact path="/login" render={() => login()} />
            <Route
            exact
            path="/login/callback"
            render={() => handleAuthentication()}
          />
          <Route exact path="" render={Landing} />
        </Switch>
      </Router>
    </ContextProvider>
  );
}
export default App;
