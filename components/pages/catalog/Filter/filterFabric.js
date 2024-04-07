import React from 'react';
import FilterViewHOC from './Base/StoreContainer';

const filterFabric = (category) => {
  let storeName = '';

  switch (category) {
    case 'doors':
      storeName = 'DoorsStore';
      break;
    default:
      storeName = 'BaseFilterStore';
      break;
  }

  return <FilterViewHOC storeName={storeName} />;
};

export default filterFabric;
