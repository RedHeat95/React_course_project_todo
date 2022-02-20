import { Input } from "../Inputs/Input/Input";
import { Button } from "../Buttons/Button/Button";

export const LoginForm = () => {
  return (
    <>
      <Input text="Name" />
      <Input text="Password" />
      <Button text="Login" onClick={() => {}} />
    </>
  );
};
