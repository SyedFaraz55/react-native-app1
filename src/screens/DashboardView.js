import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import colors from '../config/constants/colors';
import {H1} from '../components/H1';

import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'


const DashboardView = ({navigation}) => {
  return (
    <View style={styles.container}>
     <View style={styles.header}>
        <MaterialIcon name="dashboard" size={30} color="#fff" />
        <Text style={{fontSize:20,color:"#fff", marginLeft:10}} >Dashboard</Text>
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
          <Feather name="home" size={30} color={colors.primary} />
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {
            navigation.navigate('Invoice');
          }}>
          <IonIcon name="create" size={30} color={colors.primary} />
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {
            navigation.navigate('Parcel');
          }}>
          <Feather name="package" size={30} color={colors.primary} />
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {
            navigation.navigate('Parcel');
          }}>
          <Feather name="search" size={30} color={colors.primary} />
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  header: {
    flex: 1,
    flexDirection:"row",
    backgroundColor: colors.primary,
    alignItems:"center",
    paddingLeft: 20,
  },
  section: {
    flex: 12,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 6,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});

export default DashboardView;
