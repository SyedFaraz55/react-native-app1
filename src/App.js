import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator } from '@react-navigation/drawer'
import Login from './screens/Login';
import DashboardView from './screens/DashboardView';
import Invoice from './screens/Invoice'
import Dashboard from './screens/Dashboard';
import Parcel from './screens/Parcel';
import Search from './screens/Search';
import * as eva from '@eva-design/eva';
import store from './store';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
const Stack  = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = ()=> {
  store.dispatch({type:"LOGIN",payload:{
    user:"raju",
    id:1
  }})
  console.log(store.getState())
  return (
     <NavigationContainer>
       <Stack.Navigator>
         <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
         <Stack.Screen name="DashboardView" options={{headerShown: false}} component={DashboardView} />
         <Stack.Screen name="Invoice"  component={Invoice} />
         <Stack.Screen name="Parcel"  component={Parcel} />
         <Stack.Screen name="Search"  component={Search} />
       </Stack.Navigator>
     </NavigationContainer>
  )
}

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <App />
  </ApplicationProvider>
);

