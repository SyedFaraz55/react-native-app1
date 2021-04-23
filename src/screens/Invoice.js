import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableNativeFeedback,
  Alert,
} from 'react-native';
import Button from '../components/Button';
import colors from '../config/constants/colors';
import DropDown from '../components/DropDown';
import DatePickerComponent from '../components/DatePicker';
import InputText from '../components/InputText';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {Formik} from 'formik';
import {Input, Text, Datepicker, Layout} from '@ui-kitten/components';
import axios from 'axios';

const Invoice = ({route}) => {
  const USER_ID = route.params.data.id;
  const {clientId} = route.params.data
  const {value: companyId, label} = route.params.company;

  const [data, setData] = useState([]);
  let branches = [];
  let suppliers = [];
  // let supplierCommunications = [];
  let transporter = [];
  const [supplierCommunications, setSuppliers] = useState([]);
  const [supplierCode, setSupplierCode] = useState();
  const [supplierCommunication, setSupplierCommunication] = useState();
  const [transporterCommunications, setTransporters] = useState([]);
  const [transportCode, setTransportCode] = useState();
  const [transporterCommunication, setTransportCommunication] = useState();
  
  const [LRNdate,setLRNdate] = useState('');
  const [IRDate,setIRDate] = useState('')
  const [Idate,setIDate] = useState('');

  let month = [];
  month[0] = 'Jan';
  month[1] = 'Feb';
  month[2] = 'Mar';
  month[3] = 'Apr';
  month[4] = 'May';
  month[5] = 'Jun';
  month[6] = 'Jul';
  month[7] = 'Aug';
  month[8] = 'Sep';
  month[9] = 'Oct';
  month[10] = 'Nov';
  month[11] = 'Dec';
  // let transporterCommunications = [];

  // const [branchCommunication, setBranchCommunication] = useState([]);

  data.forEach(item => {
    item.branchCommunication.map(item => {
      const {
        addressLine1,
        addressLine2,
        cityId,
        id,
      } = item.communication.address;
      branches.push({
        value: id,
        label: addressLine1 + ' ' + addressLine2 + ' ' + cityId,
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

    // item.branchTransporter.map(item => {
    //   item.transporter.transporterCommunication.forEach(item => {
    //     const {
    //       addressLine1,
    //       addressLine2,
    //       cityId,
    //       id,
    //     } = item.communication.address;
    //     transporterCommunications.push({
    //       value: id,
    //       label: addressLine1 + ' ' + addressLine2 + ' ' + cityId,
    //     });
    //   });
    // });
  });

  const [parcels,setParcels] = useState(0);

  const convertDate = (date) => {
    const dateArr = date.toString().split(' ').slice(1, 4);

    const finalDate = `${dateArr[2]}-${month.indexOf(dateArr[0]) + 1}-${dateArr[1]}`
 
    return finalDate
    
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
  });

  const [status, setStatus] = useState([]);
  const [invoiceReceiveDate, setInvoiceReceiveDate] = useState();
  const [invoiceDate, setInvoiceDate] = useState('');
  const [lrDate, setLRDate] = useState('');
  const [branchCommunication, setBranchCommunication] = useState();
  const [invoiceStatus, setInvoiceStatus] = useState();
  const {userBranchUser} = route.params.data;
  const [branchCode, setBranchCode] = useState();

  const values = userBranchUser.map(ele => ({
    label: ele.branchCode,
    value: ele.branchId,
  }));

  useEffect(() => {
    if(branches.length == 1) {
      setBranchCommunication(branches[0].value)
    }
    if (values.length == 1) {
      setBranchCode(values[0].value);
    }

    if (suppliers.length == 1) {
      setSupplierCode(suppliers[0].value);
    }

    if (transporter.length == 1) {
      setTransportCode(transporter[0].value);
    }

    if(supplierCommunications.length ==1) {
      setSupplierCommunication(supplierCommunications[0].value)
    }

    if(transporterCommunications.length ==1) {
     setTransportCommunication(transporterCommunications[0].value);
    }

  }, []);

  const filterSupplierCommunications = key => {
    let final = [];

    console.log(key);
    let result;
    data.forEach(item => {
      result = item.branchSupplier.filter(item => {
        return item.supplier.id == key;
      });
    });

    result.map(item => {
      item.supplier.supplierCommunication.map(item => {
        const {
          addressLine1,
          addressLine2,
          cityId,
          id,
        } = item.communication.address;
        final.push({
          value: id,
          label: addressLine1 + ' ' + addressLine2 + ' ' + cityId,
        });
      });
    });

    setSuppliers(final);
  };

  const filterTransportCommunications = key => {
    console.log(key);
    let final = [];

    let result;
    data.forEach(item => {
      result = item.branchTransporter.filter(item => {
        return item.transporter.id == key;
      });
    });

    console.log(result, 'results');
    result.map(item => {
      item.transporter.transporterCommunication.map(item => {
        const {
          addressLine1,
          addressLine2,
          cityId,
          id,
        } = item.communication.address;
        final.push({
          value: id,
          label: addressLine1 + ' ' + addressLine2 + ' ' + cityId,
        });
      });
    });

    setTransporters(final);
  };
  const fetchData = () => {
    const API = `http://test.picktech.in/api/Assignment/GetBranchTSSByUser?userId=${USER_ID}&cmpID=${companyId}`;
    axios
      .get(API)
      .then(response => {
        setData(response.data);
      })
      .catch(err => console.log(err));
  };
  const fetchStatus = () => {
    axios
      .get('http://test.picktech.in/api/Definition/GetAllStatus')
      .then(response => {
        const values = response.data.map(ele => ({
          label: ele.name,
          value: ele.id,
        }));

        setStatus(values);
      })
      .catch(err => console.log(err));
  };

  const handleNext = () => {
    setScreen(false);
    setScreen2(true);
  };

  const addInvoice = values => {
    const {invoiceNumber,lrNumber} = values;
    const payload = {
      Header:{
        userid:0
      },
      Content:{
        ClientId:clientId,
        CompanyId:companyId,
        BranchId:branchCode,
        BranchCommunicationId:branchCommunication,
        SupplierId:supplierCode,
        SupplierCommunicationId:supplierCommunication,
        TransporterId:transportCode,
        TransporterCommunicationId:transporterCommunication,
        InvoiceNumber:invoiceNumber,
        InvoiceReceivedDate:IRDate,
        InvoiceDate:Idate,
        LRNumber:lrNumber,
        LRDate:LRNdate,
        NumberOfParcels:parcels,
        InvoiceStatusId:invoiceStatus
      }
    }
    console.log('payload >>>',payload)
   axios.post('http://test.picktech.in/api/Transaction/AddInvoice',payload)
   .then(response => {
     if(response.status == 200) {
       Alert.alert('Success',"Invoice Added")
     } else {
       Alert.alert("Error","Failed to add Invoice")
     }
   })
   .catch(err => console.log(err.toString()))
  };

  useEffect(() => {
    fetchStatus();
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Formik
          initialValues={{invoiceNumber: '', lrNumber: ''}}
          onSubmit={values => addInvoice(values)}>
          {({handleSubmit, handleChange}) => (
            <>
              <ScrollView>
                <View>
                  <View>
                    <Text style={styles.text} category="label">
                      Invoice number
                    </Text>
                    <Input
                      placeholder="Invoice Number"
                      onChangeText={handleChange('invoiceNumber')}
                    />
                  </View>
                  <View>
                    <Text style={styles.text} category="label">
                      LR number
                    </Text>
                    <Input
                      placeholder="LR Number"
                      onChangeText={handleChange('lrNumber')}
                    />
                  </View>
                  <View>
                    <Text style={styles.text} category="label">
                      Invoice Received Date
                    </Text>
                    <Datepicker
                      placeholder="Invoice Received Date"
                      date={invoiceReceiveDate}
                      onSelect={nextDate => {
                       setIRDate(convertDate(nextDate));
                       setInvoiceReceiveDate(nextDate)
                      }}
                    />
                  </View>
                  <View>
                    <Text style={styles.text} category="label">
                      Invoice Date
                    </Text>
                    <Datepicker
                      placeholder="Invoice Date"
                      date={invoiceDate}
                      onSelect={nextDate => {
                        const date = convertDate(nextDate);
                        setIDate(date)
                        setInvoiceDate(nextDate)
                      }}
                    />
                  </View>
                  <View>
                    <Text style={styles.text} category="label">
                      LR Date
                    </Text>
                    <Datepicker
                      placeholder="LR Date"
                      date={lrDate}
                      onSelect={nextDate => {
                        const date = convertDate(nextDate);
                        setLRNdate(date)
                        setLRDate(nextDate)
                      }}
                    />
                  </View>
                  <View>
                    <Text style={styles.text} category="label">
                      Number of parcel
                    </Text>
                    <Input
                      placeholder="Number of parcel"
                      onChangeText={value => setParcels(parseInt(value))}
                    />
                  </View>
                  <View>
                    <Text style={styles.text} category="label">
                      Invoice Status
                    </Text>
                    <DropDown
                      values={status}
                      style={{backgroundColor: 'white', color: '#6e6c6c'}}
                      placeholder="Invoice Status"
                      onChangeItem={value => setInvoiceStatus(value.value)}
                    />
                  </View>
                  {/* <View>
                    <Text style={styles.text} category="label">
                      Parcel Status
                    </Text>
                    <DropDown
                      values={status}
                      style={{backgroundColor: 'white', color: '#6e6c6c'}}
                      placeholder="Parcel Status"
                      onChangeItem={value => setParcelStatus(value.value)}
                    />
                  </View> */}
                  {values.length === 1 ? //  </View> //  <Text style={{marginLeft:6,marginTop:10}}>{values[0].label}</Text> //  </Text> //     Branch code //    <Text style={styles.text} category="label"> //  <View style={{padding:4}}>

                  null : (
                    <View>
                      <Text style={styles.text} category="label">
                        Branch Code
                      </Text>
                      <DropDown
                        values={values}
                        style={{backgroundColor: 'white', color: '#6e6c6c'}}
                        placeholder="Branch Code"
                        onChangeItem={value => setBranchCode(value.value)}
                      />
                    </View>
                  )}

                  {branches.length === 1 ? // </View> // <Text style={{marginLeft:6,marginTop:10}}>{branches[0].label}</Text> // </Text> //    Branch code //   <Text style={styles.text} category="label"> //   <View style={{padding:4}}>
                  null : (
                    <View>
                      <Text style={styles.text} category="label">
                        Branch Communication
                      </Text>
                      <DropDown
                        values={branches}
                        style={{backgroundColor: 'white', color: '#6e6c6c'}}
                        placeholder="Branch Communication"
                        onChangeItem={value =>
                          setBranchCommunication(value.value)
                        }
                      />
                    </View>
                  )}
                  {suppliers.length === 1 ? null : (
                    <View>
                      <Text style={styles.text} category="label">
                        Supplier Code
                      </Text>
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
                  )}
                  {supplierCommunications.length == 1 ||
                  supplierCommunications.length == 0 ? null : (
                    <View>
                      <Text style={styles.text} category="label">
                        Supplier Communications
                      </Text>
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
                  {transporter.length === 1 ? null : (
                    <View>
                      <Text style={styles.text} category="label">
                        Transporter Code
                      </Text>
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
                  )}
                  {transporterCommunications.length === 1 ||
                  transporterCommunications.length == 0 ? null : (
                    <View>
                      <Text style={styles.text} category="label">
                        Transporter Communication
                      </Text>
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
                </View>

                <View style={styles.footer}>
                  <Button
                    title="Add Invoice"
                    style={{width: '100%'}}
                    onPress={handleSubmit}
                  />
                </View>
              </ScrollView>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    paddingLeft: 20,
    height: 50,
  },
  section: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 14,
  },
  footer: {
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
    marginLeft: 5,
    marginTop: 10,
  },
});

export default Invoice;
