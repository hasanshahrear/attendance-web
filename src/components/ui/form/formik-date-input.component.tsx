
'use client'

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Field, FieldProps, GenericFieldHTMLAttributes, useFormikContext } from "formik";
import { CalendarIcon } from "lucide-react";
import { InputHTMLAttributes, useEffect, useId, useState } from "react";
import { SelectRangeEventHandler } from "react-day-picker";
import { Button } from "../button";
import { Calendar } from "../calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

type CalenderFieldProps = InputHTMLAttributes<SelectRangeEventHandler> & {
  label?: string;
  helperText?: string;
  error?: boolean;
  inputClassName?: string;
  requiredIcon?: string;
};

function DateField({
  name,
  id,
  label,
  disabled,
  className = "",
  error,
  helperText,
  inputClassName = "",
  requiredIcon,
  ...rest
}: CalenderFieldProps) {
  const generatedID = useId();
  const inputId = id || generatedID;
  const {setFieldValue, values}  = useFormikContext();
  const [date, setDate] = useState<Date>()

  useEffect(()=>{
    if(date){
      setFieldValue(`${name}`, date.toDateString())
    }
  }, [date])

  return (
    <div className="w-full">
      <div className="mb-2">
        {label && (
          <label
            htmlFor={inputId}
          >
            {label}
          </label>
        )}
        {requiredIcon && <label style={{ color: "red" }}>{requiredIcon}</label>}
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
          />
        </PopoverContent>
      </Popover>

      {error && <small className={"p-error"}>{helperText}</small>}
      {helperText && !error && <small>{helperText}</small>}
    </div>
  );
}

type FormikDateFieldProps = GenericFieldHTMLAttributes & {
  props?: CalenderFieldProps;
};

export function FormikDateField({
  props,
  disabled,
  ...rest
}: FormikDateFieldProps) {
  return (
    <Field {...rest}>
      {({
        field,
        meta: { touched, error },
        form: { isSubmitting },
      }: FieldProps<string>) => (
        <DateField
          {...field}
          {...props}
          disabled={disabled || isSubmitting}
          error={ (touched && !!error)}
          helperText={
             touched && !!error
              ? (error as string)
              : props?.helperText
          }
        />
      )}
    </Field>
  );
}
