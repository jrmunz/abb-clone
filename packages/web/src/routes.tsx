import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { RegisterConnect } from "./modules/register/RegisterConnect";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/register" component={RegisterConnect} />
      <Route exact={true} path="/" render={() => <h1>Home page</h1>} />
    </Switch>
  </BrowserRouter>
);
