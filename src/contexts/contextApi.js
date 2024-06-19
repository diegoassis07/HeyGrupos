import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "./../config/firebaseConnection";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import {
  collection,
  addDoc,
  query,
  getDocs,
  orderBy,
  limit,
  doc,
  deleteDoc,
} from "firebase/firestore";

const Context = createContext();

export const AuthProvider = ({ children }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [threads, setThreads] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Deletando grupo
  const deleteGroup = async (
    ownerId,
    IdRoom,
    updateScreen,
    setUpdateScreen
  ) => {
    const user = auth.currentUser;
    if (ownerId !== user?.uid) return;

    Alert.alert(
      "Atenção!",
      "Você tem certeza que deseja deletar essa sala?",
      [
        { text: "Cancel", onPress: () => {}, style: "cancel" },
        {
          text: "SIM",
          onPress: () =>
            handleDeleteGroup(IdRoom, updateScreen, setUpdateScreen),
        },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteGroup = async (IdRoom, updateScreen, setUpdateScreen) => {
    try {
      const docRef = doc(db, "MESSAGE_THREADS", IdRoom);
      await deleteDoc(docRef);
      setUpdateScreen(!updateScreen); // Atualiza a tela quando o grupo for deletado
    } catch (error) {
      console.log("Erro ao deletar a sala:", error);
      Alert.alert("Erro", "Erro ao deletar a sala. Tente novamente.");
    }
  };

  // Deixar apenas cada usuário criar 4 grupos
  const limitGroups = async (roomName, setVisible, setUpdateScreen) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        console.log("Nenhum usuário logado");
        return;
      }

      // Obtém todos os documentos da coleção MESSEGE_THREADS
      const querySnapshot = await getDocs(collection(db, "MESSAGE_THREADS"));

      // Contador para o número de grupos do usuário
      let myThreads = 0;

      // Itera sobre os documentos e conta os grupos criados pelo usuário
      querySnapshot.docs.forEach((doc) => {
        if (doc.data().owner === user.uid) {
          myThreads += 1;
        }
      });

      // Verifica se o limite foi atingido
      if (myThreads >= 4) {
        alert("Você já atingiu o limite de grupos por usuário.");
      } else {
        createChatRoom(roomName, setVisible, setUpdateScreen);
      }
    } catch (error) {
      console.log("Error ao verificar limite de grupos:", error);
    }
  };

  // Buscando todos grupos criados
  const getChatRoom = async () => {
    try {
      const q = query(
        collection(db, "MESSAGE_THREADS"),
        orderBy("lastMessage.createdAt", "desc"),
        limit(10)
      );
      const querySnapshot = await getDocs(q);
      const response = querySnapshot.docs.map((doc) => ({
        _id: doc.id,
        name: doc.data().name,
        lastMessage: doc.data().lastMessage,
        ...doc.data(),
      }));
      setThreads(response);
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
    }
  };

  const createChatRoom = async (roomName, setVisible, setUpdateScreen) => {
    if (roomName === "") return;

    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.log("Nenhum usuário logado");
      return;
    }

    const user = currentUser.toJSON();
    try {
      const docRef = await addDoc(collection(db, "MESSAGE_THREADS"), {
        name: roomName,
        owner: user.uid,
        lastMessage: {
          text: `Grupo ${roomName} criado. Bem vindo(a)!`,
          createdAt: new Date(),
        },
      });

      await addDoc(collection(db, "MESSAGE_THREADS", docRef.id, "MESSAGES"), {
        text: `Grupo ${roomName} criado. Bem vindo(a)!`,
        createdAt: new Date(),
        system: true,
      });

      setVisible();
      setUpdateScreen();
    } catch (error) {
      console.log("Error creating chat room:", error);
    }
  };

  // Tratando erros de credenciais
  const handleErrorsCredentials = (error, clearInputs) => {
    if (error === "auth/invalid-credential") {
      return Alert.alert(
        "Alerta !!",
        "E-mail ou senha inválido!",
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
        "Este email já está em uso!",
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

  // LogOut
  const LogOut = async () => {
    try {
      await signOut(auth);
      navigation.navigate("SignIn");
    } catch (error) {
      console.log("ERROR AO DESLOGAR USUARIO:", error);
    }
  };

  // Login
  const SignIn = async (data) => {
    setLoading(true);
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      navigation.goBack();
      setLoading(false);
      return userCredentials;
    } catch (error) {
      setLoading(false);
      throw new Error(error.code);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  // Cadastrando
  const SignUp = async (data) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      // Atualizando o perfil do usuário
      await updateProfile(user, {
        displayName: data.nome,
      });

      // Atualizar o estado do usuário
      setCurrentUser(auth.currentUser);

      Alert.alert(
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
        LogOut,
        loading,
        handleErrorsCredentials,
        createChatRoom,
        getChatRoom,
        threads,
        limitGroups,
        deleteGroup,
        currentUser
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
