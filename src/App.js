import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator } from '@react-navigation/drawer'
import Login from './screens/Login';
import DashboardView from './screens/DashboardView';
import Invoice from './screens/Invoice'
import Dashboard from './screens/Dashboard';
import Parcel from './screens/Parcel';

const Stack  = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = ()=> {
  return (
     <NavigationContainer>
       <Stack.Navigator>
         <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
         <Stack.Screen name="DashboardView" options={{headerShown: false}} component={DashboardView} />
         <Stack.Screen name="Invoice"  component={Invoice} />
         <Stack.Screen name="Parcel"  component={Parcel} />
       </Stack.Navigator>
     </NavigationContainer>
  )
}

export default App;

