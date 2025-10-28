import { Field, ErrorMessage, useField } from "formik";
import { FaExclamationCircle } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { formatPrice } from "../../utils/formatter";

interface InputFieldProps {
  type?:
    | "text"
    | "email"
    | "tel"
    | "password"
    | "number"
    | "checkbox"
    | "textarea";
  placeholder?: string;
  name: string;
  label?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  rows?: number;
  theme?: string;
  readonly?: boolean;
  formatMoney?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  placeholder,
  name,
  label,
  icon,
  rightIcon,
  className = "",
  rows = 6,
  theme = "light",
  readonly = false,
  formatMoney = false,
}) => {
  const [field, meta, helpers] = useField(name);
  const [displayValue, setDisplayValue] = useState("");

  // Handle money type formatting
  useEffect(() => {
    if (formatMoney) {
      if (
        field.value === "" ||
        field.value === null ||
        field.value === undefined
      ) {
        setDisplayValue("");
      } else {
        // Ensure we're formatting a valid number
        const numericValue =
          typeof field.value === "string"
            ? parseFloat(field.value.replace(/[^\d.-]/g, ""))
            : Number(field.value);

        if (!isNaN(numericValue)) {
          setDisplayValue(formatPrice(numericValue));
        } else {
          setDisplayValue(field.value.toString());
        }
      }
    }
  }, [field.value, formatMoney]);

  const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    // Store raw input temporarily for display
    setDisplayValue(rawValue);

    // Extract numeric value for Formik
    const numericValue =
      rawValue === "" ? NaN : parseFloat(rawValue.replace(/[^\d.-]/g, ""));

    if (rawValue === "" || !isNaN(numericValue)) {
      helpers.setValue(numericValue);
    }
  };

  const handleMoneyBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    if (rawValue === "") {
      setDisplayValue("");
      helpers.setValue("");
      return;
    }

    // Extract and validate numeric value
    const numericValue = parseFloat(rawValue.replace(/[^\d.-]/g, ""));

    if (!isNaN(numericValue)) {
      // Format the display value but keep the numeric value in Formik
      setDisplayValue(formatPrice(numericValue));
      helpers.setValue(numericValue);
    } else {
      // If invalid, clear the field
      setDisplayValue("");
      helpers.setValue("");
    }

    helpers.setTouched(true);
  };

  const isTextarea = type === "textarea";
  const hasError = meta.touched && meta.error;

  // For money type, we need to handle the input differently
  if (formatMoney) {
    return (
      <div className="w-full text-left relative">
        <div className="text-xs text-gray-500">{label}</div>
        <div
          className={`w-full relative flex ${
            isTextarea ? "flex-col" : "flex-row"
          } border rounded-xl py-2 ${
            hasError
              ? "border-red-500"
              : theme === "dark"
              ? "border-gray-700"
              : "border-gray-400 focus:border-blue-400 active:border-blue-400"
          } ${className}`}
        >
          {/* Left Icon */}
          {icon && !isTextarea && (
            <div className="flex items-center px-1 md:px-3">{icon}</div>
          )}

          {/* Field */}
          <input
            {...field}
            value={displayValue}
            onChange={handleMoneyChange}
            onBlur={handleMoneyBlur}
            disabled={readonly}
            type="text" // Use text type for money to handle formatting
            placeholder={placeholder}
            className={`${
              theme === "dark" ? "text-gray-300" : "text-gray-900"
            } text-sm rounded-lg focus:ring-0 block w-full px-2 md:px-5 outline-none resize-none ${
              readonly && "cursor-not-allowed"
            }`}
          />

          {/* Error Icon */}
          {!isTextarea && hasError && (
            <div className="flex items-center px-3">
              <FaExclamationCircle className="w-5 h-5 text-red-500" />
            </div>
          )}

          {/* Right Icon */}
          {rightIcon && (
            <div className="flex items-center pr-3">{rightIcon}</div>
          )}
        </div>

        {/* Error Message */}
        <ErrorMessage
          name={name}
          component="p"
          className="text-red-500 text-[9px] mt-1 ml-2 text-left"
        />
      </div>
    );
  }
  return (
    <div className="w-full text-left relative">
      <div className="text-xs text-gray-500">{label}</div>
      <div
        className={`w-full relative flex ${
          isTextarea ? "flex-col" : "flex-row"
        } border rounded-xl py-2 ${
          hasError
            ? "border-red-500"
            : theme === "dark"
            ? "border-gray-700"
            : "border-gray-200 focus:border-blue-400 active:border-blue-400"
        } ${className}`}
      >
        {/* Left Icon */}
        {icon && !isTextarea && (
          <div className="flex items-center px-1 md:px-3">{icon}</div>
        )}

        {/* Field */}
        <Field
          as={isTextarea ? "textarea" : "input"}
          {...field}
          disabled={readonly}
          type={isTextarea ? undefined : type}
          placeholder={placeholder}
          rows={isTextarea ? rows : undefined}
          className={`${
            theme === "dark" ? "text-gray-300" : "text-gray-900"
          } text-sm rounded-lg focus:ring-0 block w-full px-2 md:px-5 outline-none resize-none ${
            isTextarea ? "min-h-[60px]" : ""
          } ${readonly && "cursor-not-allowed"}`}
        />

        {/* Error Icon */}
        {!isTextarea && hasError && (
          <div className="flex items-center px-3">
            <FaExclamationCircle className="w-5 h-5 text-red-500" />
          </div>
        )}

        {/* Right Icon */}
        {rightIcon && <div className="flex items-center pr-3">{rightIcon}</div>}
      </div>

      {/* Error Message */}
      <ErrorMessage
        name={name}
        component="p"
        className="text-red-500 text-[9px] mt-1 ml-2 text-left"
      />
    </div>
  );
};

export default InputField;
