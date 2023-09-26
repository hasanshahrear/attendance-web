'use client'

import { LoginRes } from "@/components/models/auth";
import { FormikTextField } from "@/components/ui/form";
import { FormikSubmitButton } from "@/components/ui/form/formik-submit-button.component";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useRouter } from 'next/navigation';
import { AuthWrapper } from "..";
import { LoginFormType, initialValues, loginFormSchema, loginMethod } from "./form.config";

export function LoginIn(){
  const {push} = useRouter()
  const {mutate, isLoading} = useMutation(loginMethod, 
    {onSuccess: (data: LoginRes) => {
      const {token, message} = data;
        localStorage.clear()
        sessionStorage.clear()
        localStorage.setItem("access_token", JSON.stringify(token))
        toast({
          variant: "default",
          title: message,
          color: "success",
          className: "bg-green-500 text-white"
        })
        push("/dashboard");
    },

    onError: (error: LoginRes) => {
      const{message} = error
      toast({
        variant: "default",
        title: message,
        color: "success",
        className: "bg-red-500 text-white"
      })
    },
  });

  const onSubmit = async (data: LoginFormType) => await mutate(data);
    return <AuthWrapper>
      <Formik 
        initialValues={initialValues}
        validationSchema={loginFormSchema}
        onSubmit={onSubmit}
      >
        {()=>
        <Form className="flex gap-3 flex-col">
            <div>
              <FormikTextField
                name="phone"
                props={{
                  label: "Phone",
                  placeholder:"Phone"
                }}
              />
            </div>
            <div>
              <FormikTextField
                name="password"
                props={{
                  label: "Password",
                  placeholder:"Password"
                }}
              />
            </div>
            <div className="flex items-center">
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label  className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>
                </div>
            </div>
            <FormikSubmitButton className="mt-3">Submit</FormikSubmitButton>
          </Form>
        }
      </Formik>
    </AuthWrapper>
}