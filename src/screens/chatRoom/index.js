import { useIsFocused } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { auth } from "./../../config/firebaseConnection";
import { useGlobal } from "../../contexts/contextApi";
import { useState, useEffect } from "react";
import FabButton from "../../components/FabButton";
import ModalNewRoom from "../../components/ModalNewRoom";
import ChatList from "../../components/ChatList";
import * as Native from "react-native";
import * as S from "./style";

export default function ChatRoom() {
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [updateScreen, setUpdateScreen] = useState(false);
  const { LogOut, getChatRoom, threads, deleteGroup, loading } = useGlobal();
  const isFocused = useIsFocused();

  //verificando se tem usuario logado
  useEffect(() => {
    const hasUser = auth.currentUser ? auth.currentUser.toJSON() : null;
    setUser(hasUser);
  }, [isFocused]);

  useEffect(() => {
    getChatRoom();
  }, [updateScreen]);

  if (loading) {
    return (
      <Native.View
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Native.ActivityIndicator size="large" color="#555" />
      </Native.View>
    );
  }

  return (
    <S.Container>
      <S.HeaderChatRoom>
        <S.HeaderContent>
          {user && (
            <S.ButtonBack onPress={() => LogOut()}>
              <AntDesign name="arrowleft" size={30} color="#FFF" />
            </S.ButtonBack>
          )}
          <S.Title>Grupos</S.Title>
        </S.HeaderContent>
        <S.Search>
          <Feather name="search" size={29} color="#FFF" />
        </S.Search>
      </S.HeaderChatRoom>

      <Native.FlatList
        data={threads}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ChatList
            data={item}
            deleteRoom={() =>
              deleteGroup(item.owner, item._id, updateScreen, setUpdateScreen)
            }
            userStatus={user}
          />
        )}
      />

      <FabButton setVisible={() => setModalVisible(true)} userStatus={user} />
      <Native.Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
      >
        <ModalNewRoom
          setVisible={() => setModalVisible(false)}
          setUpdateScreen={() => setUpdateScreen(!updateScreen)}
        />
      </Native.Modal>
    </S.Container>
  );
}
