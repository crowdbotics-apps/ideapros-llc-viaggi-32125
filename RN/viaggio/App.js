import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, ScrollView, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Splash from './screens/Splash';
import SignUp from './screens/SignUp';
import LogIn from './screens/LogIn';
import ForgotPassword from './screens/ForgotPassword';
import Verification from './screens/Verification';
import ResetPassword from './screens/ResetPassword';
import CreateProfile_1 from './screens/CreateProfile_1';
import CreateProfile_2 from './screens/CreateProfile_2';
import CreateProfile_3 from './screens/CreateProfile_3';
import Interests from './screens/Interests';
import Location from './screens/Location';
import Onboarding_1 from './screens/Onboarding_1';
import Onboarding_2 from './screens/Onboarding_2';
import Onboarding_3 from './screens/Onboarding_3';


LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

function HomeScreen({ navigation }) {
  return (
    <ScrollView>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Automate</Text>        
      </View>
    </ScrollView>
  );
}


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LogIn">
      <Stack.Screen
        name="LogIn"
        component={LogIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Splash" component={Splash}  options={{ headerShown: false }}/>
        <Stack.Screen name="Auth" component={Auth} options={{headerShown: false}}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}}/>
        <Stack.Screen name="Verification" component={Verification} options={{headerShown: false}}/>
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{headerShown: false}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
        <Stack.Screen name="CreateProfile_1" component={CreateProfile_1} options={{headerShown: false}}/>
        <Stack.Screen name="CreateProfile_2" component={CreateProfile_2} options={{headerShown: false}}/>
        <Stack.Screen name="CreateProfile_3" component={CreateProfile_3} options={{headerShown: false}}/>
        <Stack.Screen name="Interests" component={Interests} options={{headerShown: false}}/>
        <Stack.Screen name="Location" component={Location} options={{headerShown: false}}/>
        <Stack.Screen name="Onboarding_1" component={Onboarding_1} options={{headerShown: false}}/>
        <Stack.Screen name="Onboarding_2" component={Onboarding_2} options={{headerShown: false}}/>
        <Stack.Screen name="Onboarding_3" component={Onboarding_3} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

