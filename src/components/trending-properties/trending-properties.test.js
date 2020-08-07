import React from 'react';
import { shallow } from 'enzyme';
import TrendingProperties from './trending-properties';

describe('<TrendingProperties />', () => {
  test('renders', () => {
    const wrapper = shallow(<TrendingProperties />);
    expect(wrapper).toMatchSnapshot();
  });
});
