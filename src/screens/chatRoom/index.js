import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { auth } from "./../../config/firebaseConnection";
import { signOut } from "firebase/auth";
import * as Native from "react-native";
import * as S from "./style";

export default function ChatRoom() {
  const navigation = useNavigation();

  const LogOut = async () => {
    try {
      const response = await signOut(auth).then(() => {
        navigation.navigate("SignIn");
        return response;
      });
    } catch (error) {
      console.log("ERROR AO DESLOGAR USUARIO:", error);
    }
  };

  return (
    <S.Container>
      <S.HeaderChatRoom>
        <S.ButtonBack onPress={LogOut}>
          <AntDesign name="arrowleft" size={30} color="#FFF" />
        </S.ButtonBack>
        <S.Title>Grupos</S.Title>
        <S.Search>
          <Feather name="search" size={29} color="#FFF" />
        </S.Search>
      </S.HeaderChatRoom>
    </S.Container>
  );
}
