import React from 'react';
import {testStore ,uitStore} from "./stores";

export const stores = Object.freeze({
  mainStore: new testStore(),
  uitStore: new uitStore()
});

export const StoresContext = React.createContext(stores);

// this will be the function available for the app to connect to the stores
export const useStores = () => React.useContext(StoresContext);

export const StoresProvider = StoresContext.Provider;