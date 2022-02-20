import { Button } from "../Buttons/Button/Button";
import { Input } from "../Inputs/Input/Input";

export const RegistrationForm = () => {
  return (
    <>
      <Input text="Name" />
      <Input text="Email" />
      <Input text="Password" />
      <Input text="Confirmation password" />
      <Button text="Registration" onClick={() => {}} />
    </>
  );
};
