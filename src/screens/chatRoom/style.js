import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
`;
export const HeaderChatRoom = styled.View`
  background-color: #2e54d4;
  border-radius: 0px 0px 25px 25px;
  flex-direction: row;
  margin-top: 6.1%;
  justify-content: space-between;
  padding: 37px;
  padding-bottom: 23px;
  align-items: center;
`;

export const ButtonBack = styled.TouchableOpacity`
  right: 27px;
`;
export const Title = styled.Text`
  font-size: 32px;
  font-family: sans-serif;
  font-weight: bold;
  color: #fff;
  right: 88px;
`;
export const Search = styled.TouchableOpacity`
  left: 27px;
`;
