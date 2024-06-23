import { auth } from "./../../config/firebaseConnection";
import * as Native from "react-native";
import * as S from "./style";

export default function ChatMessage({ data }) {
  const USER = auth.currentUser.toJSON();
  const IS_MY_MESSAGE = data?.user?.displayName === USER?.displayName;
  const STYLE_OF_MESSAGE_BOX = {
    backgroundColor: IS_MY_MESSAGE ? "#DCF8C5" : "#fff",
    marginLeft: IS_MY_MESSAGE ? 50 : 0,
    marginRight: IS_MY_MESSAGE ? 0 : 50,
  };

  return (
    <S.Container>
      <S.MessegeBox style={STYLE_OF_MESSAGE_BOX}>
        {data.textSystem && <Native.Text>{data.textSystem}</Native.Text>}

        {!IS_MY_MESSAGE && !data.system && (
          <S.Name>{data?.user?.displayName}</S.Name>
        )}

        {!data?.system && <Native.Text>{data.text}</Native.Text>}
      </S.MessegeBox>
    </S.Container>
  );
}
