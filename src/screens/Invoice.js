import React, {useState, useEffect, createContext} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableNativeFeedback,
  Alert,
} from 'react-native';
import {convertDate} from '../utils/index'
import {addInvoice, fetchStatus} from '../api/index'
import Storage from 'react-native-storage';
import Button from '../components/Button';
import colors from '../config/constants/colors';
import DropDown from '../components/DropDown';

import {Formik} from 'formik';
import {Input, Text, Datepicker, Spinner} from '@ui-kitten/components';

import AsyncStorage from '@react-native-community/async-storage';
import {useStoreState} from 'easy-peasy';


const Invoice = ({navigation}) => {
  

  const companyId = useStoreState(state => state.store.company);
  const Storedata = useStoreState(state => state.store.data);
 
  const data = useStoreState(state => state.store.userData);
  console.log(companyId,'jusin');
  console.log(data,'storeuerdat');

 
  const [branches,setBranches] = useState([]);
  const [isLoading,setLoading] = useState(false);
  let suppliers = [];
  // let supplierCommunications = [];
  let transporter = [];
  const [supplierCommunications, setSuppliers] = useState([]);
  const [supplierCode, setSupplierCode] = useState();
  const [supplierCommunication, setSupplierCommunication] = useState();
  const [transporterCommunications, setTransporters] = useState([]);
  const [transportCode, setTransportCode] = useState();
  const [transporterCommunication, setTransportCommunication] = useState();
  const [status, setStatus] = useState([]);
  const [invoiceReceiveDate, setInvoiceReceiveDate] = useState();
  const [invoiceDate, setInvoiceDate] = useState('');
  const [lrDate, setLRDate] = useState('');
  const [branchCommunication, setBranchCommunication] = useState();
  const [invoiceStatus, setInvoiceStatus] = useState();
  const {userBranchUser} = data
  const [branchCode, setBranchCode] = useState();
  
  const [LRNdate,setLRNdate] = useState('');
  const [IRDate,setIRDate] = useState('')
  const [Idate,setIDate] = useState('');
  const [parcels,setParcels] = useState(0);
  const [lrdefault,setlrDefault] =useState("")
  const [inDefault,setinDefault] =useState("")

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



 console.log(data,'checling for invoices !')

  const values = data.map(ele => {
  return  Object.assign({},{label:ele.branchCode,value:ele.branchId})
  })



  const filterSupplierCommunications = key => {
    let final = [];

    console.log(key);
    let results=[]
    data.forEach(item => {
      results = item.branchSupplier.filter(item => {
        return item.supplier.id == key;
      });
    });

    console.log(results,'supplier');
    results.map(item => {
      item.supplier.supplierCommunication.map(item => {
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

    setSuppliers(final);
  };

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
 
  const filterBranchCommunications = key => {
    const results = []
    const seen = new Set();
    const branchCommunication = data.map(item => item.branchCommunication)
    
    if(branchCommunication.length == 1) {
      branchCommunication.map(item => {
        item.map(item => {
          const {id} = item
          const {addressLine1,addressLine2,cityId} = item.communication.address
          results.push({
            value:id,
            label:`${addressLine1} ${addressLine2} ${cityId}`
          })
        })
      })
      setBranches(results)
    } else {
      const filtered = data.filter(id => id.branchId == key)
      filtered.forEach(item => {
        item.branchCommunication.map(item => {
          const {id} = item;
          const {addressLine1,addressLine2,cityId} = item.communication.address
          results.push({
            value:id,
            label:`${addressLine1} ${addressLine2} ${cityId}`
          })
        })
      })
      setBranches(results);
    }

   
  }
useEffect(() => {
  filterBranchCommunications();  
  if(values.length ==1) {
    setBranchCode(values[0].value)
  }

  if(branches.length == 1) {
    filterBranchCommunications()
    setBranchCommunication(branches[0].value)
  }
  if(supplierCommunications.length == 1) {
    console.log(supplierCommunications);
  }
  if(supplierCommunications.length == 1) {
   setSupplierCommunication(supplierCommunications[0].value)
  }
  if(transporterCommunications.length == 1) {
    setTransportCommunication(transporterCommunications[0].value)
  }
},[transportCode,branchCode])


const formSubmit = (values)=> {
  const {invoiceNumber,lrNumber} = values;
  const payload = {
    Header:{
      userid:0
    },
    Content:{
      ClientId:Storedata.clientId,
      CompanyId:companyId.value,
      BranchId:branchCode,
      BranchCommunicationId:branchCommunication,
      SupplierId:supplierCode,
      SupplierCommunicationId:supplierCommunication,
      TransporterId:transportCode,
      TransporterCommunicationId:3,
      InvoiceNumber:invoiceNumber,
      InvoiceReceivedDate:IRDate,
      InvoiceDate:Idate,
      LRNumber:lrNumber,
      LRDate:LRNdate,
      NumberOfParcels:parcels,
      InvoiceStatusId:invoiceStatus
    }
  }
  
  if(!branchCode || !branchCommunication || !supplierCode || !supplierCommunication || !transportCode || !invoiceNumber || !IRDate || !Idate || !lrNumber || !LRNdate || !parcels || !invoiceStatus) {
    Alert.alert("Error", "All Fields are required")
    
  } else {
    
    addInvoice(values,payload,navigation);
   setInvoiceReceiveDate();
   setInvoiceDate();
   setLRDate()
   setStatus()
   suppliers=[]
   transporters = []
   setParcels("")
   setlrDefault("")
   setinDefault("")
   
    
  }
}
 


  const loadData =async ()=> {
    const status = await AsyncStorage.getItem('status')
    setStatus(JSON.parse(status));

  // storage.load({id:"1001",key:"companyId"}).then(company => setCompanyId(company.value))
  // storage.load({id:"1000",key:"data"}).then(data => setId(data.clientId));
  }

  useEffect(() => {
    loadData();
  },[])
 
  

  return (
    <View style={styles.container}>
      <View style={styles.headerTop}><Text style={styles.textTop}>Invoice</Text></View>
      <View style={styles.section}>
        <Formik
          initialValues={{invoiceNumber: '', lrNumber: ''}}
          onSubmit={values => formSubmit(values)}>
          {({handleSubmit, handleChange}) => (
            <>
              <ScrollView>
                <View style={{marginTop:10}}>
                  <View style={styles.group}>
                    <Input
                      placeholder="Invoice Number"
                      onChangeText={(text) => {
                        handleChange('invoiceNumber')
                        setinDefault(text)
                      }}
                      value={inDefault}
                    />
                  </View>
                  <View style={styles.group}>
                   
                    <Input
                      placeholder="LR Number"
                      onChangeText={(text)=> {
                        handleChange('lrNumber')
                        setlrDefault(text)
                      }}
                      value={lrdefault}
                    />
                  </View>
                  <View style={styles.group}>
                
                    <Datepicker
                      placeholder="Invoice Received Date"
                      date={invoiceReceiveDate}
                      onSelect={nextDate => {
                       setIRDate(convertDate(nextDate));
                       setInvoiceReceiveDate(nextDate)
                      }}
                    />
                  </View>
                  <View style={styles.group}>
                    {Idate ? <Text style={styles.text} category="label">
                      Invoice Date
                    </Text>:null}
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
                  <View style={styles.group}>
                    {lrDate ? <Text style={styles.text} category="label">
                      LR Date
                    </Text>: null}
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
                  <View style={styles.group}>
                
                    <Input
                      placeholder="Number of parcel"
                      onChangeText={value => setParcels(parseInt(value))}
                      value={parcels}
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
                  {values.length === 1 || values.length == 0 ? //  </View> //  <Text style={{marginLeft:6,marginTop:10}}>{values[0].label}</Text> //  </Text> //     
                   //    <Text style={styles.text} category="label"> //  <View style={{padding:4}}>

                  null : (
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
                  )}

                  {branches.length === 0 || branches.length == 1 ? // </View> // <Text style={{marginLeft:6,marginTop:10}}>{branches[0].label}</Text> // </Text> //    Branch code //   <Text style={styles.text} category="label"> //   <View style={{padding:4}}>
                  null : (
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
                  )}
                  {suppliers.length === 1 ? null : (
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
                  )}
                  {supplierCommunications.length == 1 ||
                  supplierCommunications.length == 0 ? null : (
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
                  {transporter.length === 1 ? null : (
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
                  )}
                  {transporterCommunications.length === 1 ||
                  transporterCommunications.length == 0 ? null : (
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
                </View>

                <View style={{marginTop:10}}>
                   {isLoading ? <Spinner size="large" status="warning" /> : <Button
                    title="Add Invoice"
                    style={{width: '100%', padding:0, backgroundColor:colors.black}}
                    onPress={handleSubmit}
                  />}
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
  headerTop:{
    backgroundColor:colors.yellow,
    padding:10,
  },  
  textTop:{
    fontSize:20,
    marginLeft:18
  },
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
  group:{
    marginTop:10,
    width:"100%"
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: "#000",
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 6,
  
  },
});




export default Invoice;