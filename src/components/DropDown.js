import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';


const DropDown = ({style,onChangeItem,values,value, ...otherProps})=> {

    

      
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
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={onChangeItem}
          />
        </>
    )
}

export default DropDown;