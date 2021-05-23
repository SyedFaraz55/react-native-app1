import {action} from 'easy-peasy'
const UserModel ={
    data:[],
    userData:[],
    company:{},
    addData:action((state,payload)=> {
        state.data = payload
    }),
    setCompanyStore:action((state,payload) => {
      state.company = payload
    }),
    setUserData:action((state,payload)=>{
        state.userData = payload
    })
}


export default storeModel = {
    store:UserModel
}