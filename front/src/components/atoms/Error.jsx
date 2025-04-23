const Error = ({ children, className, ...rest }) => {
    if(!className){
        className ="text-red-600 text-sm"
    }
    return (
      <p className={className} {...rest}>
        {children}
      </p>
    );
  }
  
export default Error
