import React from "react";
import { View, Text, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import LoginScreen from './App/Telas/Login';
import ChatbotScreen from "./App/Telas/Chatbot";
import AjudaScreen from "./App/Telas/Ajuda";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer initialRouteName ="Login">
      <Stack.Navigator>
        <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{title: 'Login'}} 
        />
        <Stack.Screen 
        name="Chatbot" 
        component={ChatbotScreen}
        options={{title: 'Chatbot'}} 
        />
        <Stack.Screen 
        name="Ajuda" 
        component={AjudaScreen}
        options={{title: 'Ajuda'}} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


