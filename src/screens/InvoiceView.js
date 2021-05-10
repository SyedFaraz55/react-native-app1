import React from 'react'
import { StyleSheet, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import {Text} from '@ui-kitten/components'

export default function Edit({navigation,route}) {
    console.log(route.params.data);
    const {invoiceDate,invoiceNumber,lrnumber} = route.params.data
    return (
        <View style={{flex:1,justifyContent:"space-between"}}>
           <View>
           <View style={{padding:10}}>
                <Text category="h6" style={{borderBottomWidth:1, borderColor:"#ccc", paddingBottom:6}}>Invoice Information</Text>
            </View>
            <View style={{padding:10}}>
                <Text category="h6" style={styles.text}>Invoice Number: {invoiceNumber}</Text>
                <Text category="h6" style={styles.text}>Invoice Received: {invoiceDate}</Text>
                <Text category="h6" style={styles.text}>LR Number: {lrnumber}</Text>
            </View>
            
         
           </View>
            <View style={{
               justifyContent:"center",
               alignItems:"center"
            }}>
             
             <TouchableOpacity onPress={() => navigation.navigate('InvoiceEdit',{data:route.params.data})} style={{backgroundColor:"#000", width:"90%", marginBottom:30, padding:10, alignItems:"center", borderRadius:6}}>
                   <Text style={{color:"#fff"}}>Edit</Text>
               </TouchableOpacity>
             
            </View>
        </View>
    )
}
 
const styles = StyleSheet.create({
    text:{
        marginBottom:5
    }
})
