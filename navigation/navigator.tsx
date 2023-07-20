import{NavigationContainer} from '@react-navigation/native';
import{createStackNavigator} from '@react-navigation/stack';
import {View,Text} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Saved from '../screens/Saved';
import Details from '../screens/Details';
 

function HomeScreen(){
    return (
       <tab.Navigator screenOptions={{headerShown: false}}>
        <tab.Screen name="Home" component={Home}></tab.Screen>
        <tab.Screen name="Saved" component={Saved}></tab.Screen>
    
       </tab.Navigator>
    )}
    
    const Stack= createStackNavigator();
    const tab=createBottomTabNavigator();
    
    
    export default function AppNavigator(){
        return (
        <NavigationContainer> 
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="Details" component={Details} />
            </Stack.Navigator>
    
        </NavigationContainer>
        );
     }