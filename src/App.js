import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator } from '@react-navigation/drawer'
import Login from './screens/Login';
import DashboardView from './screens/DashboardView';
import Invoice from './screens/Invoice'

import Parcel from './screens/Parcel';
import Search from './screens/Search';
import Edit from './screens/InvoiceView';
import InvoiceEdit from './screens/InvoiceEdit'
import * as eva from '@eva-design/eva';

import { ApplicationProvider } from '@ui-kitten/components';
import ParcelView from './screens/ParcelView';
import ParcelEdit from './screens/ParcelEdit';
const Stack  = createStackNavigator();


const App = ()=> {
 
  return (
     <NavigationContainer>
       <Stack.Navigator>
         <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
         <Stack.Screen name="DashboardView" options={{headerShown: false}} component={DashboardView} />
         <Stack.Screen name="Invoice"  component={Invoice} options={{
           headerStyle:{
             backgroundColor:"#E9C46A"
           }
         }} />
         <Stack.Screen name="Parcel"  component={Parcel} options={{
           headerStyle:{
             backgroundColor:"#E9C46A"
           }
         }} />
         <Stack.Screen name="Search"  component={Search}  options={{
           headerStyle:{
             backgroundColor:"#E9C46A"
           }
         }} />
         <Stack.Screen name="InvoiceView"  component={Edit}  options={{
           headerStyle:{
             backgroundColor:"#E9C46A"
           }
         }} />
          <Stack.Screen name="parcelView"  component={ParcelView}  options={{
           headerStyle:{
             backgroundColor:"#E9C46A"
           }
         }} />
         <Stack.Screen name="InvoiceEdit"  component={InvoiceEdit}  options={{
           headerStyle:{
             backgroundColor:"#E9C46A"
           }
         }} />
          <Stack.Screen name="parcelEdit"  component={ParcelEdit}  options={{
           headerStyle:{
             backgroundColor:"#E9C46A"
           }
         }} />
       </Stack.Navigator>
     </NavigationContainer>
  )
}

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <App />
  </ApplicationProvider>
);

