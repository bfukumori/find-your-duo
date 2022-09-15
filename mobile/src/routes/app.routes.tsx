import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../@types/navigation";

import { Game } from "../screens/Game";
import { Home } from "../screens/Home";

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamsList>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="home">
      <Screen name="home" component={Home} />
      <Screen name="game" component={Game} />
    </Navigator>
  );
}
