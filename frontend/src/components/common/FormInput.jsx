import React from "react";

const FormInput = ({
  id,
  name,
  type = "text",
  label,
  placeholder,
  required = false,
  error,
  disabled = false,
  onChange,
  value,
  className = "",
  ...rest
}) => {
  // Input classes
  const inputClasses = `
    w-full px-3 py-2 
    border rounded 
    ${error ? "border-red-500" : "border-gray-300"} 
    ${disabled ? "bg-gray-100" : "bg-white"}
    focus:outline-none focus:ring-1 focus:ring-blue-500
    ${className}
  `;

  return (
    <div className="mb-4">
      {/* Label (if provided) */}
      {label && (
        <label htmlFor={id} className="block mb-1 font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input */}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={onChange}
        value={value}
        className={inputClasses.trim()}
        {...rest}
      />

      {/* Error message (if any) */}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

/**
 * A textarea component matching the FormInput styling
 */
export const FormTextarea = (props) => {
  const {
    id,
    name,
    label,
    placeholder,
    required = false,
    error,
    disabled = false,
    onChange,
    value,
    rows = 4,
    className = "",
    ...rest
  } = props;

  // Textarea classes
  const textareaClasses = `
    w-full px-3 py-2 
    border rounded 
    ${error ? "border-red-500" : "border-gray-300"} 
    ${disabled ? "bg-gray-100" : "bg-white"}
    focus:outline-none focus:ring-1 focus:ring-blue-500
    ${className}
  `;

  return (
    <div className="mb-4">
      {/* Label (if provided) */}
      {label && (
        <label htmlFor={id} className="block mb-1 font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Textarea */}
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={onChange}
        value={value}
        rows={rows}
        className={textareaClasses.trim()}
        {...rest}
      />

      {/* Error message (if any) */}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

/**
 * A select dropdown component matching the FormInput styling
 */
export const FormSelect = (props) => {
  const {
    id,
    name,
    label,
    required = false,
    error,
    disabled = false,
    onChange,
    value,
    options = [],
    className = "",
    ...rest
  } = props;

  // Select classes
  const selectClasses = `
    w-full px-3 py-2 
    border rounded 
    ${error ? "border-red-500" : "border-gray-300"} 
    ${disabled ? "bg-gray-100" : "bg-white"}
    focus:outline-none focus:ring-1 focus:ring-blue-500
    ${className}
  `;

  return (
    <div className="mb-4">
      {/* Label */}
      {label && (
        <label htmlFor={id} className="block mb-1 font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Select */}
      <select
        id={id}
        name={name}
        required={required}
        disabled={disabled}
        onChange={onChange}
        value={value}
        className={selectClasses.trim()}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Error message */}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormInput;
