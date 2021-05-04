import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../config/constants/colors';

const DropDown = ({style, onChangeItem, values, value, ...otherProps}) => {
  return (
    <>
      <DropDownPicker
        items={values}
        {...otherProps}
        containerStyle={{height: 40, width: 350}}
        style={style}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={{backgroundColor: colors.white}}
        onChangeItem={onChangeItem}
        
      />
    </>
  );
};

export default DropDown;
