import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { HookFormYup } from "../../components/hook-form-yup";
import { Controller } from "react-hook-form";
import { useGlobal } from "./../../contexts/contextApi";
import * as Native from "react-native";
import * as S from "./styled";

export default function SignIn() {
  const navigation = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const { control, errors, handleSubmit, setValue } = HookFormYup("signIn");
  const { SignIn, loading, handleErrorsCredentials } = useGlobal();

  const clearInputs = () => {
    setValue("email", "");
    setValue("password", "");
  };

  const handleSignIn = (data) => {
    SignIn(data).catch((error) =>
      handleErrorsCredentials(error.messagem, clearInputs)
    );
  };

  return (
    <S.Container>
      <S.Title>HeyGrupos</S.Title>
      <S.Label>Ajude, colabore, faça networking!</S.Label>
      <S.ContainerInput
        behavior={Native.Platform.OS === "android" ? "" : "padding"}
      >
        <S.ContentInputEmail>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
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
            name="password"
            render={({ field: { value, onChange, onBlur } }) => {
              return (
                <>
                  <MaterialCommunityIcons
                    name="lock-outline"
                    size={27}
                    color="black"
                  />
                  <S.Input
                    placeholder="*******"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry={!secureTextEntry}
                  />
                  <MaterialCommunityIcons
                    name={secureTextEntry ? "eye" : "eye-off"}
                    size={27}
                    color="black"
                    onPress={() => setSecureTextEntry(!secureTextEntry)}
                  />
                </>
              );
            }}
          />
        </S.ContentInputPassword>
        {errors.password && (
          <S.ContentError>
            <S.Error>{errors.password.message}</S.Error>
          </S.ContentError>
        )}

        <S.Button onPress={handleSubmit(handleSignIn)}>
          {loading ? (
            <Native.ActivityIndicator size={29} color="#FFF" />
          ) : (
            <S.ButtonText>Acessar</S.ButtonText>
          )}
        </S.Button>
      </S.ContainerInput>
      <S.Link onPress={() => navigation.navigate("SignUp")}>
        Criar uma nova conta
      </S.Link>
    </S.Container>
  );
}
