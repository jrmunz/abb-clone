import React from "react";
import { FieldProps } from "formik";
import { Input } from "react-native-elements";

type IFProps = FieldProps<any>;

const errorStyle = { color: "red" };

export const InputField = ({
  field,
  form: { touched, errors, setFieldValue },
  ...props
}: IFProps) => {
  const error = touched[field.name] && errors[field.name];

  const onChangeText = (text: string) => {
    setFieldValue(field.name, text);
  };

  return (
    <Input
      {...props}
      errorStyle={errorStyle}
      errorMessage={error as string}
      renderErrorMessage={error ? true : false}
      onChangeText={onChangeText}
      value={field.value}
    />
  );
};
