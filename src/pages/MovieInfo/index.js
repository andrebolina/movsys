import React, { Component } from 'react';
import { connect } from "react-redux";
import { getMovieInfo } from '../../services/api';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import defaultPoster from '../../assets/images/defaultPoster.jpg';
import ratingIcon from '../../assets/images/ratingIcon.png';

import useStyles from './styles';

const mapStateToProps = ({ movie }) => {
    return { movie };
};

const mapDispatchToProps = dispatch => {
    return {
        getMovieInfo: payload => dispatch(getMovieInfo(payload))
    };
}

class MovieInfo extends Component {
    /*
        #Comment
        No carregamento os dados do produto informado via paramêtro na URL são obtidos
    */
    componentDidMount() {
        const { getMovieInfo } = this.props;
        const { imdbID } = this.props.match.params;

        getMovieInfo(imdbID);
    }

    render() {
        const { movie, classes, history } = this.props;

        return (
            <div className={classes.container}>
                <Fab variant="extended" color="primary" aria-label="add" onClick={() => history.goBack()}>
                    <ArrowBackIcon className={classes.extendedIcon} />
                    Voltar
                </Fab>

                <div className={classes.header}>
                    <img src={movie.Poster === "N/A" ? defaultPoster : movie.Poster} className={classes.poster} alt="" />
                    <div className={classes.mainProps}>
                            <Typography variant="h1" className={classes.title}>{movie.Title}</Typography>
                            <Typography variant="h6" className={classes.year}>({movie.Year})</Typography>
                            <Typography variant="h5" className={classes.rating}>
                                <img src={ratingIcon} className={classes.icon} alt="" />
                                {movie.imdbRating}
                            </Typography>
                            <div className={classes.plot}>{movie.Plot}</div>
                            <Chip className={classes.moreInfo} label={<><strong>Genêro:</strong> {movie.Genre}</>} />
                            <Chip className={classes.moreInfo} label={<><strong>Diretor:</strong> {movie.Director}</>} />
                            <Chip className={classes.moreInfo} label={<><strong>Elenco:</strong> {movie.Actors}</>} />
                            <Chip className={classes.moreInfo} label={<><strong>Duração:</strong> {movie.Runtime}</>} />
                            <Chip className={classes.moreInfo} label={<><strong>País de origem:</strong> {movie.Country} ({movie.Language})</>} />
                            <Chip className={classes.moreInfo} label={<><strong>Produtora:</strong> {movie.Production}</>} />
                    </div>
                </div>
            </div>
        );
    }
}

const MovieInfoComponent = connect(mapStateToProps, mapDispatchToProps)(MovieInfo);
export default withStyles(useStyles)(MovieInfoComponent);