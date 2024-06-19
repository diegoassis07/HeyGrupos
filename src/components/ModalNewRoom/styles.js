import styled from "styled-components/native";

export const ModalContainer = styled.View`
  flex: 1;
  width: 100%;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
  background-color: #fff;
  width: 100%;
  height: 300px;
  align-items: center;
  padding-top: 30px;
`;

export const Title = styled.Text`
  font-size: 23px;
  font-family: sans-serif;
  font-weight: bold;
  color: #000;
  margin-bottom: 15px;
`;

export const Input = styled.TextInput`
  width: 90%;
  background-color: #ddd;
  padding: 11px;
  border-radius: 5px;
  margin-bottom: 15px;
`;

export const Button = styled.TouchableOpacity`
  width: ${({ width }) => width || "90%"};
  padding: ${({ padding }) => padding || "10px"};
  background-color: ${({ backgroundColor }) => backgroundColor || "#2e54d4"};
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
