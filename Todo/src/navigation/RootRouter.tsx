import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Header } from "../components/Header/Header";

import { Form } from "../components/Form/Form";
import { LogIn } from "../components/LogIn/LogIn";
import { Support } from "../components/Support/Support";
import { Setting } from "../components/Setting/Settings";
import { ErrorPage } from "../components/ErrorPage/ErrorPage";

export function RootRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" component={Form} exact />
        <Route path="/login" component={LogIn} exact />
        <Route path="/registration" component={LogIn} exact />
        <Route path="/support" component={Support} exact />
        <Route path="/setting" component={Setting} exact />
        <Route path="*" component={ErrorPage} exact />
      </Switch>
    </BrowserRouter>
  );
}
