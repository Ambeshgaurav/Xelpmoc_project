import React from 'react';
import { shallow } from 'enzyme';
import FrequentlyAskedQues from './frequently-asked-ques';

describe('<FrequentlyAskedQues />', () => {
  test('renders', () => {
    const wrapper = shallow(<FrequentlyAskedQues />);
    expect(wrapper).toMatchSnapshot();
  });
});
