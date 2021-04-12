import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import colors from '../config/constants/colors';

const InputText = ({
 style,
 ...otherProps
}) => {
  return (
    <>
      <TextInput
        style={[styles.textInput, style]}
        {...otherProps}
      />
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 6,
    paddingLeft: 12,
    borderColor: colors.light,
    color: '#6e6c6c',
    backgroundColor: colors.light,
    borderColor: colors.light,
    fontSize: 15,
    fontFamily:"inherit"
  },
});

export default InputText;
