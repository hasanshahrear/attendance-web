'use client'

import { Field, FieldProps, GenericFieldHTMLAttributes, } from "formik";
import { InputHTMLAttributes, useId } from "react";
import { Input } from "../input";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name?: string;
  id?: string,
  label?: string,
  placeholder?: string,
  disabled?: boolean,
  className?: string,
  error?: boolean,
  helperText?: string,
  requiredIcon?: string,
  password?:boolean,
};

function TextField({
  name,
  id,
  label,
  placeholder,
  disabled,
  className = "",
  error,
  helperText,
  requiredIcon,
  password,
  ...rest
}: TextFieldProps) {
  const generatedID = useId();
  const inputId = id || generatedID;

  return (
    <div>
      <div className="flex">
        {label && (
          <label  htmlFor={inputId} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {label}
          </label>
        )}
        {requiredIcon && <label className="text-red-600 ml-1">{requiredIcon}</label>}
      </div>
      <div className="flex flex-row items-center">
        <Input name={name} id={inputId} type={password? "password": "text"} disabled={disabled} placeholder={placeholder} {...rest} />
      </div>

      {error && <small className="text-red-600">{helperText}</small>}
      {helperText && !error && <small>{helperText}</small>}
    </div>
  );
}

type FormikTextFieldProps = GenericFieldHTMLAttributes & {
  props?: TextFieldProps
};

export function FormikTextField({
  disabled,
  props,
  ...rest
}: FormikTextFieldProps) {
  return (
    <Field {...rest} >
      {({
        field,
        meta: { touched, error },
        form: { isSubmitting },
      }: FieldProps<string>) => {
        return(
        <TextField 
          {...field} 
          {...props} 
          disabled={disabled || isSubmitting} 
          error={(touched && !!error)} 
          helperText={
            touched && !!error
              ? (error as string)
              : props?.helperText
          } 
        />
      )}}
    </Field>
  );
}
