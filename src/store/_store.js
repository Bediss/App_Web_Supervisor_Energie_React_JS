import React from 'react';
import { makeAutoObservable } from "mobx";
// import { makeAutoObservable, } from "mobx-react-lite";

import axios from '../../src/components/axios'
class testStore {
  name = "test";
  role=""
  user={}
  constructor() {
    makeAutoObservable(this);
  }
 

  setUser = async() => {
    

  return axios.get(window.apiUrl + "getUser/")
  .then(
      (result) => {
        if (result.status == 200) {
      //    document.querySelector("body").classList.remove("isLoading")
        this.user = result.data;
        return result.data
        }
      }
  )
  .catch(({response})=>{
                        
    console.log("---------",response)
    if(response!=null){
 if (response.status=="401"){
     // document.querySelector("body").classList.remove("isLoading")
      window.location.assign("/")
      localStorage.clear();
  }
    
 }
}
)

  };

  // setUserType = (role) => {
  //   this.role = role;
  // };
  getUserType  = () => {
    return this.user.userType;
  };


  /*********************************** */
  setUserName = (name) => {
    this.name = name;
  };
  getUserName = () => {
    return this.name;
  };
}


class RootStore {
  constructor() {
    this.testStore = new testStore(this)
  }
}

export const RootStoreMain=new RootStore()


const StoresContext = React.createContext(RootStoreMain);

// this will be the function available for the app to connect to the stores
export const useStores = () => React.useContext(StoresContext);

