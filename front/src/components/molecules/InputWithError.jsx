import Error from "../atoms/Error";
import Input from "../atoms/Input";
import Label from "../atoms/Label";

// Nom de la molécule : InputWithError
const InputWithError = ({
  labelName,
  status,
  name,
  type,
  onChange,
  value,
  placeholder,
  className,
  error,
}) => {
  let inputProps = {
    type: type,
    name,
    onChange,
    value,
    placeholder,
    className,
  };

  if (type === "number") {
    inputProps = { ...inputProps, num: 0 };
  }

  return (
    <div className="input-with-error">
      <Label>
        {labelName}
        {status}
      </Label>
      <Input {...inputProps} />
      {error && <Error>{error}</Error>}
    </div>
  );
};

export default InputWithError;
