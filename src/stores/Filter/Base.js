import {action, computed, makeObservable, observable, toJS} from 'mobx';
import api from '../../api';
import {alert} from '../Notifications';
import Router from 'next/router';
import formatPrice from '../../utils/formatPrice';
import {array2Object} from '../../utils';
import {status} from '../../enums';

export class BaseFilterStore {
  @observable fields = [];
  @observable checked = {};
  @observable chips = new Map();
  @observable currentParams = {};
  @observable category;
  @observable disabled = {};
  @observable selection = {};
  @observable defaultUnitPrice = '₽';

  @observable status = status.LOADING;

  constructor(RootStore) {
    this.category = RootStore.category;
    this.RouterStore = RootStore.RouterStore;

    this.setCurrentParams(RootStore.RouterStore.query);

    this.loadFields();

    makeObservable(this);
  }

  @computed get isActive() {
    return Object.values(this.checked)
      .filter(Boolean).length;
  }

  @computed get fieldsByName() {
    return array2Object(this.fields, 'name');
  }

  @computed get collections() {
    return this.fieldsByName.collectionId || this.fieldsByName.collections || {};
  }

  @computed get brands() {
    return this.fieldsByName.brandId || this.fieldsByName.brands || {};
  }

  @computed get priceField() {
    return this.fieldsByName.price || {};
  }

  @computed get unitPrice() {
    return this.fieldsByName.price?.unitPrice || this.defaultUnitPrice;
  }

  @action setStatus = (statusQuery) => {
    this.status = statusQuery;
  };

  @action setFields = (fields) => {
    this.fields = fields;
  };

  @action updateCategory = (category, params = {}) => {
    this.category = category;
    this.setCurrentParams(params);
    this.loadFields();
  };

  @action merge = ({fields, category, checked, currentParams, chips}) => {
    this.fields = fields || [];
    this.category = category;
    //  this.chips = chips;
    this.checked = checked;
    this.currentParams = currentParams;
  };

  @action setCurrentParams = async(_params) => {
    const params = {..._params};

    delete params.limit;
    delete params.page;

    this.currentParams = params;

    await this.setSelection(params.selection);
  };

  @action setSelection = async(selectionAlias) => {
    if (!selectionAlias) {
      this.selection = {};

      return;
    }

    try {
      this.selection = await api.post('selections/get', {alias: selectionAlias});

      const chips = {
        specialName: 'Подборка',
        title: this.selection.title,
        id: this.selection.alias
      };

      this.setChips('selection', chips, true);
    } catch(e) {
      this.selection = {};
    }
  };

  @action setCategory(category) {
    this.category = category;
  }

  @action resetTemps() {
    this.checked = {};
    this.chips = new Map();
    this.currentParams = {};
    this.disabled = {};
  }

  @action.bound clear() {
    this.clearPath();
    this.resetTemps();
  }

  @action initRange = (key, val, chips, checked) => {
    const range = val.split('-');

    checked[key] = {};

    checked[key].min = range[0];
    checked[key].max = range[1];

    const min = range[0] > 0 ? `от ${range[0]} мм` : '';

    const max = range[1] > 0 ? `до ${range[1]} мм` : '';

    const label = `${min} ${max}`.trim();

    chips.set(key, {
      fieldName: this.fieldsByName[key]?.title,
      label,
      key,
      val: key
    });
  };

  @action initPrice = (val, chips, checked) => {
    const price = val.split('-');

    checked.minPrice = price[0];
    checked.maxPrice = price[1];

    const min = price[0] > 0 ? `от ${formatPrice({
      price: price[0],
      unit: this.unitPrice
    })} ` : '';

    const max = price[1] > 0 ? `до ${formatPrice({
      price: price[1],
      unit: this.unitPrice
    })}` : '';

    const label = `${min} ${max}`.trim();

    chips.set('price', {
      fieldName: this.fieldsByName.price?.title,
      label,
      key: 'price',
      val: 'price'
    });
  };

  @action disableCollectionsByBrandId = (brandId, checked) => {
    const brandIds = Object.keys(this.checked)
      .filter((key) => key.indexOf(this.brands.name) > -1 && this.checked[key])
      .map((key) => Number(key.split('-')[1]));

    // Если ничего не выбрано в брендах, то все коллекции по умолчанию можно тыкать
    if (!brandIds.length) {
      this.setToKey('disabled', this.collections.name, false);

      return;
    }

    this.collections?.values.forEach((collection) => {
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

      this.setDisabled(this.collections.name, collection.id, state);
    });
  };

  setDisabled = (key, value, state) => {
    this.disabled[`${key}-${value}`] = state;
  };

