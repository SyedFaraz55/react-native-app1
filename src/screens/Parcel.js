import React, {useState, useEffect} from 'react';

import {View, StyleSheet, ScrollView, ImageBase, Alert,TouchableNativeFeedback, Image} from 'react-native';
import DropDown from '../components/DropDown';
import InputText from '../components/InputText';
import DatePickerComponent from '../components/DatePicker';
import Button from '../components/Button';
import colors from '../config/constants/colors';
import axios from 'axios';
import {Text, Datepicker, Spinner} from '@ui-kitten/components';
import {setNestedObjectValues} from 'formik';
import ImagePicker from 'react-native-customized-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import Feather from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Parcel = ({route, navigation}) => {
  const USER_ID = route.params.data.id;
  const {clientId} = route.params.data;
  const [company, setCompany] = useState();
  

  let sites = [];
  const [isLoading,setLoading] = useState(false);
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

  const [branchCode, setBranchCode] = useState();
  const [images, setImages] = useState([]);
  const [branches,setBranches] = useState([]);
  const [visibleImages,setDisplayImage] = useState([]);
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

  const values = data.map(ele => {
    return  Object.assign({},{label:ele.branchCode,value:ele.branchId})
    });

    useEffect(() => {
      console.log(images, 'effect >>>')
    },[images])


  // data.forEach(item => {
  //   item.branchCommunication.map(item => {
  //     const {id} = item
  //     const {
  //       addressLine1,
  //       addressLine2,
  //       cityId,
  //     } = item.communication.address;
  //     branches.push({
  //       value: id,
  //       label: addressLine1 + ' ' + addressLine2 + ' ' + cityId,
  //     });
  //   });
  // });

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

  const fetchData = () => {
    // make this 7 dynamic
    const API = `https://test.picktech.in/api/Assignment/GetBranchTSSByUser?userId=${USER_ID}&cmpID=${route.params.company.value}`;
    axios
      .get(API)
      .then(response => {
        setData(response.data);
        console.log(response, 'c');
      })
      .catch(err => console.log(err));
  };
