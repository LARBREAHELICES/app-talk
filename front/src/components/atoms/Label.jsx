const Label = ({ children, status = '', className, ...rest }) => {
  return (
    <label className={className}  {...rest}>
      {status} {children}
    </label>
  );
}

export default Label
