import React, {useEffect,useState} from 'react';
import {StyleSheet, View, ScrollView, Alert} from 'react-native';
import {TabBar, Tab, Layout, Text, Input, Button,Spinner} from '@ui-kitten/components';
import Card from '../components/Card'
import axios from 'axios'
export default function ParcelSearch({id,navigation}) {
  const [custom,setCustom] = useState([]);
  const [searchKey,setSearchKey] = useState();
  const [isLoading,setLoading] = useState();
  const [companyId, setCompanyId] = useState();
  const [data,setData] = useState([]);

  const search = async _=> {
    const API = `https://test.picktech.in/api/Transaction/GetAllParcelsByCompany?cmpID=${id}`;
    const response = await axios.get(API)
    const json = await response.data;
    setData(json);
    setLoading(false)
    console.log(json)
  }


  const searchInvoice = async () => {
    
    const API = `https://test.picktech.in/api/Transaction/GetParcelByLRNumber/?cmpID=${id}&lrNumber=${searchKey}`;
    const response = await axios.get(API)
    const json = await response.data;
    console.log(
      json
    );
    setCustom(json)
    if(json.length  < 1) {
      Alert.alert('Error',`No Parcel Found with ${searchKey}`)
    }
   
  }
 
  useEffect(()=>{
   search();
  //  setLoading(true)
  },[])
  return (
    <Layout style={styles.container}>
    <View style={styles.search}>
      <View style={styles.input}>
        <Input
          placeholder="Parcel Search"
          onChangeText={text => setSearchKey(text)}
        />
      </View>
      <View style={styles.searchButton}>
        <Button onPress={searchInvoice} style={{backgroundColor:"#000", borderColor:"#000"}}>Search</Button>
      </View>
    </View>
    <ScrollView style={styles.results}>
    <View style={{alignItems:"center"}}>
          {isLoading ? <Spinner size="large" status="warning" />: null}
        </View>
        {custom.length > 0
          ? custom.map((invoice, index) => (
              <Card
              onPress={() => navigation.navigate('parcelView',{data:invoice})}
              key={index}
                style={styles.card}
                title={invoice.lrnumber}
                invoiceDate={invoice.parcelReceivedDate.split('T')[0]}
                ></Card>
            ))
          : <Card
          style={styles.card}
          title="LR8872"
          invoiceDate="2021-02-10"
         ></Card>}
    </ScrollView>
  </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search:{
      flexDirection :"row",
      padding:14,
      justifyContent:"center",
      alignItems:"center"
  },
  input:{
      flex:2,
      marginRight:10
  },
  searchButton:{
      flex:1
  },
  results:{
      padding:14
  },
  card:{
      marginBottom:20
  },
  cardBody:{
    flexDirection:"row",
    alignItems:"center",
  },
  heading:{
    fontWeight:"600",
    fontSize:17
  },
  value:{
    marginLeft:8,
    
  }
});

