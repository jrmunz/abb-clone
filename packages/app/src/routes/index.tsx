import React from "react";
import { NativeRouter, Route, Switch } from "react-router-native";
import { RegisterConnect } from "../modules/register/RegisterConnect";

export const Routes = () => (
  <NativeRouter>
    <Switch>
      <Route exact={true} path="/" component={RegisterConnect} />
    </Switch>
  </NativeRouter>
);
