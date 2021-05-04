import React, {useState} from 'react';
import { create } from 'apisauce'
import {
  View,
  StyleSheet,
  TextInput,
  TouchableNativeFeedback,
  ActivityIndicator,
  Alert,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {} from 'apisauce';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../config/constants/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {Formik} from 'formik';
import { Text as TextComponent, Input, Button, Spinner} from '@ui-kitten/components';
import axios from 'axios';


const api = create({
  baseURL: 'https://test.picktech.in',
})

const Login = ({navigation}) => {
  const [isLoading,setLoading] = useState(false);
  const authenticate = values => {

    setLoading(true)
    const {Username, Password, ClientCode} = values;
    
    axios.post('https://test.picktech.in/api/Account/Authenticate', {
      ClientCode: ClientCode.toUpperCase(),
      Username,
      Password,
    })
    .then(function (response) {
      if(response.status === 200) {
        const data = response.data;
        console.log(data,'global data')
        setLoading(false);
        navigation.navigate("DashboardView",{data})
      } 
    })
    .catch(function (error) {
      setLoading(false);
      Alert.alert("Error","Invalid Credentials")
    });
   
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../res/login.png')} />
        <View style={styles.tagline}>
          <Text style={styles.title}>IP Tracking</Text>
          <Text style={styles.subtitle}>Track your parcels with ease</Text>
        </View>
      </View>

      <View style={styles.footer}>
       
        <Formik
          initialValues={{Username: 'raju', Password: 'raju', ClientCode: 'kusumanchi'}}
          onSubmit={values => authenticate(values)}>
          {({handleSubmit, handleChange, errors}) => (
            <>
              <Input
                placeholder="Username"
                size="large"
                style={{width: '80%', marginBottom: 10}}
                onChangeText={handleChange('Username')}
              />
              <Input
                placeholder="Password"
                size="large"
                style={{width: '80%', marginBottom: 10}}
                secureTextEntry
                onChangeText={handleChange('Password')}
              />
              <Input
                placeholder="Client Code"
                size="large"
                style={{width: '80%', marginBottom: 10}}
                onChangeText={handleChange('ClientCode')}
              />
          {isLoading  ? <Spinner size="large" status="warning" />:<TouchableOpacity onPress={handleSubmit} >
             <View style={styles.circleButton} >
              <AntDesign name="arrowright" size={30} color="#fff" />
             </View>
            </TouchableOpacity>}
            </>
          )}
        </Formik>
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
    flex:1.3,
    backgroundColor:"#E9C46A",
    justifyContent:"center",
    alignItems:"center",
    marginTop:-30
  },
  footer:{
    flex:1,
    marginTop:50,
    backgroundColor:"#fff",
    alignItems:"center"
  },
tagline:{
 
},
title:{
  fontFamily:"Poppins",
 fontSize:35,
textAlign:"center"
},
subtitle:{
  fontFamily:"Poppins",
 fontSize:16,
 textAlign:"center",
 color:"#585858",
 fontWeight:"600"
},
  circleButton: {
    backgroundColor:"#000",
    padding:10,
    borderRadius:50,
    marginTop:20
  },
});

export default Login;
