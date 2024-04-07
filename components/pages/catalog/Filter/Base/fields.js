import FormCheckbox from './FormCheckbox';
import React from 'react';
import Price from './Price';
import Range from './Range';

const isChecked = (checked, key, value) => !!checked[`${key}-${value}`];
const isDisabled = (disabled, key, value) => disabled[`${key}-${value}`];

// eslint-disable-next-line react/display-name
const Fields = ({checked, unit, disabled, setValue, setPrice, setPricePath, setRange, setRangePath}) =>
  ({name, type, values, postfix}) => {
    if (name === 'price') {
      return (
        <Price
          checked={checked}
          onChange={setPrice}
          onSave={setPricePath}
          unit={unit}
        />
      );
    }

    if (type === 'range') {
      return (
        <Range
          name={name}
          checked={checked}
          onChange={setRange}
          onSave={setRangePath}
          unit={'мм'}
        />
      );
    }

    return values?.map(({id, title, img}) => (
      <FormCheckbox
        img={img}
        checked={isChecked(checked, name, id)}
        key={id}
        title={postfix ? `${title} ${postfix}` : title}
        id={id}
        disabled={isDisabled(disabled, name, id)}
        onChange={setValue(name)}
      />
    ));
  };

export default Fields;
