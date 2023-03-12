import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
  isRequired?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({ label, textarea, size: _, isRequired ,...props }) => {
  let InputOrTextarea = Input;

  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputOrTextarea {...field} {...props} id={field.name} borderRadius={5} borderColor={'gray.500'} isRequired={isRequired}/>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};