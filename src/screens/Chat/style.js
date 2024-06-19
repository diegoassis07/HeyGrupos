import styled from "styled-components/native";

export const ContainerInput = styled.KeyboardAvoidingView`
  flex-direction: row;
  margin: 10px;
  align-items: flex-end;
`;
export const ContentInput = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  flex: 1;
  border-radius: 25px;
  margin-right: 10px;
`;
export const Input = styled.TextInput`
  flex: 1;
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px;
  max-height: 130px;
  min-height: 48px;
`;
export const ContainerIcon = styled.View`
  background-color: #51c880;
  height: 48px;
  width: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
`;
