import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import Auth from './src/navigation/Auth';
import MenuNavigation from './src/navigation/MenuNavigation';

const Stack = createNativeStackNavigator();
function App() {
  return (
    //CREATE NAVIGATION 
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ orientation: "all", headerShown: false }} initialRouteName='Auth'>
        <Stack.Screen name='Auth' component={Auth} />
        <Stack.Screen name='MenuNavigation' component={MenuNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App