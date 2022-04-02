import { useCallback, useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { IState } from "../../redux/store";
import { login } from "../../redux/actions/authActions";
import { validationService } from "../../services/validation";
import { ThemeContext } from "../../context/ThemeContext";

import { Input } from "../Inputs/Input/Input";
import { Button } from "../Buttons/Button/Button";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { theme } = useContext(ThemeContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const error = useSelector((state: IState) => state.authReducer.error);
  const isLoggedIn = useSelector(
    (state: IState) => state.authReducer.isLoggedIn
  );

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
  }, [isLoggedIn]);

  const onChangeEmail = useCallback((event) => {
    const value = event.target.value;
    setEmail(value);
  }, []);

  const onChangePassword = useCallback((event) => {
    const value = event.target.value;
    setPassword(value);
  }, []);

  const onClick = () => {
    const errors = {
      email: validationService.validateEmail(email),
      password: validationService.validatePassword(password),
    };
    setErrors(errors);

    const values = Object.values(errors);
    const isValid = values.every((value) => value === "");

    if (isValid) {
      dispatch(login(email, password));
    }
  };

  const errorValues = error ? Object.values(error).flat() : "";

  return (
    <>
      <Input
        type="email"
        text="Email"
        value={email}
        onChange={onChangeEmail}
        error={errors.email}
      />
      <Input
        type="password"
        text="Password"
        value={password}
        onChange={onChangePassword}
        error={errors.password}
      />

      <Button text="Login" onClick={onClick} />

      {<p style={{ color: theme.textName }}>{errorValues}</p>}
    </>
  );
};
