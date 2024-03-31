import {RoutesName} from '@app/helper/strings';
import {ChatScreen} from '@app/screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ChatStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={RoutesName.CHAT_LIST_SCREEN}>
      <Stack.Screen name={RoutesName.CHAT_LIST_SCREEN} component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default ChatStackNavigator;
