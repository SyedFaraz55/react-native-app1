import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DropDown from '../components/DropDown';
import InputText from '../components/InputText';
import colors from '../config/constants/colors';

export default function Search() {
  const values = [
    {
      label: 'Invoice',
      value: 'invoice',
    },
    {
      label: 'Parcel',
      value: 'parcel',
    }
  ];
  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <InputText keyboardType="number-pad" placeholder="Search" style={{backgroundColor: 'white',height:40}} />
      </View>
      <View style={styles.nextField}>
        <DropDown
          values={values}
          style={{width:110,marginLeft:8,backgroundColor: 'white', color: '#6e6c6c'}}
          placeholder="Search By"
          onChangeItem={item => console.log(item.value)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.secondary,
    justifyContent:"center",
    padding:10,
  },
  field:{
    flex:2
  },
  nextField:{
    flex:1
  }
});
