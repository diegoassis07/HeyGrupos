import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schemaSignUp = yup.object().shape({
  nome: yup
    .string()
    .required("Nome é obrigatório")
    .max(20, "Máximo 20 caracteres"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(6, "Mínimo 6 digitos")
    .max(8, "Máximo 8 digitos"),
});

const schemaSignIn = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(6, "Mínimo 6 digitos")
    .max(8, "Máximo 8 digitos"),
});

const validateSchema = (typeSchema) => {
  const result = typeSchema === "signIn" ? schemaSignIn : schemaSignUp;
  return result;
};

export const HookFormYup = (typeSchema) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(validateSchema(typeSchema)),
    defaultValues: {
      nome: "",
      email: "",
      password: "",
    },
  });

  const clearInputs = () => {
    /* setValue("email", ""); */
    console.log("ok");
  };

  return { control, handleSubmit, setValue, reset, clearInputs, errors };
};
