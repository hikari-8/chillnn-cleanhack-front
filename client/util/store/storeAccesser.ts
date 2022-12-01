import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import InfoModule from '@/store/modules/info';

let infoStore: InfoModule;

function initialiseStores(store: Store<any>): void {
    infoStore = getModule(InfoModule, store);
}

export {
    initialiseStores,
    infoStore
};
