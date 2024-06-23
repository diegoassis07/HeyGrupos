import { auth, db } from "./../../config/firebaseConnection";
import { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { collection, query, where, getDocs } from "firebase/firestore";
import ChatList from "./../../components/ChatList";
import * as Native from "react-native";
import * as S from "./style";

export default function Search() {
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const user = auth.currentUser;
    setUser(user);
  }, [isFocused]);

  const handleSearch = async () => {
    if (input === "") return;
    setInput("");
    Native.Keyboard.dismiss();
    try {
      const q = query(
        collection(db, "MESSAGE_THREADS"),
        where("name", ">=", input),
        where("name", "<=", input + "\uf8ff") /* + \uf8ff */
      );
      const querySnapshot = await getDocs(q);
      const threads = querySnapshot.docs.map((doc) => {
        return {
          _id: doc.id,
          name: "",
          lastMessage: { text: "" },
          ...doc.data(),
        };
      });
      setChats(threads);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <S.Container>
      <S.ContainerInput>
        <S.Input
          placeholder="Digite o nome da sala?"
          value={input}
          onChangeText={(t) => setInput(t)}
          autoCapitalize={"none"}
        />
        <S.Button onPress={handleSearch}>
          <Feather name="search" size={25} color="#FFF" />
        </S.Button>
      </S.ContainerInput>
      <Native.FlatList
        data={chats}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ChatList data={item} userStatus={user} />}
        showVerticalScrollIndicator={false}
      />
    </S.Container>
  );
}
