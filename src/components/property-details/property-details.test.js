import React from 'react';
import { shallow } from 'enzyme';
import PropertyDetails from './property-details';

describe('<PropertyDetails />', () => {
  test('renders', () => {
    const wrapper = shallow(<PropertyDetails />);
    expect(wrapper).toMatchSnapshot();
  });
});
