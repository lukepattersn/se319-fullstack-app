import React from "react";

const Button = ({
  variant = "primary",
  disabled = false,
  type = "button",
  onClick,
  children,
  className = "",
  ...rest
}) => {
  // Define button styles based on variant
  const getButtonClasses = () => {
    const baseClasses = "px-4 py-2 rounded font-medium transition-colors";
    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

    let variantClasses = "";
    switch (variant) {
      case "primary":
        variantClasses = disabled
          ? "bg-blue-400 text-white"
          : "bg-blue-600 hover:bg-blue-700 text-white";
        break;
      case "secondary":
        variantClasses = disabled
          ? "bg-gray-400 text-white"
          : "bg-gray-600 hover:bg-gray-700 text-white";
        break;
      case "danger":
        variantClasses = disabled
          ? "bg-red-400 text-white"
          : "bg-red-600 hover:bg-red-700 text-white";
        break;
      case "outline":
        variantClasses = disabled
          ? "border border-gray-300 text-gray-400"
          : "border border-gray-300 hover:bg-gray-50 text-gray-700";
        break;
      default:
        variantClasses = disabled
          ? "bg-blue-400 text-white"
          : "bg-blue-600 hover:bg-blue-700 text-white";
    }

    return `${baseClasses} ${variantClasses} ${disabledClasses} ${className}`.trim();
  };

  return (
    <button
      type={type}
      className={getButtonClasses()}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
