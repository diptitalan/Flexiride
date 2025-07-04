// import React from "react";

// interface DropDownProps {
//   label?: string;
//   options: string[];
//   value: string;
//   onChange: (value: string) => void;
//   disabled?: boolean;
//   grayLabel?: boolean;
//   required?: boolean;
// }

// const DropDown: React.FC<DropDownProps> = ({
//   label,
//   options,
//   value,
//   onChange,
//   disabled = false,
//   grayLabel = false,
//   required = false,
// }) => {
//   return (
//     <div className="flex flex-col">
//       <label
//         className={`${
//           grayLabel ? "text-gray-500" : "text-gray-800"
//         } text-[13px] font-medium mb-1`}
//       >
//         {label} {required && <span className="text-red-500 text-xs">*</span>}
//       </label>
//       <select
//         className="p-2 text-[13px] rounded-md border border-gray-300 w-full"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         disabled={disabled}
//       >
//         <option value="">Select {label}</option>
//         {options.map((option, idx) => (
//           <option key={idx} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default DropDown;

import React from "react";

interface DropDownProps {
  label?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  grayLabel?: boolean;
  required?: boolean;
  inlineLabelOnly?: boolean; // new prop
  className? : string;
}

const DropDown: React.FC<DropDownProps> = ({
  label,
  options,
  value,
  onChange,
  disabled = false,
  grayLabel = false,
  required = false,
  inlineLabelOnly = false,
}) => {
  const renderLabel = !inlineLabelOnly && label;

  return (
    <div className="flex flex-col">
      {renderLabel && (
        <label
          className={`${
            grayLabel ? "text-gray-500" : "text-gray-800"
          } text-[13px] font-medium mb-1`}
        >
          {label} {required && <span className="text-red-500 text-xs">*</span>}
        </label>
      )}

      <select
        className="p-2 text-[13px] rounded-md border border-gray-300 w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        {inlineLabelOnly && label && !value && (
          <option value="" disabled hidden>
            {label}
          </option>
        )}

        {!inlineLabelOnly && label && (
          <option value="">Select {label}</option>
        )}

        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
