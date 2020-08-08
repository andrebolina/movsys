import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr } from '../../../utils';
import Loading from './index';

const setUp = (props = {}) => {
  const component = shallow(<Loading {...props} />);
  return component;
};

describe('Should render without errors', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it('Should render loadingContainer', () => {
    const loadingContainer = findByTestAtrr(component, 'loadingContainer');
    expect(loadingContainer.length).toBe(1);
  });

  it('Should render loadingIcon', () => {
    const loadingIcon = findByTestAtrr(component, 'loadingIcon');
    expect(loadingIcon.length).toBe(1);
  });
});
