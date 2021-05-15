import axios from 'axios';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native'

const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
  });
  
  export const fetchData = (userId,companyId) => {
      

      
    const API = `https://test.picktech.in/api/Assignment/GetBranchTSSByUser?userId=${userId}&cmpID=${companyId}`;
    axios
      .get(API)
      .then(response => {
        AsyncStorage.setItem('state',JSON.stringify(response.data))
      })
      .catch(err => console.log(err));

      
    };

  export const fetchStatus = () => {
    axios
      .get('https://test.picktech.in/api/Definition/GetAllStatus')
      .then(response => {
        const values = response.data.map(ele => ({
          label: ele.name,
          value: ele.id,
        }));

        AsyncStorage.setItem('status',JSON.stringify(values))
      })
      .catch(err => console.log(err));
  };




  export const addInvoice =  (values,payload,navigation) => {  
    console.log('payload >>>',payload)
      axios.post('https://test.picktech.in/api/Transaction/AddInvoice',payload)
      .then(response => {
        if(response.status == 200) {
          
          Alert.alert('Success',"Invoice Added",[{
            text:"OK",
            onPress:()=> navigation.navigate('DashboardView')
          }])
          
        }
        console.log('response >>', response);
      })
      .catch(err =>{
        console.log(err)
        if(err.toString().includes('409')){
          
          Alert.alert('Error','Duplicate Entry')
        }
      })
    

  
   
  };