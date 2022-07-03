import { useState, useEffect } from 'react';
import _ from 'lodash';
import EventTargetPolyfill from 'eventtarget';
import CustomEventPolyfill from './customeventpolyfill';

if (!('EventTarget' in window)) {
  window.EventTarget = EventTargetPolyfill
}

if (!('CustomEvent' in window)) {
  //@ts-ignore
  window.CustomEvent = CustomEventPolyfill;
}

declare global {
  interface Window { 
    __STATE__: any;
    __INITIAL_STATE__: any;
    EventTarget: any;
  }
}
class Store extends EventTarget {
  store: any = {};

  constructor() {
    super();

    if (window && window.__INITIAL_STATE__) {
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

  get<T>(key: string, defaultValue: any): T | any {
    return _.get(this.store, key, defaultValue);
  }
}

const store = new Store();


export const useStore = <T>(key: string, initialState: any): [T, (arg0: T) => void] => {
  const stateSetter = useState()[1];

  useEffect(() => {
    const setStateCallBack = (e: Event) => {
      stateSetter((e as CustomEvent).detail);
    }

    store.addEventListener(key, setStateCallBack);

    return () => store.removeEventListener(key, setStateCallBack);
  }, [key, stateSetter]);

  return [store.get(key, initialState),store.set.bind(store, key)];
};

if (window) {
  window.__STATE__ = store.store;
}

export default store;
