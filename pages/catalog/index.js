import CatalogView from './CatalogView'
import {CatalogStore} from "../../src/stores/CatalogStore";
import {inject, Provider} from 'mobx-react';

const index = () => <CatalogView />

index.getInitialProps = async({MobxStore}) => {
    await MobxStore.RootStore.CatalogStore.getHierarchy();
    await  MobxStore.RootStore.CatalogStore.getCatalog()

    return {MobxStore};
}

export default index;

