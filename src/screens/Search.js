import React from 'react';
import {StyleSheet, View} from 'react-native';
import DropDown from '../components/DropDown';
import InputText from '../components/InputText';
import colors from '../config/constants/colors';


import TabNavigator from '../components/TabNavigator'

export default function Search({route}) {
  const { value } =  route.params.company;
  return (
    
    <TabNavigator id={value} />
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,

    padding:10,
  },
  field:{
    flex:2
  },
  nextField:{
    flex:1
  }
});
