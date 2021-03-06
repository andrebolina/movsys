import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import defaultPoster from '../../assets/images/defaultPoster.jpg';
import ratingIcon from '../../assets/images/ratingIcon.png';

import useStyles from './styles';

function MovieCard({ infos }) {
  const classes = useStyles();

  const history = useHistory();

  function seeMore(imdbId) {
    history.push('/movie/' + imdbId);
  }

  return (
    <Card
      className={classes.root}
      onClick={() => seeMore(infos.imdbID)}
      data-test="rootCard"
    >
      <CardActionArea data-test="actionArea">
        <CardMedia
          className={classes.media}
          image={infos.Poster === 'N/A' ? defaultPoster : infos.Poster}
          data-test="poster"
        />
        <CardContent>
          <Typography variant="h5" className={classes.title} data-test="title">
            {infos.title}
          </Typography>
          <Typography
            variant="h5"
            className={classes.rating}
            data-test="rating"
          >
            <img
              src={ratingIcon}
              className={classes.icon}
              alt=""
              data-test="ratingIcon"
            />
            {infos.rating}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

MovieCard.propTypes = {
  infos: PropTypes.shape({
    imdbID: PropTypes.string,
    Poster: PropTypes.string,
    title: PropTypes.string,
    rating: PropTypes.string,
  }).isRequired,
};

export default MovieCard;
