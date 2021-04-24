import React, {useState, useEffect} from 'react';

import {View, StyleSheet, ScrollView, ImageBase, Alert} from 'react-native';
import DropDown from '../components/DropDown';
import InputText from '../components/InputText';
import DatePickerComponent from '../components/DatePicker';
import Button from '../components/Button';
import colors from '../config/constants/colors';
import axios from 'axios';
import {Text, Datepicker} from '@ui-kitten/components';
import {setNestedObjectValues} from 'formik';
import ImagePicker from 'react-native-customized-image-picker';
import ImgToBase64 from 'react-native-image-base64';


const Parcel = ({route}) => {
  const USER_ID = route.params.data.id;
  const {clientId} = route.params.data;
  const {value: companyId} = route.params.company;
  let branches = [];
  let sites = [];
  let transporter = [];
  const [siteCommunications, setSiteCommunications] = useState([]);
  const [siteCommunication, setSiteCommunication] = useState();
  const [transporterCommunications, setTransporters] = useState([]);
  const [transporterCommunication, setTransportCommunication] = useState();
  const [tCode, setTCode] = useState();
  const [LRnumber, setLR] = useState('');
  const [parcels, setNParcels] = useState();
  const [nPR, setNPR] = useState();
  const [prDate, setPRDate] = useState();
  const [parcelStatus, setParcelStatus] = useState();
  const [branchCommunication, setBranchCommunication] = useState();
  const [date, setDate] = useState();
  const [siteName, setSiteName] = useState(undefined);
  const [data, setData] = useState([]);
  const [mDate,setMdate] = useState([]);
  const [status, setStatus] = useState([]);
  const [values, setValues] = useState([]);
  const [branchCode, setBranchCode] = useState();
  const [images, setImages] = useState();
  const {userBranchUser} = route.params.data;

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

  const branchUser = () => {
    const branchuser = userBranchUser.map(ele => ({
      label: ele.branchCode,
      value: ele.branchId,
    }));

    setValues(branchuser);
  };

  data.forEach(item => {
    item.branchCommunication.map(item => {
      const {id} = item
      const {
        addressLine1,
        addressLine2,
        cityId,
      } = item.communication.address;
      branches.push({
        value: id,
        label: addressLine1 + ' ' + addressLine2 + ' ' + cityId,
      });
    });
  });

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
    console.log('final >', final);
    setTransporters(final);
  };

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
        const {id} = communication
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
let allImages = []
  const convertImgToBase = img => {
    
    img.map(async image => {
      const base_img = await ImgToBase64.getBase64String(image.path);
      allImages.push(base_img);
    });
    setImages(allImages)
  };
  

  const convertDate = (date) => {
    const dateArr = date.toString().split(' ').slice(1, 4);
    const deg = month.indexOf(dateArr[0]) + 1
    const zeroDeg = ('0' + deg).slice(-2)  // '04'

    const finalDate = `${dateArr[2]}-${zeroDeg}-${dateArr[1]}`
 
    return finalDate
    
  };

  const handleSubmit = () => {
    // let formValues = {
    //   BranchId: branchCode,
    //   BranchCommunicationId: branchCommunication,
    //   ClientId: clientId,
    //   CompanyId: companyId,
    //   TransporterId: tCode,
    //   TransporterCommunicationId: transporterCommunication,
    //   SiteId: siteName,
    //   siteCommunicationId: siteCommunication,
    //   LRNumber: LRnumber,
    //   NumberOfParcelsInLR: parcels,
    //   NumberOfParcelsReceived: nPR,
    //   ParcelReceivedDate: mDate,
    //   ParcelStatusId: parcelStatus,
    // };

    var data = new FormData();
    data.append('userID', '0');
    data.append('parcel', `{\n"ClientId":${clientId},\n"CompanyId":${companyId},\n"BranchId":${branchCode},\n"BranchCommunicationId":${branchCommunication},\n"TransporterId":${tCode},\n"TransporterCommunicationId":${transporterCommunication},\n"SiteId":${siteName},\n"SiteCommunicationId":${siteCommunication},\n"LRNumber":"${LRnumber}",\n"NumberOfParcelsInLR":${parcels},\n"NumberOfParcelsReceived":${nPR},\n"ParcelReceivedDate":"${mDate}",\n"ParcelStatusId":${parcelStatus}\n}\n`);
    // data.append('Attachments',images);
    images.forEach(image => {
      data.append('Attachments',image)
    })
      console.log('form data >>>',data)
      
    var config = {
      method: 'post',
      url: 'http://test.picktech.in/api/Transaction/AddParcel',
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.status == 200) {
          Alert.alert('Success', "Parcel Added Successfully")
        }
      })
      .catch(function (error) {
        Alert.alert('Error','Something went Wrong')
      });
  };
  useEffect(() => {
    if (values.length === 1) {
      setBranchCode(values[0].value);
    }
    if (branches.length === 1) {
      setBranchCommunication(branches[0].value);
    }

    if (sites.length === 1) {
      setSiteName(sites[0].value);
    }

    if (siteCommunications.length === 1) {
      setSiteCommunication(siteCommunications[0].value);
    }

    if (transporter.length === 1) {
      setTCode(transporter[0].value);
    }
    if (transporterCommunications.length == 1) {
  
      setTransportCommunication(transporterCommunications[0].value);
    }
  });
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
                onChangeItem={item => {
                  fetchData(item);
                  setBranchCode(item.value);
                }}
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
                onChangeItem={item => console.log(item,'branch comm')}
              />
            </View>
          )}
          <View style={{marginBottom: 20}}>
            <Text style={styles.text} category="label">
              Site Code
            </Text>
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
          {siteName === undefined ? null : siteCommunications.length ===
            1 ? null : (
            <View style={{marginBottom: 20}}>
              <Text style={styles.text} category="label">
                Site Communication
              </Text>

              <DropDown
                values={siteCommunications}
                style={{backgroundColor: 'white', color: '#6e6c6c'}}
                placeholder="Site Communication"
                onChangeItem={item => setSiteCommunication(item.value)}
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
                  setTCode(value.value);
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
                onChangeItem={value => setTransportCommunication(value.value)}
              />
            </View>
          )}

          <View style={{marginBottom: 20, width: '90%'}}>
            <Text style={styles.text} category="label">
              LR Number
            </Text>
            <InputText
              placeholder="LR Number"
              style={{backgroundColor: 'white'}}
              onChangeText={text => setLR(text,'lr')}
            />
          </View>
          <View style={{marginBottom: 20, width: '90%'}}>
            <Text style={styles.text} category="label">
              Number of Parcels in LR
            </Text>
            <InputText
              placeholder="Number of Parcels in LR"
              style={{backgroundColor: 'white'}}
              onChangeText={text => setNParcels(parseInt(text))}
            />
          </View>
          <View style={{marginBottom: 20, width: '90%'}}>
            <Text style={styles.text} category="label">
              Number of Parcels Received
            </Text>
            <InputText
              placeholder="Number of Parcels Received"
              style={{backgroundColor: 'white'}}
              onChangeText={text => setNPR(parseInt(text))}
            />
          </View>
          <View style={{marginBottom: 20}}>
            <Text style={styles.text} category="label">
              Parcel Received Date
            </Text>
            <Datepicker
                      placeholder="Parcel Received Date"
                      date={date}
                      onSelect={nextDate => {
                        setDate(nextDate)
                       setMdate(convertDate(nextDate))
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
              onChangeItem={item => setParcelStatus(item.value)}
            />
          </View>
          <View>
            <Button
              title="image"
              onPress={() => {
                ImagePicker.openPicker({
                  multiple: true,
                }).then(images => {
                  convertImgToBase(images);
                });
              }}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <Button
            title="Add Parcel"
            onPress={handleSubmit}
            style={{width: '100%'}}
          />
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
