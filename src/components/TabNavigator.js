import React from 'react';
import InvoiceSearch from '../components/InvoiceSearch'
import ParcelSearch from '../components/ParcelSearch';
import TopTabBar from '../components/TopTapBar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const { Navigator, Screen } = createMaterialTopTabNavigator();



const TabNavigator = () => (
    <Navigator tabBar={props => <TopTabBar {...props}  />}>
      <Screen name='Invoice' component={InvoiceSearch} />
      <Screen name='Parcel' component={ParcelSearch}/>
    </Navigator>
  );

  export default TabNavigator;