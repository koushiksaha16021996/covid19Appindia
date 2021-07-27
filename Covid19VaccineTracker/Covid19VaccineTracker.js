import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VaccineHome from './VaccineHome';
import VisitHospital from './VisitHospital';

export default function Covid19VaccineTracker() {
    
    const Stack=createStackNavigator();
    return (
        
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="VaccineHome" component={VaccineHome}/>
                <Stack.Screen name="VisitHospital" component={VisitHospital}/>
            </Stack.Navigator>
        
    )
        
}
