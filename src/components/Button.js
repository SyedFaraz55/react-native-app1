import React from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';
import colors from '../config/constants/colors';
const Button = ({title,style,onPress}) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={[styles.button,style]}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginVertical: 10,
      },
      buttonText: {
        color: 'white',
        fontSize: 25,
      },
});

export default Button;
