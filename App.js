import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Covid19Tracker from './Covid19Tracker/Covid19Tracker';
import Covid19VaccineTracker from './Covid19VaccineTracker/Covid19VaccineTracker';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DeveloperContact from './DeveloperContact/DeveloperContact';
import { Fontisto , MaterialIcons } from '@expo/vector-icons';

export default function App() {
  const Bottomtab= createMaterialBottomTabNavigator();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Bottomtab.Navigator
          initialRouteName="Covid19Tracker"
          activeColor="black"
          barStyle={{ backgroundColor: 'white' }}
          
        >
          <Bottomtab.Screen name="Covid19 Tracker"
            component={Covid19Tracker}
            options={{
              tabBarLabel: 'Covid19 Tracker',
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="coronavirus" size={24} color="#ff6c5e" />
              ),
            }}
          />
          <Bottomtab.Screen name="Covid19 Vaccine Tracker"
            component={Covid19VaccineTracker}
            options={{
              tabBarLabel: 'Vaccine Tracker',
              tabBarIcon: ({ color }) => (
                <Fontisto name="injection-syringe" size={24} color="dodgerblue"/>
              ),
            }}
          />
          <Bottomtab.Screen name="Developer Contact"
            component={DeveloperContact}
            options={{
              tabBarLabel: 'Contact Us',
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="contact-page" size={24} color="grey" />
              ),
            }}
          />
        </Bottomtab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

