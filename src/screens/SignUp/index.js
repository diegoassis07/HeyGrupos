import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useGlobal } from "../../contexts/contextApi";
import { Controller } from "react-hook-form";
import { HookFormYup } from "../../components/hook-form-yup";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Native from "react-native";
import * as S from "./styled";

export default function SignUp() {
  const navigation = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = useState(false);

  const { control, handleSubmit, errors, setValue } = HookFormYup("signUp");
  const { SignUp, loading, handleErrorsCredentials } = useGlobal();

  const clearInputs = () => {
    setValue("nome", "");
    setValue("email", "");
    setValue("password", "");
  };

  const handleSignUP = (data) => {
    SignUp(data).catch((error) => {
      handleErrorsCredentials(error.message, clearInputs);
    });
  };

  return (
    <S.Container>
      <S.Title>HeyGrupos</S.Title>
      <S.Label>Ajude, colabore, faça networking!</S.Label>
      <S.ContainerInput
        behavior={Native.Platform.OS === "android" ? "" : "padding"}
      >
        <S.ContentInputName>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="nome"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <MaterialIcons name="person-outline" size={27} color="black" />
                <S.Input
                  placeholder="Nome"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </>
            )}
          />
        </S.ContentInputName>
        {errors.nome && (
          <S.ContentError>
            <S.Error>{errors.nome.message}</S.Error>
          </S.ContentError>
        )}

        <S.ContentInputEmail>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={27}
                  color="black"
                />
                <S.Input
                  placeholder="E-mail"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </>
            )}
          />
        </S.ContentInputEmail>
        {errors.email && (
          <S.ContentError>
            <S.Error>{errors.email.message}</S.Error>
          </S.ContentError>
        )}

        <S.ContentInputPassword>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={27}
                  color="black"
                />
                <S.Input
                  placeholder="*******"
                  secureTextEntry={!secureTextEntry}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <MaterialCommunityIcons
                  name={secureTextEntry ? "eye" : "eye-off"}
                  size={27}
                  color="black"
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                />
              </>
            )}
          />
        </S.ContentInputPassword>
        {errors.password && (
          <S.ContentError>
            <S.Error>{errors.password.message}</S.Error>
          </S.ContentError>
        )}

        <S.Button onPress={handleSubmit(handleSignUP)}>
          {loading ? (
            <Native.ActivityIndicator size={29} color="#FFF" />
          ) : (
            <S.ButtonText>Cadastrar</S.ButtonText>
          )}
        </S.Button>
      </S.ContainerInput>
      <S.Link onPress={() => navigation.navigate("SignIn")}>
        Já possuo uma conta
      </S.Link>
    </S.Container>
  );
}
