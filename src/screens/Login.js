import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableNativeFeedback,
  ActivityIndicator,
  Alert,
} from 'react-native';
import colors from '../config/constants/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {Formik} from 'formik';
import {Text, Input, Button} from '@ui-kitten/components';
import axios from 'axios';

const Login = ({navigation}) => {
  const authenticate = values => {

    const {Username, Password, ClientCode} = values;
    
    axios.post('http://test.picktech.in/api/Account/Authenticate', {
      ClientCode: ClientCode.toUpperCase(),
      Username,
      Password,
    })
    .then(function (response) {
      if(response.status === 200) {
        const data = response.data;
        navigation.navigate("DashboardView",{data})
      } 
    })
    .catch(function (error) {
      Alert.alert("Error","Invalid Credentials")
    });
   
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.header}>
          <MaterialIcon name="dashboard" size={40} color={colors.primary} />
          <Text style={{marginLeft: 6}} category="h1">
            Login
          </Text>
        </View>
        <Formik
          initialValues={{Username: '', Password: '', ClientCode: ''}}
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
              <Button
                onPress={handleSubmit}
                style={{width: '80%', backgroundColor: colors.primary}}>
                LOGIN
              </Button>
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
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  form: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;
