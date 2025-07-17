'use client';
import { setupListeners } from '@reduxjs/toolkit/query';

import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
  
import { makeStore } from './store';
 
 
export const StoreProvider = ({ children } ) => {
  const storeRef = useRef(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }
  useEffect(() => {
    if (storeRef.current != null) {
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);
   
  return <Provider store={storeRef.current}> {children}</Provider>;
};