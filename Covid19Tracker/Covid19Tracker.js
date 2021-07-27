import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import TrackerHome from './TrackerHome';
import Statewisedata from './Statewisedata';

export default function Covid19Tracker() {
    const Stack=createStackNavigator();

    return (
        
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="TrackerHome" component={TrackerHome}/>
                <Stack.Screen name="Statewisedata" component={Statewisedata}/>
            </Stack.Navigator>
        
    )
}
