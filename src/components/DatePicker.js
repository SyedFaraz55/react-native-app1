import React from 'react';
import DatePicker from 'react-native-datepicker';
import colors from '../config/constants/colors';
import {Text} from 'react-native'
const DatePickerComponent = ({style,onDateChange,placeholder,...otherProps}) => {
  return (
    <>
    <Text style={{color:"#6e6c6c"}} >{placeholder}</Text>
      <DatePicker
        style={{
          width: 350,
          backgroundColor:colors.white,
        }}
        
        placeholder={placeholder}
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon={false}
        onDateChange={onDateChange}
       
      />
    </>
  );
};


export default DatePickerComponent;
