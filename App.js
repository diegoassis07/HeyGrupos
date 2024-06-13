import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Routes } from "./src/routes/index";
import { AuthProvider } from "./src/contexts/contextApi";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar style="light" backgroundColor="#7c7c7c" />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