  setToKey = (field, key, value) => {
    Object.keys(this[field])
      .forEach((objectKey) => {
        if (objectKey.indexOf(key) > -1) {
          this[field][objectKey] = value;
        }
      });
  };

  //async нужен чтобы подборка подставилась в чипс
  @action async initChecked() {
    const _chips = new Map();
    const _checked = {};
    const entries = Object.entries(this.currentParams);
    let selection;

    for (const [key, value] of entries) {
      if (key === 'category') {
        continue;
      }

      if (key === 'price') {
        this.initPrice(value, _chips, _checked);
      } else if (key.includes('Range')) {
        this.initRange(key, value, _chips, _checked);
      } else if (key === 'selection') {
        selection = value;
      } else if (Array.isArray(value)) {
        value.forEach((val) => {
          const _key = this.getKey(key, val);

          _checked[_key] = true;

          if (!this.fieldsByName[key]?.values?.find) {
            console.log(key, this.fieldsByName[key]?.values);
          }
          const item = this.fieldsByName[key]?.values?.find(({id}) => Number(id) === Number(val));

          item && _chips.set(_key, {
            fieldName: this.fieldsByName[key]?.title,
            label: item.title,
            key,
            val: item.id
          });
        });
      } else {
        const _key = this.getKey(key, value);

        _checked[_key] = true;

        if (!this.fieldsByName[key]?.values?.find) {
          console.log(key, this.fieldsByName[key]?.values);
        }

        let item = this.fieldsByName[key]?.values?.find(({id}) => Number(id) === Number(value));

        if (!item) {
          item = {
            title: 'Да',
            id: 1
          };
        }

        _chips.set(_key, {
          fieldName: this.fieldsByName[key]?.title,
          label: item.title,
          key,
          val: item.id
        });
      }
    }

    this.checked = _checked;
    this.chips = _chips;

    if (selection) {
      this.setSelection(selection);
    }
  }

  async clearPath() {
    const {limit, page} = {...this.RouterStore.query || {}};
    const query = {};

    if (limit) {
      query[limit] = limit;
    }
    if (page) {
      query[page] = page;
    }

    await this.pushRouter({
      category: this.RouterStore.router.query.category,
      ...query
    });
  }

  getBody() {
    return {
      category: this.category
    };
  }

  // Тут можно переопределить логику после выбора элемента
  @action async clearCheckedCollections() {
    const params = toJS(Router.query);
    const colId = this.collections.name;

    delete params[colId];

    await this.RouterStore.push({
      pathname: this.RouterStore.pathname,
      query: params
    });

    this.setToKey('checked', colId, false);
    this.chips.delete(colId);
  }

  // Тут можно переопределить логику после выбора элемента
  initDisabled() {
    const brandIds = Object.keys(this.checked)
      .filter((key) => key.indexOf(this.brands.name) > -1 && this.checked[key])
      .map((key) => Number(key.split('-')[1]));

    if (!brandIds.length) {
      this.setToKey('disabled', this.collections.name, false);

      return;
    }

    this.collections.values.forEach((collection) => {
      const brId = collection.brandId;
      const state = !brandIds.includes(brId);

      this.setDisabled(this.collections.name, collection.id, state);
    });
  }

  // Тут можно переопределить логику после выбора элемента
  afterValueCheck = (key, {id}, checked) => {
    if (key === this.brands.name) {
      this.clearCheckedCollections();
      this.disableCollectionsByBrandId(id, checked);
    }
  };

  // Тут можно переопределить логику до выбора элемента
  beforeValueCheck() {
    // implement in children
  }

  @action setRange = (name, key, val) => {
    if (!this.checked[name]) {
      this.checked[name] = {};
    }
    this.checked[name][key] = val;
  };

  @action setPrice = (price, key) => {
    this.checked[key] = price;
  };

  setRangePath = async(name) => {
    if (!Number(this.checked[name].min) && !Number(this.checked[name].max)) {
      this.setRange(name, 'min', null);
      this.setPrice(name, 'max', null);

      await this.setPathRange(name, null, true);

      return;
    }

    !this.checked[name].min && this.setRange(name, 'min', '0');

    const pathString = this.checked[name].max > 0 ?
      `${this.checked[name].min}-${this.checked[name].max}` :
      `${this.checked[name].min}`;

    await this.setPathRange(name, pathString.replace(/\s/g, ''), true);

    const oldChip = this.chips.get(name);
    const min = this.checked[name].min > 0 ? `от ${this.checked[name].min} мм` : '';

    const max = this.checked[name].max > 0 ? `до ${this.checked[name].max} мм` : '';

    const label = `${min} ${max}`.trim();

    if (oldChip) {
      oldChip.label = label;
    } else {
      this.setChips(
        name,
        {
          title: label
        },
        true
      );
    }
  };

