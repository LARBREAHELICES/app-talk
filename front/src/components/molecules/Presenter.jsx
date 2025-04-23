import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Error from "../atoms/Error";

function Presenter(props) {
  const res = {
    type: "text",
    name: "presenter",
    onChange: props.onChangeName,
    value: props.valueName,
    placeholder: "Add presenter",
    className: "flex-1 p-3 rounded-xl border border-[#c8bfb6] bg-[#fcfaf8]",
  };

  const resEmail = {
    type: "email",
    name: "email",
    onChange: props.onChangeEmail,
    value: props.valueEmail,
    placeholder: "Email",
    className: "flex-1 p-3 rounded-xl border border-[#c8bfb6] bg-[#fcfaf8]",
  };

  return (
    <>
    {props.error && (<Error>{props.error}</Error>)}
      <h3 className="text-lg font-semibold text-[#4b3f33]">
        Presenter{props.status}
      </h3>
      <div className="flex gap-2">
        <Input {...res} />
        <Input  {...resEmail} />
        <Button
          variant={(props.valueName.length == '' && props.valueEmail.length == '') ? "disabled" : "primary"}
          type="button"
          onClick={props.handleAddPresenter}
          className="px-4 bg-[#4b3f33] text-white rounded-xl hover:bg-[#3a312a] transition"
        >
          Add
        </Button>
      </div>
    </>
  );
}

export default Presenter
