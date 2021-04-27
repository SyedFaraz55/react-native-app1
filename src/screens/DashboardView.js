import React, { useState, useEffect } from 'react';
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
import { Card, Text as TextComponent } from '@ui-kitten/components';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const DashboardView = ({navigation, route}) => {
  const {userCompanyUser} = route.params.data;
  const [companyId,setCompany] = useState();
  const values = userCompanyUser.map(ele => (
    {
      label:ele.companyCode,
      value:ele.companyId
    }
  ))


  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcon name="dashboard" size={30} color="black" />
        <Text style={{fontSize: 20, fontWeight:"700", color: '#000', marginLeft: 10}}>
          Dashboard
        </Text>
        
      </View>
      <View style={{marginLeft:10,marginTop:12}}>
        <Text style={{fontSize:11, fontWeight:"500",color:"#000",marginBottom:5}}>Compnay</Text>
       <DropDown
            items={values}
            defaultValue={values[0].value}
            style={{backgroundColor: "white", color: '#6e6c6c',width:"50%"}}
            placeholder="Select Company"
            onChangeItem={item => setCompany(item)}
          />
        </View>
      <View style={styles.section}>
       <Card style={{backgroundColor:"#292E49", marginTop:15,borderRadius:10}}>
          <TextComponent category="h6" style={{color:"white"}}>Stock Not Received</TextComponent>
          <View style={{flexDirection:"row", marginTop:10}}>
            <Feather name="package" size={20} color="white" />
            <TextComponent style={{color:"white", marginLeft:10}}>20</TextComponent>
          </View>
       </Card>
       <Card style={{backgroundColor:"#00416A", marginTop:15,borderRadius:10}}>
          <TextComponent category="h6" style={{color:"white"}}>Invoice Not Received</TextComponent>
          <View style={{flexDirection:"row",marginTop:10}}>
            <FontAwesome5 name="file-invoice" size={20} color="white" />
             <TextComponent style={{color:"white", marginLeft:10}}>20</TextComponent>
          </View>
       </Card>
       <Card style={{backgroundColor:"#0F2027", marginTop:15, borderRadius:10}}>
          <TextComponent category="h6" style={{color:"white"}}>Parcels exceed max delivery time</TextComponent>
          <View style={{flexDirection:"row",marginTop:10}}>
            <MaterialIcon name="access-time" size={20} color="white" />
             <TextComponent style={{color:"white", marginLeft:10}}>20</TextComponent>
          </View>
       </Card>
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
            navigation.navigate('Invoice',{data:route.params.data,company:companyId ? companyId : values[0]});
          }}>
          <IonIcon name="create" size={30} color={colors.white} />
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {
            navigation.navigate('Parcel',{data:route.params.data,company:companyId ? companyId : values[0]});
          }}>
          <Feather name="package" size={30} color={colors.white} />
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {
            navigation.navigate('Search',{company:companyId ? companyId : values[0]});
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
    padding:10,
    backgroundColor:"#E9C46A"
  },
  section: {
    flex: 12,
    backgroundColor:"#fff",
   padding:10
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
