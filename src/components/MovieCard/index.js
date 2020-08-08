import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import defaultPoster from '../../assets/images/defaultPoster.jpg';
import ratingIcon from '../../assets/images/ratingIcon.png';

const useStyles = makeStyles({
  root: {
  },
  media: {
    height: 350,
  },
  title: {
    height: 65,
  },
  rating: {
      textAlign: 'right'
  },
  icon: {
      width: 18,
      marginRight: 5
  }
});

function MovieCard({ infos }) {
  const classes = useStyles();

  const history = useHistory();

  function seeMore(imdbId) {
    history.push('/movie/' + imdbId);
  }

  return (
    <Card className={classes.root} onClick={() => seeMore(infos.imdbID)}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={infos.Poster === "N/A" ? defaultPoster : infos.Poster}
        />
        <CardContent>
          <Typography variant="h5" className={classes.title}>
          {infos.title}
          </Typography>
          <Typography variant="h5" className={classes.rating}>
            <img src={ratingIcon} className={classes.icon} alt="" />{infos.rating}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;