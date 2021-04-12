import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator } from '@react-navigation/drawer'
import DasboardView from '../screens/DashboardView'
import Invoice from './Invoice';
const Drawer = createDrawerNavigator()
const Dashboard = ()=> {
    return (
        <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Dashboard"  component={DasboardView} />
          <Drawer.Screen name="Invoice"  component={Invoice} />
        </Drawer.Navigator>
      </NavigationContainer>
    )
}


export default Dashboard;