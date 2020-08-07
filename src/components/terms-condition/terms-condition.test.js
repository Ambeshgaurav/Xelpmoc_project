import React from 'react';
import { shallow } from 'enzyme';
import TermsCondition from './terms-condition';

describe('<TermsCondition />', () => {
  test('renders', () => {
    const wrapper = shallow(<TermsCondition />);
    expect(wrapper).toMatchSnapshot();
  });
});
