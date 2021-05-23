import React from 'react';
import {View} from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';

import Login from '../screens/Login';
import DashboardView from '../screens/DashboardView';
import Invoice from '../screens/Invoice';
import Parcel from '../screens/Parcel';
import Search from '../screens/Search';
import colors from '../config/constants/colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DashboardView"
        component={TabNavigation}
        options={{headerShown:false}}
      />
    </Stack.Navigator>
  );
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="DashboardView"
      tabBarOptions={{
        showLabel: false,
        activeTintColor: colors.primary,
        inactiveTintColor: colors.light,
        keyboardHidesTabBar:true,
        style:{
            height:60,
            backgroundColor:colors.black
        }
      }}
      >
      <Tab.Screen name="DashboardView" component={DashboardView} options={{
          tabBarIcon:({focused})=> (
             <View>
                 <Feather name="home" size={30}  color={focused ? colors.yellow : colors.white} />
             </View>
          )
      }} />
      <Tab.Screen name="Invoice" component={Invoice} options={{
          
          tabBarIcon:({focused})=> (
             <View>
                 <IonIcon name="create-outline" size={30}  color={focused ? colors.yellow : colors.white} />
             </View>
          )
      }} />
       <Tab.Screen name="Parcel" component={Parcel} options={{
          tabBarIcon:({focused})=> (
             <View>
                 <Feather name="package" size={30}  color={focused ? colors.yellow : colors.white} />
             </View>
          )
      }} />
       <Tab.Screen name="Search" component={Search} options={{
          tabBarIcon:({focused})=> (
             <View>
                 <Feather name="search" size={30}  color={focused ? colors.yellow : colors.white} />
             </View>
          )
      }} />
       <Tab.Screen name="Reports" component={Invoice} options={{
          tabBarIcon:({focused})=> (
             <View>
                 <Feather name="file" size={30}  color={focused ? colors.yellow : colors.white} />
             </View>
          )
      }} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={LoginStack}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
