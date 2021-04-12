import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableNativeFeedback,
  ActivityIndicator,
} from 'react-native';
import colors from '../config/constants/colors';
import {H1} from '../components/H1';
import InputText from '../components/InputText';
import Button from '../components/Button';

import {Formik} from 'formik';

const Login = ({navigation}) => {

  const [isLoading, setLoading] = useState(false);

  const authenticate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('DashboardView');
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <H1 size={30} color={colors.primary} mt={10}>
          Login
        </H1>
        <Formik
          initialValues={{username: '', password: '', clientCode: ''}}
          onSubmit={values => console.log(values)}>
          {({handleSubmit, handleChange, errors}) => (
            <>
              <InputText
                style={{width: '80%', marginBottom: 14}}
                placeholder="Username"
                onChangeText={handleChange('username')}
              />
              <InputText
                style={{width: '80%', marginBottom: 14,fontFamily:"inherit"}}
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange('password')}
              />
              <InputText
                style={{width: '80%', marginBottom: 14}}
                placeholder="Client Code"
                onChangeText={handleChange('clientCode')}
              />
              <Button title="Login" onPress={()=> {
                 handleSubmit()
                 authenticate()
              }} />
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
    backgroundColor: colors.secondary,
  },
  form: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;
