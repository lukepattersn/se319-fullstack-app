import React from "react";

const Card = ({ header, children, footer, className = "", ...rest }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow overflow-hidden ${className}`}
      {...rest}
    >
      {/* Card Header (optional) */}
      {header && (
        <div className="px-4 py-3 border-b border-gray-200">
          {typeof header === "string" ? (
            <h3 className="font-medium">{header}</h3>
          ) : (
            header
          )}
        </div>
      )}

      {/* Card Body */}
      <div className="p-4">{children}</div>

      {/* Card Footer*/}
      {footer && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
