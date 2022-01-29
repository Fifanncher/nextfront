import {observable, action, autorun, computed, makeObservable, reaction, toJS} from 'mobx';
import {status as statusEnum} from '../../enums';
import api from 'api';
import {alert} from '../Notifications';
import Router from "next/router";

const isServer = typeof window === 'undefined';


class CatalogStore {

    @observable status = statusEnum.LOADING;
    @observable categories;
    @observable products;

    @observable category;

    @observable hierarchy;
    @observable isLastLevel;
    @observable count = 0;

    @observable ActiveFilterStore;

    @observable body = {};

    constructor(RootStore) {
        this.hydrate(RootStore);
        makeObservable(this);

        if (!isServer) {
            this.getHierarchyDisposer = autorun(this.getHierarchy);
            this.getCatalogDisposer = autorun(this.getCatalog);
            this.getCountProductsDisposer = autorun(this.getCountProducts);
        }
    }

    async hydrate(RootStore) {
        const {CatalogStore = {}} = RootStore.initialData || {};

        this.RouterStore = RootStore.RouterStore;
        this.PageStore = RootStore.PageStore;
        this.ActiveFilterStore = RootStore.ActiveFilterStore;
        this.category = RootStore.category;

        this.body = CatalogStore.body || {};
        this.categories = CatalogStore.categories;
        this.products = CatalogStore.products;
        this.hierarchy = CatalogStore.hierarchy || [];
        this.isLastLevel = CatalogStore.isLastLevel;
        this.count = CatalogStore.count || 0;
    }

    // @computed get category() {
    //     return this.RouterStore.query.category || null;
    // }

    @computed get fastfilter() {
        return this.RouterStore.fastfilter || null;
    }

    @computed get router() {
        return Router.router;
    }

    @computed get productsAvailable() {
        return !!this.products?.length;
    }


    @action merge = ({products, category, isLastLevel, count, categories, hierarchy, status}, {ActiveFilterStore}) => {
        this.category = category;
        this.products = products;
        this.status = status;
        this.count = count;
        this.categories = categories;
        this.hierarchy = hierarchy;
        this.isLastLevel = isLastLevel;
        this.ActiveFilterStore = ActiveFilterStore;
    };

    @action setBody = (body) => {
        this.body = body;
    };

    @action setCategories = (categories) => {
        this.categories = categories;
    };

    @action setProducts = (products) => {
        this.products = products;
    };

    @action setHierarchy = (hierarchy) => {
        this.hierarchy = hierarchy;
    };

    @action setIsLastLevel = (isLastLevel) => {
        this.isLastLevel = isLastLevel;
    };

    @action setCount = (count) => {
        this.count = count;
    };

    @action setStatus = (status) => {
        this.status = status;
    };

    getHierarchy = async () => {
        try {
            const body = {category: this.category};
            const {hierarchy, isLastLevel} = await api.post('catalog/getHierarchy', body);

            this.setHierarchy(hierarchy);
            this.setIsLastLevel(isLastLevel);
        } catch (_) {
            // do nothing
        }
    };

    getCountProducts = async () => {
        const {category, filter, fastfilter, isLastLevel} = this;

        if (!isLastLevel && !fastfilter) {
            return;
        }

        try {
            const body = {searchParams: {category, filter: {...filter, fastfilter},}};
            const count = await api.post('catalog/countProducts ', body);

            this.setCount(count);
        } catch (_) {
            // do nothing
        }
    };

    @computed get filter() {
        return toJS(this.ActiveFilterStore.currentParams) || {};
    }

    checkPageStore = () => {
        const {offset, limit} = this.PageStore;

        if (limit > 36) {
            this.PageStore.setLimitWithoutSSR(36)
        }

        if (offset > this.count) {
            this.PageStore.setPageWithoutSSR(1)
        }
    }

    getCatalog = async () => {
        const {category, filter, fastfilter} = this;
        const {offset, limit, order, optionsOrder} = this.PageStore;
        this.setStatus(statusEnum.LOADING);
        this.checkPageStore();

        try {
            const body = {
                searchParams: {
                    category,
                    filter: {...filter, fastfilter},
                },
                limit,
                offset,
                order: optionsOrder.find(({value}) => value === Number(order))
            };
            // if (isObjectEqual(toJS(this.body), body)) {
            //     return
            // }
            //this.setBody(body)
            const {categories, products} = await api.post('catalog/getCatalog', body);
            this.setCategories(categories);
            this.setProducts(products);
            this.setStatus(statusEnum.SUCCESS);
        } catch (err) {
            this.setStatus(statusEnum.ERROR);
        }
    };

    closeStore() {
        //this.getHierarchyDisposer();
        //this.getCatalogDisposer();
        //this.getCountProductsDisposer();
    }
}

export {CatalogStore};
