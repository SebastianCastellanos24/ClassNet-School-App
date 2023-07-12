import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './components/SplashScreen';
import Login from './components/Login';
import Main from './components/Main';
import React, { useState } from 'react';

export const Context = React.createContext();

export default function App() {
  const Stack = createStackNavigator();
  const [valueInput, setValueInput] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <NavigationContainer>
      <Context.Provider value={[ valueInput, setValueInput, loggedIn, setLoggedIn ]}>
        <Stack.Navigator initialRouteName='Intro'>
          <Stack.Screen name='Lógica y Software' component={SplashScreen} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name='Login' component={Login} options={{headerLeft: () => null, headerShown: false}}></Stack.Screen>
          <Stack.Screen name='Main' component={Main} options={{headerLeft: () => null, headerShown: false }}></Stack.Screen>
        </Stack.Navigator>
      </Context.Provider>
    </NavigationContainer>
  );
}