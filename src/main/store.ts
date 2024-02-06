import ElectronStore from 'electron-store';
import { CoreElectronStore } from 'shared/types/coreElectronStore';

class Store {
  private static instance = new ElectronStore<CoreElectronStore>();

  public static clear(): void {
    Store.instance.clear();
  }

  public static get<K extends keyof CoreElectronStore>(
    key: K,
  ): CoreElectronStore[K] {
    return Store.instance.get(key);
  }

  public static getStore(): CoreElectronStore {
    return Store.instance.store;
  }

  public static set<K extends keyof CoreElectronStore>(
    key: K,
    value: CoreElectronStore[K],
  ): void {
    Store.instance.set(key, value);
  }

  public static setStore(state: CoreElectronStore): void {
    Store.instance.set(state);
  }
}

export default Store;
