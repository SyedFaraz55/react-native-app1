import React, {useState} from 'react';

import {View, Text, StyleSheet} from 'react-native';
import DropDown from '../components/DropDown';
import InputText from '../components/InputText';
import DatePickerComponent from '../components/DatePicker';
import Button from '../components/Button';
import colors from '../config/constants/colors';

const Parcel = () => {
  const [date, setDate] = useState('');
  const values = [
    {
      label: 'Branch 1',
      value: 'usa',
    },
    {
      label: 'Branch 2',
      value: 'usa',
    },
    {
      label: 'Branch 3',
      value: 'usa',
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={{marginBottom: 20}}>
          <DropDown
            values={values}
            style={{backgroundColor: 'white', color: '#6e6c6c'}}
            placeholder="Select Branch Name"
            onChangeItem={item => console.log(item.value)}
          />
        </View>
        <View style={{marginBottom: 20}}>
          <DropDown
            values={values}
            style={{backgroundColor: 'white', color: '#6e6c6c'}}
            placeholder="Select Branch Address"
            onChangeItem={item => console.log(item.value)}
          />
        </View>
        <View style={{marginBottom: 20}}>
          <DropDown
            values={values}
            style={{backgroundColor: 'white', color: '#6e6c6c'}}
            placeholder="Site Name"
            onChangeItem={item => console.log(item.value)}
          />
        </View>
        <View style={{marginBottom: 20}}>
          <DropDown
            values={values}
            style={{backgroundColor: 'white', color: '#6e6c6c'}}
            placeholder="Site Address"
            onChangeItem={item => console.log(item.value)}
          />
        </View>
        <View style={{marginBottom: 20, width: '90%'}}>
          <InputText
            placeholder="LR Number"
            style={{backgroundColor: 'white'}}
          />
        </View>
        <View style={{marginBottom: 20, width: '90%'}}>
          <InputText
            placeholder="Number of parcels"
            style={{backgroundColor: 'white'}}
          />
        </View>
        <View style={{marginBottom: 20}}>
          <DatePickerComponent
            date={date}
            placeholder="Parcel Received Date"
            mode="date"
            onDateChange={date => {
              setDate(date);
              console.log(date);
            }}
          />
        </View>
        <View style={{marginBottom: 20}}>
          <DropDown
            values={values}
            style={{backgroundColor: 'white', color: '#6e6c6c'}}
            placeholder="Parcel Status"
            onChangeItem={item => console.log(item.value)}
          />
        </View>
        <View style={{marginBottom: 20}}>
          <DropDown
            values={values}
            style={{backgroundColor: 'white', color: '#6e6c6c'}}
            placeholder="Remarks"
            onChangeItem={item => console.log(item.value)}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <Button title="Add Parcel" style={{width:"100%"}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  section: {
    flex: 8,
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
  },
  footer: {
    flex: 1,
    padding: 10,
  },
});

export default Parcel;
