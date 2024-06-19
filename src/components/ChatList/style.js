import styled from "styled-components/native";

export const Container = styled.TouchableOpacity``;
export const Row = styled.View`
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
  flex-direction: row;
  align-items: center;
  background-color: rgba(241, 240, 245, 125);
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  border-radius: 3px;
`;
export const Content = styled.View`
  flex-shrink: 1;
`;
export const Header = styled.View`
  flex-direction: row;
`;
export const name = styled.Text`
  font-size: 18px;
  font-family: sans-serif;
  font-weight: bold;
  color: #000;
`;
export const ContentText = styled.Text`
  color: #c1c1c1;
  font-size: 16px;
  margin-top: 2px;
`;