  setPricePath = async(price, key) => {
    if (!Number(this.checked.minPrice) && !Number(this.checked.maxPrice)) {
      this.setPrice(null, 'minPrice');
      this.setPrice(null, 'maxPrice');

      await this.setPathPrice(null, true);

      return;
    }

    // await this.resetPage();
    !this.checked.minPrice && this.setPrice('0', 'minPrice');
    // !this.checked['maxPrice'] && this.setPrice('20000', 'maxPrice');
    // await this.resetPage();

    const pathString = this.checked.maxPrice > 0 ?
      `${this.checked.minPrice}-${this.checked.maxPrice}` :
      `${this.checked.minPrice}`;

    await this.setPathPrice(pathString.replace(/\s/g, ''), true);

    const oldChip = this.chips.get('price');
    const min = this.checked.minPrice > 0 ? `от ${formatPrice(
      {
        price: this.checked.minPrice,
        unit: this.unitPrice
      }
    )} ` : '';

    const max = this.checked.maxPrice > 0 ? `до ${formatPrice({
      price: this.checked.maxPrice,
      unit: this.unitPrice
    })}` : '';

    const label = `${min} ${max}`.trim();

    if (oldChip) {
      oldChip.label = label;
    } else {
      this.setChips(
        'price',
        {
          name: label
        },
        true
      );
    }
  };

  setValue = (key) => async(checked, item) => {
    const {id} = item;

    await this.resetPage();
    await this.beforeValueCheck(key, item, checked);

    await this.setPath(key, id, checked);

    if (key === 'price' && !checked) {
      this.setPrice(null, 'minPrice');
      this.setPrice(null, 'maxPrice');
    } else {
      this.setChecked(key, id, checked);
    }

    this.setChips(key, item, checked);

    await this.afterValueCheck(key, item, checked);
  };

  hasValue = (key, id) => this.checked[`${key} -${id}`];

  hasKey = (key) => {
    if (key === 'price') {
      return this.checked.minPrice || this.checked.maxPrice;
    }

    return Object
      .keys(this.checked)
      .filter((checkedKey) => checkedKey.indexOf(key) > -1 && this.checked[checkedKey] === true).length > 0;
  };

  resetPage = () => {
    //this.PageStore.setPage(1);
  };

  async loadFields() {
    this.setStatus(status.LOADING);
    try {
      const fields = await api.post('catalog/getFilterFields', this.getBody());

      this.setFields(fields);
      this.initChecked();
      this.initDisabled();
      this.setStatus(status.SUCCESS);
    } catch(e) {
      this.setStatus(status.ERROR);
      alert({type: 'error', title: 'Ошибка при получении фильтра'});
    }
  }

  @action setChecked = (key, value, state) => {
    const prefix = `${key}-${value}`;

    this.checked[prefix] = state;
  };

  @action setChips = (key, item, checked) => {
    const _key = this.getKey(key, item.id);

    if (checked) {
      this.chips.set(_key, {
        fieldName: item.specialName || this.fieldsByName[key].title,
        label: item.title,
        key,
        val: item.id
      });
    } else {
      this.chips.has(_key) ?
        this.chips.delete(_key) :
        this.chips.has(key) ? this.chips.delete(key) : null;
    }
  };

  getKey = (key, val) => `${key}-${val}`;

  pushRouter = async(urlSearch) => {
    await Router.push({
      pathname: this.RouterStore.router.pathname,
      query: {
        category: this.RouterStore.router.query.category,
        ...urlSearch
      }
    },
    undefined,
    {shallow: true});
    // await this.RouterStore.pushFilter(urlSearch)

    this.setCurrentParams(urlSearch);
  };

  async setPathPrice(val, checked) {
    const urlSearch = toJS({...Router.router.query || {}});

    if (checked) {
      urlSearch.price = val;
    } else {
      delete urlSearch.price;
    }

    await this.pushRouter(urlSearch);
  }

  async setPathRange(name, val, checked) {
    const urlSearch = toJS({...Router.router.query || {}});

    if (checked) {
      urlSearch[name] = val;
    } else {
      delete urlSearch[name];
    }

    await this.pushRouter(urlSearch);
  }

  async setPath(key, id, checked) {
    const urlSearch = toJS({...Router.router.query || {}});

    if (checked) {
      const val = urlSearch[key] ? [id].concat(urlSearch[key]) : [id];

      urlSearch[key] = val;
    } else if (Array.isArray(urlSearch[key])) {
      urlSearch[key] = urlSearch[key].filter((val) => Number(val) !== Number(id));
    } else {
      delete urlSearch[key];
    }

    await this.pushRouter(urlSearch);
  }
}
