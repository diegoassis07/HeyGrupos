import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

export const HeaderChatRoom = styled.View`
  background-color: #2e54d4;
  border-radius: 0px 0px 20px 20px;
  flex-direction: row;
  margin-top: 6.1%;
  justify-content: space-between;
  padding: 36px;
  padding-bottom: 23px;
  align-items: center;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  right: 25px;
  gap: 10px;
`;

export const ButtonBack = styled.TouchableOpacity`
  /* margin-right: 15px; */
`;

export const Title = styled.Text`
  font-size: 30px;
  font-family: sans-serif;
  font-weight: bold;
  color: #fff;
`;

export const Search = styled.TouchableOpacity`
  left: 20px;
`;
