import React, { useState } from 'react';
import {StyleSheet,  View, ScrollView, Alert} from 'react-native';
import {Formik} from 'formik';
import DropDown from '../components/DropDown';
import {Input, Text, Datepicker, Layout, Spinner} from '@ui-kitten/components';
import Button from '../components/Button';
export default function InvoiceEdit({route}) {
  const {invoiceNumber,invoiceDate,lrnumber}= route.params.data
  const [inumber,setInvoiceNumber] = useState(invoiceNumber)
  const [idate,setInvoiceDate] = useState(new Date(invoiceDate))
  const [lr,setLr] = useState(lrnumber)
  return (
    <View style={{flex:1,padding:12,backgroundColor:"#fff"}}>
      <Formik
        initialValues={{invoiceNumber: '', lrNumber: ''}}
        onSubmit={values => console.log(values)}>
        {({handleSubmit, handleChange}) => (
          <>
            <ScrollView>
              <View style={{marginTop: 10}}>
                <View style={styles.group}>
                  <Input
                    value={inumber}
                    placeholder="Invoice Number"
                    onChangeText={text => setInvoiceNumber(text)}
                  />
                </View>
                <View style={styles.group}>
                  <Input
                  value={lr}
                    placeholder="LR Number"
                    onChangeText={text => setLr(text)}
                  />
                </View>
                <View style={styles.group}>
                  <Datepicker
                    placeholder="Invoice Received Date"
                    date={idate}
                    onSelect={nextDate => {
                      //    setIRDate(convertDate(nextDate));
                      //    setInvoiceReceiveDate(nextDate)
                      console.log(nextDate);
                      setInvoiceDate(nextDate)
                    }}
                  />
                </View>
              </View>

              <View style={{marginTop: 10}}>
              <Button
                    title="Edit Invoice"
                    style={{
                      width: '100%',
                      padding: 0,
                      backgroundColor: '#000',
                      color: '#000',
                    }}
                    onPress={() =>
                      Alert.alert(
                        'Underprocess',
                        'This feature is not avaliable now',
                      )
                    }
                  />
              </View>
            </ScrollView>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    marginTop: 10,
    width: '100%',
  },
});
