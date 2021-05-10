import React from 'react'
import { StyleSheet,  View,TouchableOpacity } from 'react-native'
import {Text} from '@ui-kitten/components';
import Feather from 'react-native-vector-icons/Feather';

export default function Card({title,invoiceDate,invoiceStatus,parcelStatus,lr,onPress}) {
    return (
        <View style={{marginTop:10,backgroundColor:"#fff",padding:10,flexDirection:"row", justifyContent:"space-between",borderWidth:1, borderColor:"#eee", borderRadius:4}} >
        <View>
          <Text style={{fontWeight:"700", fontSize:16,color:"#343A41", marginBottom:6}}>{title}</Text>
          <Text style={{marginBottom:5}}>Invoice Date: {invoiceDate}</Text>
          {lr && <Text style={{marginBottom:5}}>LR Number: {lr}</Text>}
          {parcelStatus && <View style={{flexDirection:"row", marginBottom:5}}>
            <Text>Parcel Status: </Text>
            <Text status={parcelStatus == 'Received' ? 'Success':'danger'} >{parcelStatus}</Text>
          </View>}
         {invoiceStatus &&  <View style={{flexDirection:"row"}}>
            <Text>Invoice Status: </Text>
            <Text status={parcelStatus == 'Received' ? 'Success':'danger'}  >{invoiceStatus}</Text>
          </View>}
        </View>
        <View style={{justifyContent:"flex-end"}}>
         <TouchableOpacity onPress={onPress}>
            <View style={{width:30,height:30, borderRadius:50, backgroundColor:"#000", justifyContent:"center", alignItems:"center"}} >
              <Feather name="arrow-right" color="#fff" size={18} />
            </View>
         </TouchableOpacity>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({})
