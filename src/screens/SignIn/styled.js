import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 35px;
  font-weight: bold;
  color: #000000;
`;

export const Label = styled.Text`
  font-size: 15px;
  margin-top: 5px;
  margin-bottom: 40px;
`;

export const ContainerInput = styled.KeyboardAvoidingView`
  width: 100%;
  align-items: center;
`;
export const ContentInputEmail = styled.View`
  width: 90%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
  background-color: #dcdcdc;
  border-radius: 4px;
  padding: 10px;
`;

export const Input = styled.TextInput`
  flex: 1;
  margin-left: 10px;
`;

export const ContentInputPassword = styled(ContentInputEmail)`
  /* Estendendo os estilos do ContentInputEmail */
`;

export const Button = styled.TouchableOpacity`
  width: 90%;
  padding: 10px;
  background-color: #51c880;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-size: 20px;
  font-family: sans-serif;
  font-weight: 700;
  color: #fff;
`;

export const Link = styled.Text`
  font-size: 15px;
  font-family: sans-serif;
  font-weight: 600;
  color: #000;
  margin-top: 10px;
`;
export const ContentError = styled.View`
  width: 90%;
  bottom: 10px;
`;
export const Error = styled.Text`
  font-size: 17px;
  color: #f64b57;
`;
