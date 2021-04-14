import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableNativeFeedback,
  ActivityIndicator,
} from 'react-native';
import colors from '../config/constants/colors';
import {H1} from '../components/H1';
import InputText from '../components/InputText';
// import Button from '../components/Button';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {Formik} from 'formik';
import {Text, Input, Button} from '@ui-kitten/components';

const Login = ({navigation}) => {
  const [isLoading, setLoading] = useState(false);

  const authenticate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('DashboardView');
    }, 1000);
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
          initialValues={{username: '', password: '', clientCode: ''}}
          onSubmit={values => console.log(values)}>
          {({handleSubmit, handleChange, errors}) => (
            <>
              <Input
                placeholder="Username"
                size="large"
                style={{width: '80%', marginBottom: 10}}
              />
              <Input
                placeholder="Password"
                size="large"
                style={{width: '80%', marginBottom: 10}}
                secureTextEntry
              />
              <Input
                placeholder="Client Code"
                size="large"
                style={{width: '80%', marginBottom: 10}}
              />
              <Button
                onPress={() => navigation.navigate('DashboardView')}
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
