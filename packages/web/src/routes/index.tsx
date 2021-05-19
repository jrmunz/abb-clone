import { BrowserRouter, Route, Switch } from "react-router-dom";

import { RegisterConnect } from "../modules/register/RegisterConnect";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/register" component={RegisterConnect} />
    </Switch>
  </BrowserRouter>
);
