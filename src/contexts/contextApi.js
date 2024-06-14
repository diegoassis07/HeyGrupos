import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HookFormYup } from "../components/hook-form-yup";
import { auth } from "./../config/firebaseConnection";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

const Context = createContext();

export const AuthProvider = ({ children }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const { reset, setValue } = HookFormYup();

  //Salvando credentials do usuario no asyncStoge
  /* const StorageUser = async (userData) => {
    const response = await AsyncStorage.setItem(
      "hasUser",
      JSON.stringify(userData)
    );
    return response;
  }; */

  //verificando se tem algum usuario logado
  /*  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem("hasUser");
      storageUser ? setUser(JSON.parse(storageUser)) : setUser(null);
      setLoading(false);
    }
    loadStorage();
  }, []);
 */

  //Tranando errors de credentials
  const handleErrorsCredentials = (error, clearInputs) => {
    if (error === "auth/invalid-credential") {
      return Alert.alert(
        "Alerta !!",
        "E-mail ou senha invalido!",
        [
          {
            text: "OK",
            onPress: () => clearInputs(),
          },
        ],
        { cancelable: false }
      );
    }
    if (error === "auth/email-already-in-use") {
      return Alert.alert(
        "Alerta !!",
        "Este email ja esta em uso!",
        [
          {
            text: "OK",
            onPress: () => clearInputs(),
          },
        ],
        { cancelable: false }
      );
    }
  };

  //Login
  const SignIn = async (data) => {
    setLoading(true);
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      /* let userData = {
        uid: userCredentials.user.uid,
        email: userCredentials.user.email,
        password: userCredentials.user.password,
      }; */
      navigation.goBack();
      setLoading(false);
      return userCredentials;
    } catch (error) {
      setLoading(false);
      throw new Error(error.code);
    }
  };

  //Cadastrando
  const SignUp = async (data) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      ).then(() => {
        return Alert.alert(
          "Sucesso!",
          "Usuário cadastrado com sucesso!",
          [
            {
              text: "OK",
              onPress: () => navigation.goBack(),
            },
          ],
          { cancelable: false }
        );
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error(error.code);
    }
  };

  return (
    <Context.Provider
      value={{
        SignUp,
        SignIn,
        loading,
        hasUser: !!user,
        handleErrorsCredentials,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export const useGlobal = () => {
  const AuthContext = useContext(Context);
  return AuthContext;
};
