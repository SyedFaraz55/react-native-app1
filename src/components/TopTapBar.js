import React from 'react';

import { TabBar, Tab, Layout, Text } from '@ui-kitten/components';
const TopTabBar = ({ navigation, state }) => (
    <TabBar
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <Tab title='Invoice' style={{borderBottomColor:"#000"}}/>
      <Tab title='Parcels'/>
    </TabBar>
  );  
export default TopTabBar;  