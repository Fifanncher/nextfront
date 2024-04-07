import React from 'react';
import {inject, observer} from 'mobx-react';
import Fields from './renderFields';
import FilterView from '../FilterView';
import {status as statusEnum} from '../../../../../src/enums';

@inject(({RootStore: {ActiveFilterStore}}) => {
  return {
    fields: ActiveFilterStore.fields || [],
    status: ActiveFilterStore.status
  };
}) @observer
class FilterViewHOC extends React.Component {
  constructor(props) {
    super(props);

    const {RootStore, storeName} = this.props;

    // this.FilterStore = RootStore.ActiveFilterStore;
    // RootStore.CatalogStore.setActiveFilterStore(this.FilterStore);
  }

  componentWillUnmount() {
    const {RootStore, storeName} = this.props;
    //RootStore.deleteStore(storeName)
    //RootStore.CatalogStore.setActiveFilterStore({});
  }

  render() {
    const {fields, status} = this.props;

    if (status === statusEnum.SUCCESS && !fields.length) {
      return null;
    }

    return (
      <FilterView>
        <Fields />
      </FilterView>
    );
  }
}

export default FilterViewHOC;