let allImages = []
  const convertImgToBase = img => {
    
    img.map(async image => {
      console.log('before base64',image)
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

    
    if(!clientId || !company || !branchCode || !branchCommunication || !tCode || !transporterCommunication || !siteName || !siteCommunication || !LRnumber || !parcels || !nPR || !mDate || !parcelStatus) {
      Alert.alert("Error","Please fill all the fields")
    } else {
      var data = new FormData();
    data.append('userID', '0');
    data.append('parcel', `{\n"ClientId":${clientId},\n"CompanyId":${company},\n"BranchId":${branchCode},\n"BranchCommunicationId":${branchCommunication},\n"TransporterId":${tCode},\n"TransporterCommunicationId":${transporterCommunication},\n"SiteId":${siteName},\n"SiteCommunicationId":${siteCommunication},\n"LRNumber":"${LRnumber}",\n"NumberOfParcelsInLR":${parcels},\n"NumberOfParcelsReceived":${nPR},\n"ParcelReceivedDate":"${mDate}",\n"ParcelStatusId":${parcelStatus}\n}\n`);
    if(images.length > 0) {
      images.forEach(image => {
        console.log(image,'for loop >>')
        data.append('attachments',image)
      })
    }
    console.log(images,'images check >>>');
    console.log('form data >>>',data)
    
    var config = {
      method: 'post',
      url: 'https://test.picktech.in/api/Transaction/AddParcel',
      headers: {  
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
      data: data,
    };
    
    setLoading(true)
    axios(config)
      .then(function (response) {
        if (response.status == 200) {
          setLoading(false)
          console.log(response,'response >>>>')
          Alert.alert('Success', "Parcel Added Successfully")
          navigation.navigate("DashboardView")
        }
      })
      .catch(function (err) {
        if(err.toString().includes('409')){
          setLoading(false)
          Alert.alert('Error','Duplicate Entry')
        }
      });
    }

    
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
    fetchData();
    fetchStatus();
    if(values.length ==1) {
      filterBranchCommunications();
    }
  
    setCompany(route.params.company.value)
  }, []);

  useEffect(() => {
  filterBranchCommunications(branchCode)
  }, [branchCode])

  return (
    <View style={styles.container}>
      
      <View style={styles.section}>
      <ScrollView>
        <View style={styles.section}>
          {values.length === 1 ? null : (
            <View style={{marginBottom:20}}>
              <DropDown
                values={values}
                style={{backgroundColor: 'white', color: '#6e6c6c'}}
                placeholder="Branch Code"
                onChangeItem={item => {
                  console.log(item)
                  fetchData(item);
                  setBranchCode(item.value);
                  filterBranchCommunications(item.value)
                }}
              />
            </View>
          )}
          {branches.length === 1? null : (
            <View style={{marginBottom: 20}}>
              <DropDown
                values={branches}
                style={{backgroundColor: 'white', color: '#6e6c6c'}}
                placeholder="Branch Communication"
                onChangeItem={item => setBranchCommunication(item.value)}
              />
            </View>
          )}
          <View style={{marginBottom: 20}}>
            
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
            <View style={{marginBottom:20}}>
             
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
            
              <DropDown
                values={transporterCommunications}
                style={{backgroundColor: 'white', color: '#6e6c6c'}}
                placeholder="Transporter Communication"
                onChangeItem={value => setTransportCommunication(value.value)}
              />
            </View>
          )}

          <View style={{marginBottom: 20, width: '100%'}}>
          
            <InputText
              placeholder="LR Number"
              style={{backgroundColor: 'white'}}
              onChangeText={text => setLR(text,'lr')}
            />
          </View>
          <View style={{marginBottom: 20, width: '100%'}}>
          
            <InputText
              placeholder="Number of Parcels in LR"
              style={{backgroundColor: 'white'}}
              onChangeText={text => setNParcels(parseInt(text))}
            />
          </View>
          <View style={{marginBottom: 20, width: '100%'}}>
           
            <InputText
              placeholder="Number of Parcels Received"
              style={{backgroundColor: 'white'}}
              onChangeText={text => setNPR(parseInt(text))}
            />
          </View>
          <View style={{marginBottom: 20, width:"100%"}}>
            <Text style={styles.text} category="label">
              Parcel Received Date
            </Text>
            <Datepicker
            style={{width:"100%"}}
                      placeholder="Parcel Received Date"
                      date={date}
                      onSelect={nextDate => {
                        setDate(nextDate)
                       setMdate(convertDate(nextDate))
                      }}
                    />
          </View>
          <View style={{marginBottom: 20}}>
           
            <DropDown
              values={status}
              style={{backgroundColor: 'white', color: '#6e6c6c'}}
              placeholder="Parcel Status"
              onChangeItem={item => setParcelStatus(item.value)}
            />
          </View>
        </View>
        <View style={{width:"90%", flexDirection:"row"}}>
         <TouchableOpacity style={{padding:10}} onPress={() => {
                ImagePicker.openPicker({
                  multiple: true,
                }).then(images => {
                  setDisplayImage(images)
                  console.log(images,'image picker')
                  convertImgToBase(images);
                });
              }}>
            <Feather name="image" color="black" size={30} />
          </TouchableOpacity>
          
          {/* <Image source /> */}
          <TouchableOpacity style={{padding:10}} onPress={() => {
                ImagePicker.openCamera({
                  width: 300,
                  height: 400,
                  cropping: false
                }).then(image => {
                  setDisplayImage(image)
                  convertImgToBase(image)
                });
              }}>
            <Feather name="camera" color="black" size={30} />
          </TouchableOpacity>
          
         </View>
         <View style={{flexDirection:"row"}}>
         {visibleImages.map(image => {
            return <Image source={{uri:image.path}} style={{width:50, height:50, marginRight:10}} />
          })}
         </View>
        <View style={{width:"100%"}}>
         {isLoading ? <Spinner style={{marginLeft:50}} status="warning" /> :  <Button
            title="Add Parcel"
            onPress={handleSubmit}
            style={{width: '100%', backgroundColor:"#000"}}
          />}
        </View>
         </ScrollView>
      
      </View>
      
      <View style={styles.footer}>
        <TouchableNativeFeedback
          onPress={() => {
            navigation.navigate('DashboardView');
          }}>
          <Feather name="home" size={30} color={colors.black} />
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {
            navigation.navigate('Invoice',{data:route.params.data,company:company ? {value:company} : values[0]});
          }}>
          <IonIcon name="create" size={30} color={colors.black} />
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {
            navigation.navigate('Parcel',{data:route.params.data,company:company ? company : values[0]});
          }}>
          <Feather name="package" size={30} color={colors.black} />
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {
            navigation.navigate('Search',{company:company ? company : values[0]});
          }}>
          <Feather name="search" size={30} color={colors.black} />
        </TouchableNativeFeedback>
      </View>
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white",
  },
  section: {
    flex: 8,
    width: '100%',
    paddingTop: 20,
    alignItems:"center"
  },

  text: {
    fontSize: 16,
    marginBottom: 4,
    marginLeft: 5,
    marginTop: 10,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 6,
    borderWidth:1,
    borderColor:"#ccc"
  }
});

export default Parcel;
