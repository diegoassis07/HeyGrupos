import { useMemo } from "react";
import { auth } from "./../../config/firebaseConnection";
import { useGlobal } from "./../../contexts/contextApi";
import * as S from "./style";

export default function ChatMessage({ data }) {
  const user = auth.currentUser.toJSON();
  const { currentUser } = useGlobal();

  const isMyMessage = useMemo(() => {
    return data?.user?.id === user.uid;
  }, [data]);

  return (
    <S.Container>
      <S.messegeBox
        style={{
          backgroundColor: isMyMessage ? "#DCF8C5" : "#fff",
          marginLeft: isMyMessage ? 50 : 0,
          marginRight: isMyMessage ? 0 : 50,
        }}
      >
        {isMyMessage && <S.name>{currentUser?.displayName}</S.name>}
        <S.messege>{data.text}</S.messege>
      </S.messegeBox>
    </S.Container>
  );
}
