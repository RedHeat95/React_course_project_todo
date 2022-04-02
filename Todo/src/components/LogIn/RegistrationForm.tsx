import { useCallback, useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { IState } from "../../redux/store";
import { register } from "../../redux/actions/authActions";
import { validationService } from "../../services/validation";
import { ThemeContext } from "../../context/ThemeContext";

import { Button } from "../Buttons/Button/Button";
import { Input } from "../Inputs/Input/Input";

export const RegistrationForm = () => {
  const { theme } = useContext(ThemeContext);

  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const error = useSelector((state: IState) => state.authReducer.error);
  const emailState = useSelector((state: IState) => state.authReducer.email);

  useEffect(() => {
    if (emailState) {
      history.push("/confirm");
    }
  }, [emailState]);

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const onChangeUserName = useCallback((event) => {
    const value = event.target.value;
    setUserName(value);

    const error = validationService.validateName(value);
    setErrors((errors) => ({ ...errors, userName: error }));
  }, []);

  const onChangeEmail = useCallback((event) => {
    const value = event.target.value;
    setEmail(value);

    const error = validationService.validateEmail(value);
    setErrors((errors) => ({ ...errors, email: error }));
  }, []);

  const onChangePassword = useCallback((event) => {
    const value = event.target.value;
    setPassword(value);

    const error = validationService.validatePassword(value);
    setErrors((errors) => ({ ...errors, password: error }));
  }, []);

  const onChangeRepeatPassword = useCallback((event) => {
    setRepeatPassword(event.target.value);
  }, []);

  const onClick = () => {
    const errors = {
      username: validationService.validateName(username),
      email: validationService.validateEmail(email),
      password: validationService.validatePassword(password),
      repeatPassword: validationService.validateRepeatedPassword(
        password,
        repeatPassword
      ),
    };
    setErrors(errors);

    const values = Object.values(errors);
    const isValid = values.every((value) => value === "");
    if (isValid) {
      dispatch(register({ username, email, password }));
    }
  };

  const errorValues = error ? Object.values(error).flat() : "";

  return (
    <>
      <Input
        type="text"
        text="Name"
        value={username}
        onChange={onChangeUserName}
        error={errors.username}
      />
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
      <Input
        type="password"
        text="Confirm password"
        value={repeatPassword}
        onChange={onChangeRepeatPassword}
        error={errors.repeatPassword}
      />

      <Button text="Registration" onClick={onClick} />

      {<p style={{ color: theme.textName }}>{errorValues}</p>}
    </>
  );
};
