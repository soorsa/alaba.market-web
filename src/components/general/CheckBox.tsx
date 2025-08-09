// import { Field, ErrorMessage, useField } from "formik";
// import { FaExclamationCircle } from "react-icons/fa";
// import React from "react";
// import { Check } from "lucide-react";

// interface CheckboxFieldProps {
//   name: string;
//   label?: string;
//   labelPosition?: "left" | "right";
//   className?: string;
//   theme?: "light" | "dark";
//   disabled?: boolean;
// }

// const CheckboxField: React.FC<CheckboxFieldProps> = ({
//   name,
//   label,
//   labelPosition = "right",
//   className = "",
//   theme = "light",
//   disabled = false,
// }) => {
//   const [field, meta] = useField(name);
//   const hasError = meta.touched && meta.error;

//   return (
//     <div className={`w-full text-left ${className}`}>
//       <label className="flex items-center cursor-pointer">
//         {label && labelPosition === "left" && (
//           <span className="text-sm mr-2">{label}</span>
//         )}

//         <div className={`relative flex items-center`}>
//           {/* Hidden checkbox for Formik */}
//           <Field
//             type="checkbox"
//             name={name}
//             disabled={disabled}
//             className="sr-only"
//           />

//           {/* Custom checkbox appearance */}
//           <div
//             className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
//               hasError
//                 ? "border-red-500"
//                 : theme === "dark"
//                 ? "border-gray-700"
//                 : "border-gray-300"
//             } ${
//               field.checked
//                 ? "bg-blue-500 border-blue-500"
//                 : "bg-white dark:bg-gray-800"
//             }`}
//           >
//             {field.checked && <Check className="h-3 w-3" />}
//           </div>

//           {/* Error Icon */}
//           {hasError && (
//             <div className="ml-2">
//               <FaExclamationCircle className="w-4 h-4 text-red-500" />
//             </div>
//           )}
//         </div>

//         {label && labelPosition === "right" && (
//           <span className="text-sm ml-2">{label}</span>
//         )}
//       </label>

//       {/* Error Message */}
//       <ErrorMessage
//         name={name}
//         component="p"
//         className="text-red-500 text-[9px] mt-1 ml-2 text-left"
//       />
//     </div>
//   );
// };

// export default CheckboxField;

import { ErrorMessage, useField } from "formik";
import { FaExclamationCircle } from "react-icons/fa";
import React from "react";
import { Check } from "lucide-react";

interface CheckboxFieldProps {
  name: string;
  label?: string;
  labelPosition?: "left" | "right";
  className?: string;
  theme?: "light" | "dark";
  disabled?: boolean;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
  labelPosition = "right",
  className = "",
  theme = "light",
  disabled = false,
}) => {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && meta.error;

  // Handle checkbox toggle
  const handleChange = () => {
    helpers.setValue(!field.value);
    helpers.setTouched(true);
  };

  return (
    <div className={`w-full text-left ${className}`}>
      <label className="flex items-center cursor-pointer">
        {label && labelPosition === "left" && (
          <span className="text-sm mr-2">{label}</span>
        )}

        <div className={`relative flex items-center`}>
          {/* Hidden checkbox for Formik */}
          <input
            type="checkbox"
            name={field.name}
            checked={field.value || false}
            onChange={handleChange}
            onBlur={field.onBlur}
            disabled={disabled}
            className="sr-only"
          />

          {/* Custom checkbox appearance */}
          <div
            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
              hasError
                ? "border-red-500"
                : theme === "dark"
                ? "border-gray-700"
                : "border-gray-300"
            }
             ${
               field.value
                 ? "bg-transparent border-alaba"
                 : "bg-white dark:bg-gray-800"
             }
            `}
            onClick={handleChange}
          >
            {field.value && (
              <Check className="w-3 h-3" />
              //   <svg
              //     className="w-3 h-3 text-white"
              //     viewBox="0 0 20 20"
              //     fill="currentColor"
              //   >
              //     <path
              //       fillRule="evenodd"
              //       d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              //       clipRule="evenodd"
              //     />
              //   </svg>
            )}
          </div>

          {/* Error Icon */}
          {hasError && (
            <div className="ml-2">
              <FaExclamationCircle className="w-4 h-4 text-red-500" />
            </div>
          )}
        </div>

        {label && labelPosition === "right" && (
          <span className="text-sm ml-2">{label}</span>
        )}
      </label>

      {/* Error Message */}
      <ErrorMessage
        name={name}
        component="p"
        className="text-red-500 text-[9px] mt-1 ml-2 text-left"
      />
    </div>
  );
};

export default CheckboxField;
