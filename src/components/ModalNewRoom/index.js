import { useState } from "react";
import { useGlobal } from "../../contexts/contextApi";
import * as Native from "react-native";
import * as S from "./styles";

export default function ModalNewRoom({ setVisible, setUpdateScreen }) {
  const [roomName, setRoomName] = useState("");
  const { limitGroups } = useGlobal();

  const handleCreateChatRoom = () => {
    limitGroups(roomName, setVisible, setUpdateScreen);
  };

  return (
    <Native.TouchableWithoutFeedback onPress={() => setVisible(false)}>
      <S.ModalContainer>
        <S.ModalContent
          style={{
            shadowOffset: { width: 0, height: -4 },
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 20,
            elevation: 20,
          }}
        >
          <S.Title>Criar um novo grupo?</S.Title>
          <S.Input
            placeholder="Nome para sua sala?"
            value={roomName}
            onChangeText={(text) => setRoomName(text)}
          />
          <S.Button onPress={handleCreateChatRoom}>
            <S.ButtonText>Criar sala</S.ButtonText>
          </S.Button>
          <S.Button
            width="40%"
            backgroundColor=" #f64B57 "
            padding="9px"
            onPress={() => setVisible()}
          >
            <S.ButtonText>Cancelar</S.ButtonText>
          </S.Button>
        </S.ModalContent>
      </S.ModalContainer>
    </Native.TouchableWithoutFeedback>
  );
}
