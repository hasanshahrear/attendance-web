'use client'

import { useField, useFormikContext } from "formik";
import Select, { MultiValue, SingleValue } from "react-select";
// import {} from "react-select"
//@ts-ignore
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";

const customStyles = {
  control: (provided: object) => ({
    ...provided,
    border: "2px solid #d5d5d5",
    borderRadius: "8px",
    backgroundColor: "#FAFAFA",
    height: "40px",
  }),
};
const defaultStyle = {
  control: (provided: object) => ({
    ...provided,
    border: "1px solid var(--outline, rgba(204, 204, 204, 0.80))",
    borderRadius: "5px",
    backgroundColor: "#FFF",
    height: "40px",
    boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
  }),
};

type SelectOptionType = {
  label: string;
  value: string | number;
};

// multiple option type
type SelectMultipleOptionType = {
  label: string;
  options: SelectOptionType[];
};

// props type
type Props = {
  name: string;
  helperText?: string;
  label?: string;
  error?: boolean;
  loginStyle?: boolean;
  requiredIcon?: string;
  onSelect?: (
    value:  SingleValue<SelectOptionType>
  ) => void;
  onChange?: (
    value: MultiValue<SelectOptionType> | SingleValue<SelectOptionType>
  ) => void; // <-- Add this line
} & Omit<
  StateManagerProps<SelectOptionType, false | true, SelectMultipleOptionType>,
  "value" | "onChange"
>;

export function FormikReactSelect(props: any) {
  const { name, label, error, helperText, apiError, requiredIcon, onSelect, ...restProps } =
    props;
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  //flatten the options so that it will be easier to find the value
  const flattenedOptions = props?.options?.flatMap((o: any) => {
    const isNotGrouped = "value" in o;
    if (isNotGrouped) {
      return o;
    } else {
      return o?.options;
    }
  });

  //get the value using flattenedOptions and field.value
  const value = flattenedOptions?.filter((o: any) => {
    const isArrayValue = Array?.isArray(field?.value);
    if (isArrayValue) {
      const values = field?.value as Array<unknown>;
      return values?.includes(o?.value);
    } else {
      return field?.value === o?.value;
    }
  });

  return (
    <div className="w-full">
      <div className="flex">
        {label && (
          <label htmlFor="item" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {label}
          </label>
        )}
        {requiredIcon && <label className="text-red-600 ml-1">{requiredIcon}</label>}
      </div>
      
      <Select
        {...restProps}
        value={value}
        // onChange implementation
        onChange={(val) => {
          const _val = val as SelectOptionType;
          const isArray = Array.isArray(_val);

          if (isArray) {
            const values = _val.map((o) => o?.value);
            setFieldValue(name, values);
          } else {
            setFieldValue(name, _val?.value);
          }
          onSelect && onSelect(val);
        }}
        styles={restProps.loginStyle ? customStyles : defaultStyle}
      />

      {meta?.touched && meta?.error && (
        <small className="text-red-600">{meta?.error}</small>
      )}
      {helperText && !meta?.error && <small>{helperText}</small>}
    </div>
  );
}
