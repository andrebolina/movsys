import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr } from '../../../utils';
import MovieCard from './index';

const setUp = (props = {}) => {
  const component = shallow(<MovieCard {...props} />);
  return component;
};

describe('MovieCard component', () => {
  describe('Have props', () => {
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

    it('Should render without errors', () => {
      const rootCard = findByTestAtrr(component, 'rootCard');
      expect(rootCard.length).toBe(1);

      const actionArea = findByTestAtrr(component, 'actionArea');
      expect(actionArea.length).toBe(1);

      const poster = findByTestAtrr(component, 'poster');
      expect(poster.length).toBe(1);

      const title = findByTestAtrr(component, 'title');
      expect(title.length).toBe(1);

      const rating = findByTestAtrr(component, 'rating');
      expect(rating.length).toBe(1);

      const ratingIcon = findByTestAtrr(component, 'ratingIcon');
      expect(ratingIcon.length).toBe(1);
    });
  });

  describe('Have NO props', () => {
    let component;
    beforeEach(() => {
      component = setUp();
    });

    it('Should not render', () => {
      const rootCard = findByTestAtrr(component, 'rootCard');
      expect(rootCard.length).toBe(0);

      const actionArea = findByTestAtrr(component, 'actionArea');
      expect(actionArea.length).toBe(0);

      const poster = findByTestAtrr(component, 'poster');
      expect(poster.length).toBe(0);

      const title = findByTestAtrr(component, 'title');
      expect(title.length).toBe(0);

      const rating = findByTestAtrr(component, 'rating');
      expect(rating.length).toBe(0);

      const ratingIcon = findByTestAtrr(component, 'ratingIcon');
      expect(ratingIcon.length).toBe(0);
    });
  });
});
