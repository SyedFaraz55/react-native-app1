import React from 'react';
import * as eva from '@eva-design/eva';

import { ApplicationProvider } from '@ui-kitten/components';
import AppNavigator from './Navigation';
import {StoreProvider} from 'easy-peasy';
import store from '../src/store/index'

const App = ()=> {
 
  return (
     <StoreProvider store={store}>
       <AppNavigator />
     </StoreProvider>
  )
}

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <App />
  </ApplicationProvider>
);

