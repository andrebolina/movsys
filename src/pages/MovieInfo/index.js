import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { connect } from "react-redux";
import { getMovieDetail } from '../../actions';

import defaultPoster from '../../assets/images/defaultPoster.jpg';
import ratingIcon from '../../assets/images/ratingIcon.png';

const useStyles = theme => ({
    container: {
        padding: 20
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    header: {
        display: 'flex',
        paddingTop: 20
    },
    poster: {
        maxHeight: 300,
        borderRadius: 8,
        marginRight: 24
    },
    mainProps: {
        width: '100%'
    },
    title: {
        fontSize: 32,
        fontWeight: '500',
        display: 'inline-block',
        marginRight: 5
    },
    year: {
        display: 'inline-block',
        color: '#888'
    },
    icon: {
        width: 20,
        marginRight: 5
    },
    plot: {
        paddingTop: 20,
        paddingBottom: 40,
        textAlign: 'justify'
    },
    moreInfo: {
        marginRight: 10,
        marginBottom: 10
    }
});

const mapStateToProps = state => {
    return { item: state.item };
};

const mapDispatchToProps = dispatch => {
    return {
        getMovieDetail: payload => dispatch(getMovieDetail(payload))
    };
}

class MovieInfo extends Component {
    componentDidMount() {
        this.props.getMovieDetail(this.props.match.params.imdbID);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <Fab variant="extended" color="primary" aria-label="add" onClick={() => this.props.history.goBack()}>
                    <ArrowBackIcon className={classes.extendedIcon} />
                    Voltar
                </Fab>
                <div className={classes.header}>
                    <img src={this.props.item.Poster === "N/A" ? defaultPoster : this.props.item.Poster} className={classes.poster} alt="" />
                    <div className={classes.mainProps}>
                            <Typography variant="h1" className={classes.title}>{this.props.item.Title}</Typography>
                            <Typography variant="h6" className={classes.year}>({this.props.item.Year})</Typography>
                            <Typography variant="h5" className={classes.rating}>
                                <img src={ratingIcon} className={classes.icon} alt="" />{this.props.item.imdbRating}
                            </Typography>
                            <div className={classes.plot}>
                                { this.props.item.Plot }
                            </div>
                            <Chip className={classes.moreInfo} label={<><strong>Genêro:</strong> {this.props.item.Genre}</>} />
                            <Chip className={classes.moreInfo} label={<><strong>Diretor:</strong> {this.props.item.Director}</>} />
                            <Chip className={classes.moreInfo} label={<><strong>Elenco:</strong> {this.props.item.Actors}</>} />
                            <Chip className={classes.moreInfo} label={<><strong>Duração:</strong> {this.props.item.Runtime}</>} />
                            <Chip className={classes.moreInfo} label={<><strong>País de origem:</strong> {this.props.item.Country} ({this.props.item.Language})</>} />
                            <Chip className={classes.moreInfo} label={<><strong>Produtora:</strong> {this.props.item.Production}</>} />
                    </div>
                </div>
            </div>
        );
    }
}

const MovieInfoComponent = connect(mapStateToProps, mapDispatchToProps)(MovieInfo);
export default withStyles(useStyles)(MovieInfoComponent);