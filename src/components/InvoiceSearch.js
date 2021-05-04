import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {TabBar, Tab, Layout, Text, Input, Button,Card,Spinner} from '@ui-kitten/components';
import axios from 'axios';
export default function InvoiceSearch({id}) {
  const [searchKey,setSearchKey] = useState();
  const [companyId, setCompanyId] = useState();
  const [isLoading,setLoading] = useState();
  const [custom,setCustom] = useState([]);
  const [data,setData] = useState([]);
  useEffect(()=> {
    search();
  },[])

  const search = async _=> {
    const API = `https://test.picktech.in/api/Transaction/GetAllInvoicesByCompany?cmpID=${id}`;
    const response = await axios.get(API)
    const json = await response.data;
    
    const data = json.map(({invoiceNumber,invoiceDate,lrnumber,invoiceStatus,parcelStatus}) =>{
        return {
            invoiceNumber,
            invoiceDate,
            lrnumber,
            invoiceStatus,
            parcelStatus
        }
    })
    setData(data)
    setLoading(false)
  }

  const searchInvoice = async () => {
    const API = `https://test.picktech.in/api/Transaction/GetInvoiceByNumber/?cmpID=${id}&invoiceNumber=${searchKey}`;
    const response = await axios.get(API)
    const json = await response.data;
    if(json.length < 1 ){
      Alert.alert("Error",`No Invoice found with ${searchKey}`)
    }
    const data = json.map(({invoiceNumber,invoiceDate,lrnumber,invoiceStatus,parcelStatus}) =>{
      return {
          invoiceNumber,
          invoiceDate,
          lrnumber
      }
  })
  setCustom(data)
   
  }

  useEffect(() => {
  setCompanyId(id);
  setLoading(true)
  },[])

  return (
    <Layout style={styles.container}>
      <View style={styles.search}>
        <View style={styles.input}>
          <Input
            placeholder="Invoice Search"
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
        {custom.length > 0 ? custom.map((invoice,index) => (
               <Card key={index} style={styles.card}>
                   <View style={styles.cardBody}>
                     <Text category="label" style={styles.heading}>Invoice Number:</Text>
                     <Text category="p1"style={styles.value}>{invoice.invoiceNumber}</Text>
                   </View>
                   <View style={styles.cardBody}>
                     <Text category="p1" style={styles.heading}>Invoice Date:</Text>
                     <Text category="p1"style={styles.value}>{invoice.invoiceDate.split('T')[0]}</Text>
                   </View>
                   <View style={styles.cardBody}>
                     <Text category="p1" style={styles.heading}>LR Number:</Text>
                     <Text category="p1"style={styles.value}>{invoice.lrnumber}</Text>
                   </View>
               </Card>
        )) : data.map((invoice,index) => (
               <Card key={index} style={styles.card}>
                   <View style={styles.cardBody}>
                     <Text category="label" style={styles.heading}>Invoice Number:</Text>
                     <Text category="p1"style={styles.value}>{invoice.invoiceNumber}</Text>
                   </View>
                   <View style={styles.cardBody}>
                     <Text category="p1" style={styles.heading}>Invoice Date:</Text>
                     <Text category="p1"style={styles.value}>{invoice.invoiceDate.split('T')[0]}</Text>
                   </View>
                   <View style={styles.cardBody}>
                     <Text category="p1" style={styles.heading}>LR Number:</Text>
                     <Text category="p1"style={styles.value}>{invoice.lrnumber}</Text>
                   </View>
                   <View style={styles.cardBody}>
                     <Text category="p1" style={styles.heading}>Invoice Status:</Text>
                     <Text category="p1"style={styles.value} status={invoice.invoiceStatus == 'Received' ? "success" : "warning"} >{invoice.invoiceStatus}</Text>
                   </View>
                   <View style={styles.cardBody}>
                     <Text category="p1" style={styles.heading}>Parcel Status:</Text>
                     <Text category="p1"style={styles.value} status={invoice.parcelStatus == 'Received' ? "success" : "warning"} >{invoice.parcelStatus}</Text>
                   </View>
               </Card>
        ))}


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
