import { useNavigation } from "@react-navigation/native";
import * as S from "./style";

export default function ChatList({ data, deleteRoom, userStatus }) {
  const navigation = useNavigation();

  const openChat = () => {
    if (userStatus) {
      navigation.navigate("Chat", { thread: data });
      return;
    } else {
      navigation.navigate("SignIn");
    }
  };
  return (
    <S.Container onPress={openChat} onLongPress={() => deleteRoom()}>
      <S.Row>
        <S.Content>
          <S.Header>
            <S.name numberOfLines={1}>{data.name}</S.name>
          </S.Header>
          <S.ContentText numberOfLines={1}>
            {data.lastMessage.text}
          </S.ContentText>
        </S.Content>
      </S.Row>
    </S.Container>
  );
}
