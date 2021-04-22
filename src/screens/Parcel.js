import React, {useState, useEffect} from 'react';

import {View, StyleSheet, ScrollView} from 'react-native';
import DropDown from '../components/DropDown';
import InputText from '../components/InputText';
import DatePickerComponent from '../components/DatePicker';
import Button from '../components/Button';
import colors from '../config/constants/colors';
import axios from 'axios';
import {Text} from '@ui-kitten/components';
import {setNestedObjectValues} from 'formik';

const Parcel = ({route}) => {
  const USER_ID = route.params.data.id;
  let branches = []
  let sites = []
  const [siteCommunications,setSiteCommunications] = useState([]);
  const [date, setDate] = useState('');
  const [siteName,setSiteName] = useState(undefined);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState([]);
  const [values, setValues] = useState([]);
  const {userBranchUser} = route.params.data;
  

  const branchUser = () => {
    const branchuser = userBranchUser.map(ele => ({
      label: ele.branchCode,
      value: ele.branchId,
    }));

    
    setValues(branchuser);
  };

  
    data.forEach(item => {
       item.branchCommunication.map(item => {
        const {
          addressLine1,
          addressLine2,
          cityId,
          id,
        } = item.communication.address;
        branches.push( {
          value: id,
          label: addressLine1 + ' ' + addressLine2 + ' ' + cityId,
        });
      });
    })


  data.forEach(item => {
    // for site
    item.branchSite.map(item => {
      const {id, code} = item.site;
      sites.push({
        value: id,
        label: code,
      });
    });
  });




  const filterSites = key => {
    let results = []
    let final = [];
    data.forEach(item => {
      results = item.branchSite.filter(item => {
        return item.site.id == key 
      })
    })
   results.map(item => {
     final = item.site.siteCommunication.map(communication => {
       
       const {id,addressLine1,addressLine2,cityId} = communication.communication.address
       return {
         value:id,
         label:addressLine1 + " " + addressLine2 + " "  + cityId
       }
     })
   })

   setSiteCommunications(final)
  }

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

  const fetchData = () => {
    // make this 7 dynamic
    const API = `http://test.picktech.in/api/Assignment/GetBranchTSSByUser?userId=${USER_ID}&cmpID=7`;
    axios
      .get(API)
      .then(response => {
        setData(response.data);
        console.log(response);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchData();
    branchUser();
    
    fetchStatus();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          {values.length === 1 ? null : (
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
          )}
          {branches.length === 1 ? null : (
            <View style={{marginBottom: 20}}>
              <Text style={styles.text} category="label">
                Branch Communication
              </Text>
              <DropDown
                values={branches}
                style={{backgroundColor: 'white', color: '#6e6c6c'}}
                placeholder="Branch Communication"
                onChangeItem={item => console.log(item.value)}
              />
            </View>
          )}
          <View style={{marginBottom: 20}}>
            <Text style={styles.text} category="label">
              Site Communication
            </Text>
            <DropDown
              values={sites}
              style={{backgroundColor: 'white', color: '#6e6c6c'}}
              placeholder="Site Name"
              onChangeItem={item => {
                filterSites(item.value)
                setSiteName(item.value)
              }}
            />
          </View>
         {siteName === undefined ? null :  siteCommunications.length === 1 ? null : <View style={{marginBottom: 20}}>
            <Text style={styles.text} category="label">
              Site Communication
            </Text>

            <DropDown
              values={siteCommunications}
              style={{backgroundColor: 'white', color: '#6e6c6c'}}
              placeholder="Site Communication"
              onChangeItem={item => console.log(item.value)}
            />
          </View>}
          <View style={{marginBottom: 20, width: '90%'}}>
            <Text style={styles.text} category="label">
              LR Number
            </Text>
            <InputText
              placeholder="LR Number"
              style={{backgroundColor: 'white'}}
              onChangeText={text => console.log(text)}
            />
          </View>
          <View style={{marginBottom: 20, width: '90%'}}>
            <Text style={styles.text} category="label">
              Number of Parcels in LR
            </Text>
            <InputText
              placeholder="Number of Parcels in LR"
              style={{backgroundColor: 'white'}}
              onChangeText={text => console.log(text)}
            />
          </View>
          <View style={{marginBottom: 20, width: '90%'}}>
            <Text style={styles.text} category="label">
              Number of Parcels Received
            </Text>
            <InputText
              placeholder="Number of Parcels Received"
              style={{backgroundColor: 'white'}}
              onChangeText={text => console.log(text)}
            />
          </View>
          <View style={{marginBottom: 20}}>
            <Text style={styles.text} category="label">
              Parcel Received Date
            </Text>
            <DatePickerComponent
              date={date}
              mode="date"
              onDateChange={date => {
                setDate(date);
                console.log(date);
              }}
            />
          </View>
          <View style={{marginBottom: 20}}>
            <Text style={styles.text} category="label">
              Parcel Status
            </Text>
            <DropDown
              values={status}
              style={{backgroundColor: 'white', color: '#6e6c6c'}}
              placeholder="Parcel Status"
              onChangeItem={item => console.log(item.value)}
            />
          </View>
          
        </View>
        <View style={styles.footer}>
          <Button title="Add Parcel" style={{width: '100%'}} />
        </View>
      </ScrollView>
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
  text: {
    fontSize: 16,
    marginBottom: 4,
    marginLeft: 5,
    marginTop: 10,
  },
});

export default Parcel;
