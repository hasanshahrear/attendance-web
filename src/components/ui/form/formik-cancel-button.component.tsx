'use client'

import { useFormikContext } from "formik";
import { Button } from "../button";

export const FormikCancelButton = ({
  className,
  children,
  ...rest
}: any) => {
  const formik = useFormikContext();
  const handleCancel = () => {
    formik.resetForm();
  };

  return (
    <Button
      className={`${className} `}
      onClick={handleCancel}
      {...rest}
      outlined
      severity="secondary"
    >
      {children}
    </Button>
  );
};
