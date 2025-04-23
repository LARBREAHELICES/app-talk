const Textarea = ({ children, className, disabled = false, ...rest }) => {
  return <textarea className={className} {...rest}>{children}</textarea>;
};

export default Textarea;
