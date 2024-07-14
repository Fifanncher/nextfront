import {action, computed, override, makeObservable, toJS} from 'mobx';
import {BaseFilterStore} from './Base';
import Router from 'next/router';

export class DoorsStore extends BaseFilterStore {
  constructor(RootStore) {
    super(RootStore);
    this.defaultUnitPrice = '₽';

    makeObservable(this);
  }

    @computed get finishingMaterials() {
      return this.fieldsByName.finishingMaterial || null;
  }

    @override async clearCheckedCollections() {
      const params = toJS(Router.query);
      const colId = this.collections.name;
      const finId = this.finishingMaterials.name;

      delete params[colId];
      delete params[finId];

      await this.RouterStore.push({
        pathname: this.RouterStore.pathname,
        query: params
      });

      this.setToKey('checked', colId, false);
      this.setToKey('checked', finId, false);

      this.chips.delete(colId);
      this.chips.delete(finId);
    }

    @action disableFinishingByBrandId = (brandId, checked) => {
      const brandIds = Object.keys(this.checked)
        .filter((key) => key.indexOf(this.brands.name) > -1 && this.checked[key])
        .map((key) => Number(key.split('-')[1]));

      // Если ничего не выбрано в брендах, то все коллекции по умолчанию можно тыкать
      if (!brandIds.length) {
        this.setToKey('disabled', this.collections.name, false);

        return;
      }

      this.finishingMaterials.values.forEach((material) => {
        const brIds = material.brandId || [];

        const hasValue = brandIds.some((brId) => brIds.includes(brId));

        this.setDisabled(this.finishingMaterials.name, material.id, !hasValue);
      });
    };

    initDisabled() {
      const brandIds = Object.keys(this.checked)
        .filter((key) => key.indexOf(this.brands.name) > -1 && this.checked[key])
        .map((key) => Number(key.split('-')[1]));

      if (!brandIds.length) {
        return;
      }

      this.collections.values.forEach((collection) => {
        const brId = collection.brandId;
        const state = !brandIds.includes(brId);

        this.setDisabled(this.collections.name, collection.id, state);
      });

      this.finishingMaterials.values.forEach((collection) => {
        const brIds = collection.brandId;

        const hasValue = brandIds.some((brId) => brIds.includes(brId));

        this.setDisabled(this.finishingMaterials.name, collection.id, !hasValue);
      });
    }

    afterValueCheck = (key, {id}, checked) => {
      if (key === this.brands.name) {
        this.clearCheckedCollections();
        this.disableFinishingByBrandId(id, checked);
        this.disableCollectionsByBrandId(id, checked);
      }
    };
}
