import React from 'react';
import { shallow } from 'enzyme';
import UserSetting from './user-setting';

describe('<UserSetting />', () => {
  test('renders', () => {
    const wrapper = shallow(<UserSetting />);
    expect(wrapper).toMatchSnapshot();
  });
});
