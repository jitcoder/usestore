declare global {
    interface Window {
        __STATE__: any;
        __INITIAL_STATE__: any;
        EventTarget: any;
    }
}
declare class Store extends EventTarget {
    store: any;
    constructor();
    set(key: string, value: any): void;
    get<T>(key: string, defaultValue: any): T | any;
}
declare const store: Store;
export declare const useStore: <T>(key: string, initialState: any) => [T, (arg0: T) => void];
export default store;
