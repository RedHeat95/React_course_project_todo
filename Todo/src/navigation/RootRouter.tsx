import { useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { IState } from "../redux/store";

import { Header } from "../components/Header/Header";

import { Form } from "../components/Form/Form";
import { LogIn } from "../components/LogIn/LogIn";
import { ConfirmEmail } from "../components/ConfirmEmail/ConfirmEmail";
import { Support } from "../components/Support/Support";
import { Setting } from "../components/Setting/Settings";
import { ErrorPage } from "../components/ErrorPage/ErrorPage";

export function RootRouter() {
  const isLoggedIn = useSelector(
    (state: IState) => state.authReducer.isLoggedIn
  );

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" component={Form} exact />
        <Route path="/login" component={LogIn} exact />
        <Route path="/registration" component={LogIn} exact />
        <Route path="/confirm" component={ConfirmEmail} />
        <Route path="/support" component={Support} exact />
        <Route path="/setting">
          {isLoggedIn ? <Setting /> : <Redirect to={"/login"} />}
        </Route>
        <Route path="*" component={ErrorPage} exact />
      </Switch>
    </BrowserRouter>
  );
}
