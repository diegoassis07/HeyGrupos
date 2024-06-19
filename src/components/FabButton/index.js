import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as S from "./style";

export default function FabButton({ setVisible, userStatus }) {
  const navigation = useNavigation();

  const handleFabButton = () => {
    if (userStatus) {
      setVisible();
    } else {
      return Alert.alert(
        "Alerta !!",
        "Para criar um novo grupo você precisa fazer o login no app!",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("SignIn"),
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <S.FabButton activeOpacity={0.9} onPress={handleFabButton}>
      <FontAwesome5 name="plus" size={24} color="#fff" />
    </S.FabButton>
  );
}
