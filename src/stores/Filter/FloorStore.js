import {computed, makeObservable, observable, action, toJS} from 'mobx';
import {BaseFilterStore} from './Base';
import Router from "next/router";

export class FloorStore extends BaseFilterStore {
    @observable disabled = {};

    fieldsLabel = {
        'color': 'Оттенок',
        'resistanceClass': 'Класс нагрузки',
        'thickness': 'Толщина',
        'width': 'Ширина',
        'brandId': 'Бренд',
        'collectionId': 'Коллекция',
        'withHeatingFloor': 'Совместимость с теплыми полами',
        'bestseller': 'Хит продаж',
        'price': 'Цена',
        fixation: 'Тип соединения',
        texture: 'Дизайн'
    };

    tableFields = {
        color: 'color',
        resistanceClasses: 'resistanceClass',
        thickness: 'thickness',
        width: 'width',
        brandId: 'brands',
        collectionId: 'collections',
        withHeatingFloor: 'withHeatingFloor',
        bestseller: 'bestseller',
        fixation: 'fixation',
        texture: 'texture'
    }

    constructor(RootStore) {
        const category = RootStore.RouterStore.query.category;
        super(category, RootStore);
        makeObservable(this);
    }

    @action changeCategory = async(query) => {
        this.category = query.category;
        this.values = [];
        this.checked = [];
        this.chips = [];
        this.currentParams = [];

        this.setCurrentParams(query);
        await this.loadValues();
    }

    @computed get color() {
        return this.values.color;
    }

    @computed get fixation() {
        return this.values.fixation;
    }

    @computed get resistanceClasses() {
        return this.values.resistanceClasses;
    }

    @computed get texture() {
        return this.values.texture;
    }

    @computed get thickness() {
        return this.values.thickness?.slice().sort((a, b) => a.name - b.name);
    }

    @computed get width() {
        return this.values.width?.slice().sort((a, b) => a.name - b.name);
    }

    @computed get brands() {
        return this.values.brands;
    }

    @computed get collections() {
        return this.values.collections;
    }

    @computed get isColorActive() {
        return this.hasKey('color');
    }

    @computed get isResistanceClassesActive() {
        return this.hasKey('resistanceClass');
    }

    @computed get isThicknessActive() {
        return this.hasKey('thickness');
    }

    @computed get isPriceActive() {
        return this.hasKey('price');
    }

    @computed get isTextureActive() {
        return this.hasKey('texture');
    }

    @computed get isFixationActive() {
        return this.hasKey('fixation');
    }

    @computed get isBestsellerActive() {
        return this.hasKey('bestseller');
    }

    @computed get isWidthActive() {
        return this.hasKey('width');
    }

    @computed get isBrandsActive() {
        return this.hasKey('brandId');
    }

    @computed get isCollectionsActive() {
        return this.hasKey('collectionId');
    }

    @computed get isWithHeatingFloor() {
        return this.hasKey('withHeatingFloor');
    }

    @action clearCheckedCollections = async () => {
        const params = toJS(Router.query);
        const colId = 'collectionId';

        delete params[colId];

        await this.RouterStore.push({
            pathname: this.RouterStore.pathname,
            query: params
        })

        this.setToKey('checked', colId, false);
        this.chips = this.chips.filter((chip) => chip.key !== colId);
    };

    @action disableCollectionsByBrandId = (brandId, checked) => {
        const brandIds = Object.keys(this.checked)
            .filter((key) => key.indexOf('brandId') > -1 && this.checked[key])
            .map((key) => Number(key.split('-')[1]));

        // Если ничего не выбрано в брендах, то все коллекции по умолчанию можно тыкать
        if (!brandIds.length) {
            this.setToKey('disabled', 'collectionId', false);

            return;
        }

        this.collections.forEach((collection) => {
            const brId = collection.brandId;

            let state;

            if (checked) {
                // Дизейблим если бренд текущего элемента не был выбран в фильтре
                state = !brandIds.includes(brId) && brId !== brandId;
            } else {
                // Если бренд в фильтре был выбран, а потом чекбокс убрали,
                // то необходимо снова задизейблить
                state = !brandIds.includes(brandId) && brId === brandId;
            }

            this.setDisabled('collectionId', collection.id, state);
        });
    };

    clear() {
        super.clear();

        this.disabled = {};
    }

    afterValueCheck = (key, {id}, checked) => {
        if (key === 'brandId') {
            this.clearCheckedCollections();
            this.disableCollectionsByBrandId(id, checked);
        }
    };

    setToKey = (field, key, value) => {
        Object.keys(this[field])
            .forEach((objectKey) => {
                if (objectKey.indexOf(key) > -1) {
                    this[field][objectKey] = value;
                }
            });
    };

    setDisabled = (key, value, state) => {
        this.disabled[`${key}-${value}`] = state;
    };
}