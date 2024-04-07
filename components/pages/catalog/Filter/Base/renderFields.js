import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import SimpleAccordion from './SimpleAccordion';
import {toJS} from 'mobx';
import getFields from './fields';
import {Skeleton} from '@mui/material';

@inject(({RootStore: {ActiveFilterStore}}) => {
  return {
    fields: ActiveFilterStore.fields || [],
    unit: ActiveFilterStore.unitPrice,

    setValue: ActiveFilterStore.setValue,
    setPrice: ActiveFilterStore.setPrice,
    setPricePath: ActiveFilterStore.setPricePath,

    checked: toJS(ActiveFilterStore.checked),
    disabled: toJS(ActiveFilterStore.disabled),

    hasKey: ActiveFilterStore.hasKey,

    setRange: ActiveFilterStore.setRange,
    setRangePath: ActiveFilterStore.setRangePath
  };
}) @observer
class Fields extends Component {
  render() {
    const {
      checked,
      disabled,
      fields,
      setValue,
      setPricePath,
      setPrice,
      hasKey,
      unit,
      setRange,
      setRangePath
    } = this.props;

    if (!fields.length) {
      return [0, 1, 2, 3, 4].map((i) =>
        <Skeleton key={i} style={{marginTop: 20}} />);
    }

    const filterFields = getFields({
      checked, unit, setPricePath, setPrice, disabled, fields, setValue,
      setRange,
      setRangePath
    });

    return fields.map((field) => (
      <SimpleAccordion
        key={field.name}
        id={field.name}
        name={field.title}
        active={hasKey(field.name)}
      >
        {filterFields(field)}
      </SimpleAccordion>
    ));
  }
}

Fields.propTypes = {
  collections: PropTypes.array,
  finishingMaterials: PropTypes.array,
  setCollection: PropTypes.func,
  setFinishingMaterial: PropTypes.func,
  checkedCollections: PropTypes.object
};

export default Fields;
