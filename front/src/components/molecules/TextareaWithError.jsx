import Error from "../atoms/Error"
import Textarea from "../atoms/Textarea"
import Label from "../atoms/Label"

function TextareaWithError(props) {
  const res = {
    name: props.name,
    onChange: props.onChange,
    value: props.value,
    placeholder: props.placeholder,
    className: props.className,
    row: 3,
  };
  return (
    <div>
      <Label>{props.labelName}{props.status}</Label>
      <Textarea {...res} />
      {props.error && <Error>{props.error}</Error>}
    </div>
  );
}

export default TextareaWithError
