import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableNativeFeedback,
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
  const [data, setData] = useState();
  const [moreFields, setFields] = useState(false);
  const [status, setStatus] = useState([]);
  const [invoiceReceiveDate, setInvoiceReceiveDate] = useState();
  const [invoiceDate, setInvoiceDate] = useState();
  const [lrDate, setLRDate] = useState();
  const [invoiceStatus, setInvoiceStatus] = useState();
  const [parcelStatus, setParcelStatus] = useState();

  const [screen, setScreen] = useState(true);
  const [screen2, setScreen2] = useState(false);
  const {userBranchUser} = route.params.data;

  const values = userBranchUser.map(ele => ({
    label: ele.branchCode,
    value: ele.branchId,
  }));

  const fetchData = item => {
    const {label, value} = item;
    // make this 7 dynamic
    const API = `http://test.picktech.in/api/Assignment/GetBranchTSSByUser?userId=${USER_ID}&cmpID=7`;
    axios
      .get(API)
      .then(response => {
     
         
         console.log(response.data);
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
  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Formik
          initialValues={{invoiceNumber: '', lrNumber: '', parcels: ''}}
          onSubmit={values => console.log(values)}>
          {({handleSubmit, handleChange}) => (
            <>
              <ScrollView>
                {screen ? (
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
                        onSelect={nextDate => setInvoiceReceiveDate(nextDate)}
                      />
                    </View>
                    <View>
                      <Text style={styles.text} category="label">
                        Invoice Date
                      </Text>
                      <Datepicker
                        placeholder="Invoice Date"
                        date={invoiceDate}
                        onSelect={nextDate => setInvoiceDate(nextDate)}
                      />
                    </View>
                    <View>
                      <Text style={styles.text} category="label">
                        LR Date
                      </Text>
                      <Datepicker
                        placeholder="LR Date"
                        date={lrDate}
                        onSelect={nextDate => setLRDate(nextDate)}
                      />
                    </View>
                    {/* <View>
                  <Text style={styles.text} category="label">
                    Branch Code
                  </Text>
                  <DropDown
                    values={values}
                    style={{backgroundColor: 'white', color: '#6e6c6c'}}
                    placeholder="LR Date"
                    onChangeItem={item => fetchData(item)}
                  />
                </View> */}
                    <View>
                      <Text style={styles.text} category="label">
                        Number of parcel
                      </Text>
                      <Input
                        placeholder="Number of parcel"
                        onChangeText={handleChange('parcels')}
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
                    <View>
                      <Text style={styles.text} category="label">
                        Parcel Status
                      </Text>
                      <DropDown
                        values={status}
                        style={{backgroundColor: 'white', color: '#6e6c6c'}}
                        placeholder="Parcel Status"
                        onChangeItem={value => setParcelStatus(value.value)}
                      />
                    </View>
                  </View>
                ) : (
                  <View>
                    <TouchableNativeFeedback
                      onPress={() => {
                        setScreen2(false);
                        setScreen(true);
                      }}>
                      <IonIcon name="arrow-back" size={30} color="#000" />
                    </TouchableNativeFeedback>

                    <View>
                      <Text style={styles.text} category="label">
                        Branch Code
                      </Text>
                      <DropDown
                        values={values}
                        style={{backgroundColor: 'white', color: '#6e6c6c'}}
                        placeholder="Branch Code"
                        onChangeItem={item => fetchData(item)}
                      />
                    </View>

                    {moreFields ? (
                      <View>
                        <DropDown
                          values={values}
                          style={{backgroundColor: 'white', color: '#6e6c6c'}}
                          placeholder="Branch Communicators"
                          onChangeItem={item => fetchData(item)}
                        />
                      </View>
                    ) : null}
                  </View>
                )}

                <View style={styles.footer}>
                  {screen2 ? (
                    <Button
                      title="Add Invoice"
                      style={{width: '100%'}}
                      onPress={handleSubmit}
                    />
                  ) : (
                    <Button
                      title="Next"
                      style={{width: '100%'}}
                      onPress={handleNext}
                    />
                  )}
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
