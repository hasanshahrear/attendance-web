'use client'

import { useFormikContext } from "formik";
import { Button } from "../button";

export const FormikResetButton = ({ children, ...rest }: any) => {
  const formik = useFormikContext();
  const handleReset = () => {
    formik.resetForm();
  };

  return (
    <Button  onClick={handleReset} {...rest}>
      {children}
    </Button>
  );
};
