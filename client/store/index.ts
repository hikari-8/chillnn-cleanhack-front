import { Store } from 'vuex';
import { initialiseStores } from '~/util/store/storeAccesser';
const initializer = (store: Store<any>) => initialiseStores(store);
export const plugins = [initializer];
export * from '~/util/store/storeAccesser';
