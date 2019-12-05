import { useState, useEffect } from 'react';
import _ from 'lodash';

declare global {
  interface Window { 
    __STATE__: any;
    __INITIAL_STATE__: any;
  }
}

class Store extends EventTarget {
  store: any = {};

  constructor() {
    super();

    if (window.__INITIAL_STATE__) {
      this.store = typeof window.__INITIAL_STATE__ === 'string' ? JSON.parse(window.__INITIAL_STATE__) : window.__INITIAL_STATE__;
    }
  }

  set(key: string, value: any) {
    _.set(this.store, key, value);
    const event = new CustomEvent(key, {
      detail: value
    });

    this.dispatchEvent(event);
  }

  get<T>(key: string, defaultValue: any = {}): T | any {
    return _.get(this.store, key, defaultValue);
  }
}

const store = new Store();


export const useStore = <T>(key: string, initialState = {}) => {
  if (store.get(key, null) === null) {
    store.set(key, initialState);
  }

  const stateSetter = useState()[1];

  useEffect(() => {
    const setStateCallBack = (e: Event) => {
      stateSetter((e as CustomEvent).detail);
    }

    store.addEventListener(key, setStateCallBack);

    return () => store.removeEventListener(key, setStateCallBack);
  }, [key, stateSetter]);

  return [store.get(key) as T,store.set.bind(store, key)];
};

if (window) {
  window.__STATE__ = store.store;
}

export default store;
