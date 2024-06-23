import { useCallback, useState, useEffect } from "react";
import ChatMessage from "./../../components/ChatMessage";
import { auth, db } from "./../../config/firebaseConnection";
import {
  collection,
  onSnapshot,
  addDoc,
  orderBy,
  doc,
  updateDoc,
  query,
  Timestamp,
} from "firebase/firestore";
import { Feather } from "@expo/vector-icons";
import * as S from "./style";
import * as Native from "react-native";
import { useGlobal } from "../../contexts/contextApi";

export default function Chat({ route }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const user = auth.currentUser.toJSON();
  const { currentUser } = useGlobal();
  const CURRENT_THREAD = route.params?.thread; // coleção do lastMessage

  // pegando as mensagens em tempo real
  const getGroups = useCallback(async () => {
    if (!CURRENT_THREAD._id) {
      console.error("Nenhum tópico encontrado para o usuário atual.");
      return;
    }
    console.log("Aqqq");

    const unsubscribe = onSnapshot(
      query(
        collection(db, "MESSAGE_THREADS", CURRENT_THREAD._id, "MESSAGES"),
        orderBy("createdAt", "asc")
      ),
      (querySnapshot) => {
        let messages = [];
        let data = [];
        querySnapshot.forEach((doc) => {
          data = doc.data();
          messages.push({ id: doc.id, ...data });
        });

        setMessages(messages.reverse());
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
  }, [user.uid === CURRENT_THREAD._id]);

  const addNewMessageToThread = async () => {
    try {
      const MESSAGE_TO_THREAD = {
        text: inputMessage,
        createdAt: Timestamp.fromDate(new Date()),
        user: {
          id: user.uid,
          displayName: currentUser?.displayName,
        },
      };

      const COLLECTION_REF_MESSAGES = collection(
        db,
        "MESSAGE_THREADS",
        CURRENT_THREAD._id,
        "MESSAGES"
      );

      await addDoc(COLLECTION_REF_MESSAGES, MESSAGE_TO_THREAD);
    } catch (error) {
      console.error("Erro no add New", error);
    }
  };

  const updateLatestMessageInToThread = async () => {
    const DOC_REF_TO_UPDATE = doc(db, "MESSAGE_THREADS", CURRENT_THREAD._id);

    const LATEST_MESSAGE = {
      lastMessage: {
        text: inputMessage,
        createdAt: Timestamp.fromDate(new Date()),
      },
    };

    await updateDoc(DOC_REF_TO_UPDATE, LATEST_MESSAGE);
  };

  const handleSendNewMessage = async () => {
    if (inputMessage === "") return;
    setInputMessage("");
    Native.Keyboard.dismiss();

    try {
      if (!CURRENT_THREAD) return;

      await Promise.all([
        addNewMessageToThread(),
        updateLatestMessageInToThread(),
      ]);
    } catch (error) {
      console.error("Error ao enviar mensagens", error);
    }
  };

  useEffect(() => {
    const unsubscribe = getGroups();

    return () => {
      if (unsubscribe && typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [getGroups]);

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
            onChangeText={(t) => setInputMessage(t)}
            multiline={true}
            autoCorrect={false}
          />
        </S.ContentInput>
        <Native.TouchableOpacity onPress={async () => handleSendNewMessage()}>
          <S.ContainerIcon>
            <Feather name="send" size={22} color="#FFF" />
          </S.ContainerIcon>
        </Native.TouchableOpacity>
      </S.ContainerInput>
    </Native.SafeAreaView>
  );
}
