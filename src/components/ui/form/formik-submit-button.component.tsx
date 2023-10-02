'use client'
import { useFormikContext } from "formik";
import { Button } from "../button";
import styles from "./formik-submit-button.component.module.css";

export const FormikSubmitButton = ({
  type = "submit",
  disabled,
  severity = "secondary",
  outlined,
  className,
  // loadingIcon = <CgSpinner className="icon-spin mr-1" />,
  ...rest
}: any) => {
  const { isSubmitting } = useFormikContext();

  return (
    <Button
      type={type}
      severity={severity ?? "secondary"}
      disabled={disabled || isSubmitting}
      // loading={isSubmitting ? isSubmitting : false}
      // loadingIcon={loadingIcon}
      className={`${className} ${styles.saveButton}`}
      {...rest}
    />
  );
};
