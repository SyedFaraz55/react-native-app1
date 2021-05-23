import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import colors from '../config/constants/colors';
import {useStoreState, useStoreActions} from 'easy-peasy';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {Card, Text as TextComponent} from '@ui-kitten/components';
import {fetchData, fetchStatus} from '../api/index';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
});

const DashboardView = () => {
  const Storedata = useStoreState(state => state.store.data);
  const userData = useStoreState(state => state.store.userData);
  console.log(userData,'ehichs');
  const [companyId, setCompanyId] = useState(
    useStoreState(state => state.store.company),
  );
  const setCompanyStore = useStoreActions(
    actions => actions.store.setCompanyStore,
  );

  const setUserData = useStoreActions(
    actions => actions.store.setUserData,
  );

  const [data, setData] = useState([]);

  const [label, setLabel] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [values, setValues] = useState([]);

  useEffect(async () => {
    const values = Storedata.userCompanyUser.map(ele => ({
      label: ele.companyCode,
      value: ele.companyId,
    }));
    setValues(values);
    setCompanyId(values[0]);
    setCompanyStore(values[0]);
    setLabel(values[0].label);
    fetchStatus();
  }, []);

  useEffect(() => {
    if (data.id) {
      fetchData(Storedata.id, companyId.value, setUserData);
    }

  }, [data]);

  useEffect(async () => {
    storage.save({
      id: '1001',
      key: 'companyId',
      data: companyId,
    });

    if (data.id) {
      fetchData(Storedata.id, companyId.value, setUserData);
      
    }

    fetchData(Storedata.id, companyId.value, setUserData);
    
  }, [companyId]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcon name="dashboard" size={30} color="black" />
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            color: '#000',
            marginLeft: 10,
          }}>
          Dashboard
        </Text>
        <View>
          <TouchableOpacity
            style={styles.picker}
            onPress={() => setModalVisible(true)}>
            <Text style={{color: '#fff', textAlign: 'center'}}>{label}</Text>
          </TouchableOpacity>
          <Modal
            presentationStyle="pageSheet"
            style={{backgroundColor: 'white'}}
            visible={modalVisible}
            animationType="slide">
            <View>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    marginVertical: 10,
                    color: '#ccc',
                  }}>
                  Select Company
                </Text>
              </View>
              {values.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setCompanyStore(item);
                      setCompanyId(item);
                      setModalVisible(false);
                      setLabel(item.label);
                    }}
                    style={{}}
                    key={item.value}>
                    <Text
                      style={{
                        padding: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: '#eee',
                      }}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Modal>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.cardComponent}>
          <View>
            <Card
              style={{
                backgroundColor: '#2a9d8f',
                marginTop: 10,
                width: 190,
                borderRadius: 10,
              }}>
              <TextComponent category="h6" style={{color: 'white'}}>
                Stock Not Received
              </TextComponent>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Feather name="package" size={20} color="white" />
                <TextComponent style={{color: 'white', marginLeft: 10}}>
                  20
                </TextComponent>
              </View>
            </Card>
          </View>
          <View>
            <Card
              style={{
                backgroundColor: '#e76f51',
                width: 190,
                marginTop: 10,
                borderRadius: 10,
              }}>
              <TextComponent category="h6" style={{color: 'white'}}>
                Invoice Not Received
              </TextComponent>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Feather name="package" size={20} color="white" />
                <TextComponent style={{color: 'white', marginLeft: 10}}>
                  15
                </TextComponent>
              </View>
            </Card>
          </View>
        </View>
        <View style={styles.cardComponent}>
          <View>
            <Card
              style={{
                backgroundColor: '#f4a261',
                marginTop: 10,
                width: 190,
                borderRadius: 10,
              }}>
              <TextComponent category="h6" style={{color: 'white'}}>
                Total Damage Parcels
              </TextComponent>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Feather name="package" size={20} color="white" />
                <TextComponent style={{color: 'white', marginLeft: 10}}>
                  20
                </TextComponent>
              </View>
            </Card>
          </View>
          <View>
            <Card
              style={{
                backgroundColor: '#ef476f',
                width: 190,
                marginTop: 10,
                borderRadius: 10,
              }}>
              <TextComponent category="h6" style={{color: 'white'}}>
                Stock Exceed Delivery time
              </TextComponent>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Feather name="package" size={20} color="white" />
                <TextComponent style={{color: 'white', marginLeft: 10}}>
                  15
                </TextComponent>
              </View>
            </Card>
          </View>
        </View>
        <View>
          <Card
            style={{
              backgroundColor: '#2b2d42',
              marginTop: 10,
              borderRadius: 10,
            }}>
            {/* <TextComponent category="h6" style={{color:"white"}}>Stock Exceed Delivery time</TextComponent> */}
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <TextComponent style={{color: 'white'}}>
                Invoice Received Today: 50
              </TextComponent>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <TextComponent style={{color: 'white'}}>
                Invoice Received This Week: 30
              </TextComponent>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <TextComponent style={{color: 'white'}}>
                Invoice Received This Month: 10
              </TextComponent>
            </View>
          </Card>
        </View>
        <View>
          <Card
            style={{
              backgroundColor: '#3d5a80',
              marginTop: 10,
              borderRadius: 10,
            }}>
            {/* <TextComponent category="h6" style={{color:"white"}}>Stock Exceed Delivery time</TextComponent> */}
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <TextComponent style={{color: 'white'}}>
                Invoice Received Today: 50
              </TextComponent>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <TextComponent style={{color: 'white'}}>
                Invoice Received This Week: 30
              </TextComponent>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <TextComponent style={{color: 'white'}}>
                Invoice Received This Month: 10
              </TextComponent>
            </View>
          </Card>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    padding: 10,
    backgroundColor: colors.yellow,
  },
  section: {
    flex: 12,
    backgroundColor: '#fff',
    marginTop: 30,
  },
  cardComponent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  rSec: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: 80,
  },
  rtop: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  rsub: {},
  pickerSelect: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: 150,
    borderRadius: 5,
    marginLeft: 80,

    color: '#ffff',
  },
  picker: {
    marginLeft: 100,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 10,
    width: 120,
    textAlign: 'center',
  },
});

export default DashboardView;
