import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Alert, Image} from 'react-native';
import {Formik} from 'formik';
import InputText from '../components/InputText';
import DropDown from '../components/DropDown';
import {Input, Text, Datepicker, Layout, Spinner} from '@ui-kitten/components';
import Button from '../components/Button';
import AsyncStorage from '@react-native-community/async-storage';
export default function ParcelEdit({route}) {
  const {lrnumber, parcelReceivedDate, parcelDamage} = route.params.data;
  const [pdate, setParcelDate] = useState(new Date(parcelReceivedDate));
  const [lr, setLr] = useState(lrnumber);
  const [branches, setBranches] = useState([]);
  const [status, setStatus] = useState([]);
  const [parcels, setNParcels] = useState();
  const [supplierCommunications, setSuppliers] = useState([]);
  const [supplierCode, setSupplierCode] = useState();
  const [parcelVale, setParcelStatus] = useState();
  const [supplierCommunication, setSupplierCommunication] = useState();
  const [siteName, setSiteName] = useState(undefined);
  let suppliers = [];
  let transporter = [];
  let sites = [];
  const [transportCode, setTransportCode] = useState();
  const [branchCode, setBranchCode] = useState([]);
  const [values, setValues] = useState([]);
  const [data, setData] = useState([]);
  const [branchCommunication, setBranchCommunication] = useState();
  const [transporterCommunications, setTransporters] = useState([]);
  const [transporterCommunication, setTransportCommunication] = useState([]);
  const [siteCommunications, setSiteCommunications] = useState([]);

  const filterSites = key => {
    let results = [];
    let final = [];
    data.forEach(item => {
      results = item.branchSite.filter(item => {
        return item.site.id == key;
      });
    });
    results.map(item => {
      final = item.site.siteCommunication.map(communication => {
        const {id} = communication;
        const {
          addressLine1,
          addressLine2,
          cityId,
        } = communication.communication.address;
        return {
          value: id,
          label: addressLine1 + ' ' + addressLine2 + ' ' + cityId,
        };
      });
    });

    setSiteCommunications(final);
  };

  data.forEach(item => {
    // for site
    item.branchSite.map(item => {
      const {id, code} = item.site;
      sites.push({
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
        const {addressLine1, addressLine2, cityId} = item.communication.address;
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

  useEffect(async () => {
    const response = await AsyncStorage.getItem('state');
    const data = await response;

    const resp = await AsyncStorage.getItem('status');
    const status = await resp;
    setStatus(JSON.parse(status));

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
  }, [branchCode, supplierCode]);

  return (
    <View style={{flex: 1, padding: 12, backgroundColor: '#fff'}}>
      <Formik
        initialValues={{invoiceNumber: '', lrNumber: ''}}
        onSubmit={values => console.log(values)}>
        {({handleSubmit, handleChange}) => (
          <>
            <ScrollView>
              <View style={{marginTop: 10,flex:1}}>
                {values.length == 1 ? null : (
                  <View style={styles.group}>
                    <DropDown
                      values={values}
                      style={{backgroundColor: 'white', color: '#6e6c6c'}}
                      placeholder="Branch Code"
                      onChangeItem={value => {
                        setBranchCode(value.value);
                        filterBranchCommunications(value.value);
                        console.log('branch code', value.value);
                      }}
                    />
                  </View>
                )}
                {branches.length == 1 ? null : (
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
                <View>
                  <DropDown
                    values={sites}
                    style={{backgroundColor: 'white', color: '#6e6c6c'}}
                    placeholder="Site Code"
                    onChangeItem={item => {
                      filterSites(item.value);
                      setSiteName(item.value);
                    }}
                  />
                </View>
                {siteCommunications.length == 0 ||
                siteCommunications.length == 1 ? null : (
                  <View style={styles.group}>
                    <DropDown
                      values={siteCommunications}
                      style={{backgroundColor: 'white', color: '#6e6c6c'}}
                      placeholder="Site Communication"
                      onChangeItem={value =>
                        setSupplierCommunication(value.value)
                      }
                    />
                  </View>
                )}
                {/* mike */}
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
                {transporterCommunications.length == 0 ||
                transporterCommunications.length == 1 ? null : (
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
                )}

                <View style={{width: '95%', marginTop: 10}}>
                  <Input
                    value={lr}
                    placeholder="LR Number"
                    onChangeText={text => setLr(text)}
                  />
                </View>
                <View style={{marginTop: 10, width: '95%'}}>
                  <InputText
                    placeholder="Number of Parcels in LR"
                    style={{backgroundColor: 'white'}}
                    onChangeText={text => setNParcels(parseInt(text))}
                  />
                </View>
                <View style={{marginTop: 10, width: '95%'}}>
                  <InputText
                    placeholder="Number of Parcels Received"
                    style={{backgroundColor: 'white'}}
                    onChangeText={text => setNPR(parseInt(text))}
                  />
                </View>
                <View style={{marginTop: 10, width: '95%'}}>
                  <Datepicker
                    placeholder="Parcel Received Date"
                    date={pdate}
                    onSelect={nextDate => {
                      //    setIRDate(convertDate(nextDate));
                      //    setInvoiceReceiveDate(nextDate)
                      console.log(nextDate);
                      setParcelDate(nextDate);
                    }}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <DropDown
                    values={status}
                    style={{backgroundColor: 'white', color: '#6e6c6c'}}
                    placeholder="Parcel Status"
                    onChangeItem={item => setParcelStatus(item.value)}
                  />
                </View>
              </View>

              <View style={{marginTop: 280}}>
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
