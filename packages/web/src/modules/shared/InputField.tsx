import React from "react";
import { FieldProps } from "formik";
import { Form, Input } from "antd";

type IFProps = FieldProps<any> & { prefix: React.ReactNode };

export const InputField = ({ field, form: { touched, errors }, ...props }: IFProps) => {
  const error = touched[field.name] && errors[field.name];

  return (
    <Form.Item validateStatus={error ? "error" : "success"} help={error}>
      <Input {...field} {...props} />
    </Form.Item>
  );
};
