export default function SuccessMessage(props) {
  const { message } = props.message;
  return (
    <div
      className="flex items-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <span>{message}</span>
    </div>
  );
}
