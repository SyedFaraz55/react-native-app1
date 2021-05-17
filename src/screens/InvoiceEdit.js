import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Alert} from 'react-native';
import {Formik} from 'formik';
import DropDown from '../components/DropDown';
import {Input, Text, Datepicker, Layout, Spinner} from '@ui-kitten/components';
import Button from '../components/Button';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
export default function InvoiceEdit({route}) {
  const {invoiceNumber, invoiceDate, lrnumber} = route.params.data;
  
  const [inumber, setInvoiceNumber] = useState(invoiceNumber);
  const [irdate, setInvoiceRDate] = useState(new Date(invoiceDate));
  const [supplierCommunications, setSuppliers] = useState([]);
  const [lr, setLr] = useState(lrnumber);
  const [branchCode, setBranchCode] = useState();
  const [idate, setIdate] = useState();
  const [values, setValues] = useState([]);
  const [data, setData] = useState([]);
  const [transportCode, setTransportCode] = useState();
  const [transporterCommunications, setTransporters] = useState([]);
  let suppliers = [];
  let transporter = [];
  const [supplierCommunication, setSupplierCommunication] = useState();
  const [supplierCode, setSupplierCode] = useState();
  const [transporterCommunication, setTransportCommunication] = useState([]);
  const [lrdate, setLRDate] = useState();
  const [parcels, setNumberofParcels] = useState('');
  const [branches, setBranches] = useState([]);
  const [branchCommunication, setBranchCommunication] = useState();
  const [status, setStatus] = useState([]);
  const [statusValue, setInvoiceStatus] = useState();

  const filterBranchCommunications = key => {
    const results = [];
    const seen = new Set();
    const branchCommunication = data.map(item => item.branchCommunication);

    if (branchCommunication.length == 1) {
      branchCommunication.map(item => {
        item.map(item => {
          const {id} = item;
          const {
            addressLine1,
            addressLine2,
            cityId,
          } = item.communication.address;
          results.push({
            value: id,
            label: `${addressLine1} ${addressLine2} ${cityId}`,
          });
        });
      });
      setBranches(results);
    } else {
      const filtered = data.filter(id => id.branchId == key);
      filtered.forEach(item => {
        item.branchCommunication.map(item => {
          const {id} = item;
          const {
            addressLine1,
            addressLine2,
            cityId,
          } = item.communication.address;
          results.push({
            value: id,
            label: `${addressLine1} ${addressLine2} ${cityId}`,
          });
        });
      });
      setBranches(results);
    }
  };

  data.forEach(item => {
    item.branchSupplier.map(item => {
      const {id, code} = item.supplier;
      item.supplier.supplierCommunication.forEach(communication => {
        const {
          addressLine1,
          addressLine2,
          cityId,
          id,
        } = communication.communication.address;
      });
      suppliers.push({
        value: id,
        label: code,
      });
    });
    // for transporter
    item.branchTransporter.map(item => {
      const {id, code} = item.transporter;
      transporter.push({
        value: id,
        label: code,
      });
    });
  });

  const filterTransportCommunications = key => {

    let final = [];

    let result = [];
    data.forEach(item => {

      result = item.branchTransporter.filter(item => {
        return item.transporter.id == key;
      });
    });

    result.map(item => {
      item.transporter.transporterCommunication.map(item => {
        const {id} = item;
        const {
          addressLine1,
          addressLine2,
          cityId,
        } = item.communication.address;
        final.push({
          value: id,
          label: addressLine1 + ' ' + addressLine2 + ' ' + cityId,
        });
      });
    });

    setTransporters(final);
  };

  const filterSupplierCommunications = key => {
    let final = [];

    console.log(key);
    let results = [];
    data.forEach(item => {
      results = item.branchSupplier.filter(item => {
        return item.supplier.id == key;
      });
    });

    console.log(results, 'supplier');
    results.map(item => {
      item.supplier.supplierCommunication.map(item => {
        const {id} = item;
        const {addressLine1, addressLine2, cityId} = item.communication.address;
        final.push({
          value: id,
          label: addressLine1 + ' ' + addressLine2 + ' ' + cityId,
        });
      });
    });

    setSuppliers(final);
  };

  useEffect(async () => {
    const resp = await AsyncStorage.getItem('status');
    const status = await resp;
    setStatus(JSON.parse(status));

    const response = await AsyncStorage.getItem('state');
    const data = await response;

    setData(JSON.parse(data));
  }, []);

  useEffect(() => {
    if (data) {
      const values = data.map(ele => {
        return Object.assign({}, {label: ele.branchCode, value: ele.branchId});
      });

      setValues(values);
      console.log(values);
      filterBranchCommunications();
      if (values.length == 1) {
        setBranchCode(values[0].value);
      }
    }
  }, [data]);

  useEffect(() => {
    if (branches.length == 1) {
      setBranchCommunication(branches[0].value);
    }

    if (supplierCommunications.length == 1) {
      setSupplierCommunication(supplierCommunications[0].value);
    }
    if(transporterCommunications.length == 1) {
      setTransportCommunication(transporterCommunications[0].value)
    }
  }, [branchCode, supplierCode,transportCode]);

  
  return (
    <View style={{flex: 1, padding: 12, backgroundColor: '#fff'}}>
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
                      setInvoiceRDate(nextDate);
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
                      setIdate(nextDate);
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
                      setLRDate(nextDate);
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
                    style={{
                      backgroundColor: 'white',
                      color: '#6e6c6c',
                      width: '100%',
                    }}
                    placeholder="Invoice Status"
                    onChangeItem={value => setInvoiceStatus(value.value)}
                  />
                </View>
                {values.length == 1 ? null : (
                  <View style={styles.group}>
                    <DropDown
                      values={values}
                      style={{backgroundColor: 'white', color: '#6e6c6c'}}
                      placeholder="Branch Code"
                      onChangeItem={value => {
                        setBranchCode(value.value);
                        filterBranchCommunications(value.value);
                        console.log(value.value);
                      }}
                    />
                  </View>
                )}
                {branches.length == 0 || branches.length == 1 ? null : (
                  <View style={styles.group}>
                    <DropDown
                      values={branches}
                      style={{backgroundColor: 'white', color: '#6e6c6c'}}
                      placeholder="Branch Communication"
                      onChangeItem={value => {
                        setBranchCommunication(value.value);
                        console.log('branch Comm >> ', value);
                      }}
                    />
                  </View>
                )}
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
                {supplierCommunications.length == 0 || supplierCommunications.length == 1 ? null : (
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
                )}
                <View style={styles.group}>
                  <DropDown
                    values={transporter}
                    style={{backgroundColor: 'white', color: '#6e6c6c'}}
                    placeholder="Transporter Code"
                    onChangeItem={value => {
                      filterTransportCommunications(value.value);
                      // mike
                      setTransportCode(value.value);
                    }}
                  />
                </View>
                {transporterCommunications.length == 0 || transporterCommunications.length == 1? null: <View style={styles.group}>
                  <DropDown
                    values={transporterCommunications}
                    style={{backgroundColor: 'white', color: '#6e6c6c'}}
                    placeholder="Transporter Communication"
                    onChangeItem={value =>
                      setTransportCommunication(value.value)
                    }
                  />
                </View>}
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
