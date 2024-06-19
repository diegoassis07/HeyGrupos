import { useCallback, useState, useEffect } from "react";
import ChatMessage from "./../../components/ChatMessage";
import { auth, db } from "./../../config/firebaseConnection";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { Feather } from "@expo/vector-icons";
import * as S from "./style";
import * as Native from "react-native";
import { useGlobal } from "../../contexts/contextApi";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const user = auth.currentUser.toJSON();
  const { currentUser } = useGlobal();

  //pegando as mensagens em tempo real
  const getGroups = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, "MESSAGE_THREADS"));
    let threadId = null;
    querySnapshot.forEach((doc) => {
      if (doc.data().owner === user.uid) {
        threadId = doc.id;
      }
    });
    if (!threadId) {
      console.error("Nenhum tópico encontrado para o usuário atual.");
      return;
    }

    const unsubscribe = onSnapshot(
      collection(db, "MESSAGE_THREADS", threadId, "MESSAGES"),
      (querySnapshot2) => {
        let messages = [];
        let data = [];
        querySnapshot2.forEach((doc) => {
          data = doc.data();
          messages.push({ id: doc.id, ...data });
        });

        setMessages(messages);
        if (!data.system) {
          data.user = {
            ...data.user,
            name: currentUser.displayName,
          };
        }
      },
      (error) => {
        console.error("Erro ao buscar mensagens:", error);
      }
    );

    return unsubscribe;
  }, [user.uid]);

  useEffect(() => {
    const unsubscribe = getGroups();

    return () => {
      if (unsubscribe) {
        unsubscribe;
      }
    };
  }, [getGroups]);

  const handleSend = async () => {
    if (inputMessage === "") return;

    try {
      const querySnapshot = await getDocs(collection(db, "MESSAGE_THREADS"));
      let threadId = null;

      // Encontrar o thread do usuário atual
      querySnapshot.forEach((doc) => {
        if (doc.data().owner === user.uid) {
          threadId = doc.id;
        }
      });

      // Verificar se um threadId foi encontrado
      if (!threadId) {
        console.log("Nenhum thread encontrado para o usuário atual.");
        return;
      }
      // Adicionar uma nova mensagem ao thread
      const docRef = await addDoc(
        collection(db, "MESSAGE_THREADS", threadId, "MESSAGES"),
        {
          text: inputMessage,
          createdAt: new Date(),
          user: {
            id: user.uid,
            displayName: currentUser?.displayName,
          },
        }
      );

      // Atualizar a última mensagem no thread
      const updateMessage = doc(db, "MESSAGE_THREADS", threadId);
      await updateDoc(updateMessage, {
        lastMessage: {
          text: inputMessage,
          createdAt: new Date(),
        },
      });

      // Limpar o inputMessage após o envio
      setInputMessage("");
    } catch (error) {
      console.log("Error ao enviar mensagens", error);
    }
  };

  return (
    <Native.SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Native.FlatList
        style={{ width: "100%" }}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatMessage data={item} />}
        inverted={true}
      />
      <S.ContainerInput
        behavior={Native.Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <S.ContentInput>
          <S.Input
            placeholder="Digite sua mensagem..."
            value={inputMessage}
            onChangeText={(text) => setInputMessage(text)}
            multiline={true}
            autoCorrect={false}
          />
        </S.ContentInput>
        <Native.TouchableOpacity onPress={handleSend}>
          <S.ContainerIcon>
            <Feather name="send" size={22} color="#FFF" />
          </S.ContainerIcon>
        </Native.TouchableOpacity>
      </S.ContainerInput>
    </Native.SafeAreaView>
  );
}
