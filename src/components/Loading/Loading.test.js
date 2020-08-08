import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr } from '../../../utils';
import Loading from './index';

const setUp = (props = {}) => {
  const component = shallow(<Loading {...props} />);
  return component;
};

describe('Loading component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it('Should render without errors', () => {
    const wrapper = findByTestAtrr(component, 'loadingContainer');
    expect(wrapper.length).toBe(1);

    const icon = findByTestAtrr(component, 'loadingIcon');
    expect(icon.length).toBe(1);
  });
});
