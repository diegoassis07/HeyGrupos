import { createStackNavigator } from "@react-navigation/stack";

import SignIn from "./../screens/SignIn";
import SignUp from "./../screens/SignUp";
import ChatRoom from "./../screens/chatRoom";
import Chat from "./../screens/Chat";

const Stack = createStackNavigator();
const headerTitleStyle = {
  fontSize: 23,
  fontWeight: 700,
  fontFamily: "sans-serif",
  right: 5,
};
const headerStyle = {
  elevation: 10,
  shadowColor: "#000",
};

export const AppRoutes = () => {
  return (
    <Stack.Navigator initialRouteName="ChatRoom">
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          title: "Faça login",
          headerTitleStyle: headerTitleStyle,
          headerStyle: headerStyle,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: "Faça login",
          headerTitleStyle: headerTitleStyle,
          headerStyle: headerStyle,
        }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{ title: "ChatRoom", headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={({ route }) => ({
          title: route.params?.thread?.name,
        })}
      />
    </Stack.Navigator>
  );
};
