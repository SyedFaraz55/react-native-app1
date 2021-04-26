import React from 'react';
import InvoiceSearch from '../components/InvoiceSearch'
import ParcelSearch from '../components/ParcelSearch';
import TopTabBar from '../components/TopTapBar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const { Navigator, Screen } = createMaterialTopTabNavigator();



const TabNavigator = ({id}) => (
    <Navigator tabBar={props => <TopTabBar {...props}  />}>
      <Screen name='Invoice' component={()=> {
        return <InvoiceSearch id={id} />
      }}/>
      <Screen name='Parcel' component={()=> {
        return <ParcelSearch id={id} />
      }}/>
    </Navigator>
  );

  export default TabNavigator;