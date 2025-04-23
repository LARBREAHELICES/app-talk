const Button = ({
  children,
  className = "",
  disabled = false,
  variant = "primary",
  ...rest
}) => {
  const base = "font-semibold py-2 px-4 rounded-xl transition";
  const variants = {
    primary: "bg-[#a68b6d] text-white hover:bg-[#92755b]",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
    disabled: "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50",
  };

  const variantClass = variants[variant] || variants["primary"];

  return (
    <button
      disabled={disabled || variant === "disabled"}
      className={`${base} ${variantClass} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
