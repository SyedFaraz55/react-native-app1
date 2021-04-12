import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native';
import colors from '../config/constants/colors';
import DropDown from '../components/DropDown';
import DatePickerComponent from '../components/DatePicker';
import InputText from '../components/InputText';

const Invoice = () => {
  const [branchName, setBranch] = useState('');
  const [ird, setIRD] = useState('');
  const [id, setID] = useState('');
  const [lr, setLR] = useState('');
  const [invoiceStatus, setInvoiceStatus] = useState('');
  const [parcelStatus, setparcelStatus] = useState('');
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
        <ScrollView>
          <DropDown
            values={values}
            style={{backgroundColor: colors.light, color: '#6e6c6c'}}
            placeholder="Select Branch Name"
            onChangeItem={item => console.log(item.value)}
          />
          <DropDown
            values={values}
            style={{backgroundColor: colors.light, color: '#6e6c6c'}}
            placeholder="Select Branch Address"
            onChangeItem={item => console.log(item.value)}
          />

          <InputText
            placeholder="Invoice Number"
            style={{backgroundColor: colors.light}}
          />
          <DatePickerComponent
            date={date}
            placeholder="Invoice Received Date"
            mode="date"
            onDateChange={date => {
              setDate(date);
              console.log(date);
            }}
          />
          <DatePickerComponent
            date={date}
            placeholder="Invoice Date"
            mode="date"
            onDateChange={date => {
              console.log(date);
            }}
          />
          <InputText
            placeholder="LR Number"
            style={{backgroundColor: colors.light}}
          />
          <DatePickerComponent
            date={date}
            placeholder="LR Date"
            mode="date"
            onDateChange={date => {
              setDate(date);
              console.log(date);
            }}
          />
          <InputText
            placeholder="Number of parcels"
            style={{backgroundColor: colors.light}}
          />
          <DropDown
            values={values}
            style={{backgroundColor: colors.light, color: '#6e6c6c'}}
            placeholder="Invoice Status"
            onChangeItem={item => console.log(item.value)}
          />
          <DropDown
            values={values}
            style={{backgroundColor: colors.light, color: '#6e6c6c'}}
            placeholder="Parcel Status"
            onChangeItem={item => console.log(item.value)}
          />
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <TouchableNativeFeedback onPress={() => console.log('hello')}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Add Invoice</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  header: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    paddingLeft: 20,
    height: 50,
  },
  section: {
    flex: 12,
    backgroundColor: colors.secondary,
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
  },
  footer: {
    flex: 1,
    padding: 10,
    marginBottom: 30,
    backgroundColor: colors.secondary,
  },

  button: {
    backgroundColor: colors.primary,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginVertical: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default Invoice;
