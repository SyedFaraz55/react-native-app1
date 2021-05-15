import React, { useState,useEffect } from 'react';
import {StyleSheet,  View, ScrollView, Alert} from 'react-native';
import {Formik} from 'formik';
import DropDown from '../components/DropDown';
import {Input, Text, Datepicker, Layout, Spinner} from '@ui-kitten/components';
import Button from '../components/Button';
import axios from 'axios';
export default function InvoiceEdit({route}) {
  const [transportCode, setTransportCode] = useState();
  const {invoiceNumber,invoiceDate,lrnumber}= route.params.data
  const [inumber,setInvoiceNumber] = useState(invoiceNumber)
  const [irdate,setInvoiceRDate] = useState(new Date(invoiceDate))
  const [supplierCommunications, setSuppliers] = useState([]);
  const [lr,setLr] = useState(lrnumber)
  const [branchCode, setBranchCode] = useState();
  const [idate,setIdate] = useState();
  let values = [];
  let suppliers = [];
  let transporter = [];
  const [supplierCommunication, setSupplierCommunication] = useState();
  const [supplierCode,setSupplierCode] = useState();
  const [transporterCommunications,setTransportCommunication] = useState();
  const [lrdate,setLRDate] = useState();
  const [parcels,setNumberofParcels] = useState('');
  const [branches,setBranchCommunication] = useState();
  const [status,setStatus] = useState([])
  const [statusValue,setInvoiceStatus] = useState();

  const fetchStatus = () => {
    axios
      .get('https://test.picktech.in/api/Definition/GetAllStatus')
      .then(response => {
        const values = response.data.map(ele => ({
          label: ele.name,
          value: ele.id,
        }));

        setStatus(values);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchStatus();
  }, )

  const filterBranchCommunications = ()=> {}
  const filterTransportCommunications = ()=> {}
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
                    date={irdate}
                    onSelect={nextDate => {
                      //    setIRDate(convertDate(nextDate));
                      //    setInvoiceReceiveDate(nextDate)
                      console.log(nextDate);
                      setInvoiceRDate(nextDate)
                    }}
                  />
                </View>
                <View style={styles.group}>
                  <Datepicker
                    placeholder="Invoice Date"
                    date={idate}
                    onSelect={nextDate => {
                      //    setIRDate(convertDate(nextDate));
                      //    setInvoiceReceiveDate(nextDate)
                      console.log(nextDate);
                      setIdate(nextDate)
                    }}
                  />
                </View>
                <View style={styles.group}>
                  <Datepicker
                    placeholder="LR Date"
                    date={lrdate}
                    onSelect={nextDate => {
                      //    setIRDate(convertDate(nextDate));
                      //    setInvoiceReceiveDate(nextDate)
                      console.log(nextDate);
                      setLRDate(nextDate)
                    }}
                  />
                </View>
                <View style={styles.group}>
                  <Input
                    value={parcels}
                    placeholder="No of parcels"
                    onChangeText={text => setNumberofParcels(text)}
                  />
                </View>
                <View style={styles.group}>
                 
                 <DropDown

                   values={status}
                   style={{backgroundColor: 'white', color: '#6e6c6c', width:"100%"}}
                   placeholder="Invoice Status"
                   onChangeItem={value => setInvoiceStatus(value.value)}
                 />
               </View>
               <View style={styles.group}>
                     
                      <DropDown
                        values={values}
                        style={{backgroundColor: 'white', color: '#6e6c6c'}}
                        placeholder="Branch Code"
                        onChangeItem={value =>{ 
                          setBranchCode(value.value) 
                          filterBranchCommunications(value.value)
                          console.log(value.value)

                        }}
                      />
                    </View>
               <View style={styles.group}>
                     
                     <DropDown
                        values={branches}
                        style={{backgroundColor: 'white', color: '#6e6c6c'}}
                        placeholder="Branch Communication"
                        onChangeItem={value => {

                          setBranchCommunication(value.value)
                          console.log('branch Comm >> ', value)
                        }
                        }
                      />
                    </View>
                    <View style={styles.group}>
                     
                      <DropDown
                        values={suppliers}
                        style={{backgroundColor: 'white', color: '#6e6c6c'}}
                        placeholder="Supplier Code"
                        onChangeItem={value => {
                          filterSupplierCommunications(value.value);
                          setSupplierCode(value.value);
                        }}
                      />
                    </View>
                    <View style={styles.group}>
                    
                      <DropDown
                        values={supplierCommunications}
                        style={{backgroundColor: 'white', color: '#6e6c6c'}}
                        placeholder="Supplier Communication"
                        onChangeItem={value =>
                          setSupplierCommunication(value.value)
                        }
                      />
                    </View>
                    <View style={styles.group}>
                    
                    <DropDown
                      values={transporter}
                      style={{backgroundColor: 'white', color: '#6e6c6c'}}
                      placeholder="Transporter Code"
                      onChangeItem={value => {
                        filterTransportCommunications(value.value);
                        setTransportCode(value.value);
                      }}
                    />
                  </View>
                  <View style={styles.group}>
                      
                      <DropDown
                        values={transporterCommunications}
                        style={{backgroundColor: 'white', color: '#6e6c6c'}}
                        placeholder="Transporter Communication"
                        onChangeItem={value =>
                          setTransportCommunication(value.value)
                        }
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
