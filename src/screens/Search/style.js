import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;
export const ContainerInput = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin-bottom: 14px;
  margin-top: 14px;
`;
export const Input = styled.TextInput`
  background-color: #ebebeb;
  margin-left: 10px;
  padding: 10px;
  width: 80%;
  border-radius: 4px;
`;
export const Button = styled.TouchableOpacity`
  background-color: #2e54d4;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  width: 15%;
  margin-left: 7px;
  margin-right: 10px;
`;
