import {Component} from 'react';
import PropTypes from 'prop-types';
import filterFabric from './filterFabric';

class Filter extends Component {
  render() {
    return filterFabric(this.props.category);
  }
}

Filter.propTypes = {
  category: PropTypes.string
};

export default Filter;
