import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import colors from '../config/constants/colors';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import DropDown from '../components/DropDown';


const DashboardView = ({navigation, route}) => {
  const {userCompanyUser} = route.params.data;
  const [company,setCompany] = useState();
  const values = userCompanyUser.map(ele => (
    {
      label:ele.companyCode,
      value:ele.companyId
    }
  ))


  

  
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcon name="dashboard" size={30} color={colors.primary} />
        <Text style={{fontSize: 20, color: '#000', marginLeft: 10}}>
          Dashboard
        </Text>
        <View style={{marginLeft:50}}>
        {values.length  == 1 ?
        <View style={styles.rSec}>
          <Text style={styles.rtop}>Company</Text>
          <Text style={styles.rsub}>{values[0].label}</Text>
        </View>:<DropDown
            items={values}
            style={{backgroundColor: "white", color: '#6e6c6c',width:"50%"}}
            placeholder="Select Company"
            onChangeItem={item => setCompany(item)}
          />}
        </View>
      </View>
      <View style={styles.section}>
        <Image
          source={require('../res/noData.png')}
          style={{
            width: 200,
            height: 200,
          }}
        />
      </View>
      <View style={styles.footer}>
        <TouchableNativeFeedback
          onPress={() => {
            navigation.navigate('DashboardView');
          }}>
          <Feather name="home" size={30} color={colors.white} />
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {
            navigation.navigate('Invoice',{data:route.params.data,company:company ?company :  values[0]});
          }}>
          <IonIcon name="create" size={30} color={colors.white} />
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {
            navigation.navigate('Parcel',{data:route.params.data,company:company ?company :  values[0]});
          }}>
          <Feather name="package" size={30} color={colors.white} />
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {
            navigation.navigate('Search',{company:company ?company :  values[0]});
          }}>
          <Feather name="search" size={30} color={colors.white} />
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff"
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft:20,
    paddingTop:10,
    
  },
  section: {
    flex: 12,
    backgroundColor:"#fff",
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "#000",
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 6,
  
  },
  rSec:{
    flex:1,
    alignItems:"flex-end",
    justifyContent:"center",
    marginLeft:80
    
  },
  rtop:{
    fontSize:12,
    fontWeight:'bold'
  },
  rsub:{
    
  }
});

export default DashboardView;
