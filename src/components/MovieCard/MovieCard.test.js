import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr, checkProps } from '../../../utils';
import MovieCard from './index';

const setUp = (props = {}) => {
  const component = shallow(<MovieCard {...props} />);
  return component;
};

describe('MovieCard component', () => {
  describe('Checking PropTypes', () => {
    it('Should not throw a warning', () => {
      const expectedProps = {
        infos: {
          imdbID: 'test_imdbID',
          Poster: 'test_Poster',
          title: 'test_title',
          rating: 'test_rating',
        },
      };
      const propsErr = checkProps(MovieCard, expectedProps);
      expect(propsErr).toBeUndefined();
    });

    it('Should throw a warning', () => {
      const expectedProps = {};
      const propsErr = checkProps(MovieCard, expectedProps);
      expect(propsErr).not.toBeUndefined();
    });
  });

  describe('Should render without errors', () => {
    let component;
    beforeEach(() => {
      const props = {
        infos: {
          imdbID: 'test_imdbID',
          Poster: 'test_Poster',
          title: 'test_title',
          rating: 'test_rating',
        },
      };
      component = setUp(props);
    });

    it('Should render rootCard', () => {
      const rootCard = findByTestAtrr(component, 'rootCard');
      expect(rootCard.length).toBe(1);
    });

    it('Should render actionArea', () => {
      const actionArea = findByTestAtrr(component, 'actionArea');
      expect(actionArea.length).toBe(1);
    });

    it('Should render poster', () => {
      const poster = findByTestAtrr(component, 'poster');
      expect(poster.length).toBe(1);
    });

    it('Should render title', () => {
      const title = findByTestAtrr(component, 'title');
      expect(title.length).toBe(1);
    });

    it('Should render rating', () => {
      const rating = findByTestAtrr(component, 'rating');
      expect(rating.length).toBe(1);
    });

    it('Should render ratingIcon', () => {
      const ratingIcon = findByTestAtrr(component, 'ratingIcon');
      expect(ratingIcon.length).toBe(1);
    });
  });
});
