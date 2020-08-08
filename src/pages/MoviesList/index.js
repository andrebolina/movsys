import React, { Component } from 'react';
import { connect } from "react-redux";
import { getMovieList } from '../../actions';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import MoodIcon from '@material-ui/icons/Mood';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import Loading from '../../components/Loading';
import MovieCard from '../../components/MovieCard';

const useStyles = theme => ({
    formControl: {
        width: 125,
        marginRight: 15,
        textAlign: 'left'
    },
    container: {
        height: 450,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#888'
    },
    orderParams: {
        padding: 20,
        paddingTop: 0,
        paddingBottom: 40,
        textAlign: 'right'
    },
    icon: {
        fontSize: 72
    },
    welcomeMessage: {
        fontSize: 48,
        fontWeight: 'bold'
    },
    instructionsMessage: {
        paddingTop: 20,
        fontSize: 20
    },
    root: {
        display: 'flex',
        justifyContent: 'center',
        padding: 20,
        '& > *': {
            margin: theme.spacing(1)
        },
    },
    cardWrapper: {
        padding: 20,
        paddingTop: 0,
        display: 'grid',
        gridGap: 20,
        gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))'
    },
    card: {
        width: '90%',
        maxWidth: 900,
        height: 450,
        fontSize: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#aaa'
    },
  });

const mapStateToProps = state => {
    return { page: state.page, items: state.items, isLoading: state.isLoading };
};

const mapDispatchToProps = dispatch => {
    return {
        getMovieList: payload => dispatch(getMovieList(payload))
    };
}

class MoviesList extends Component {
    search(e) {
        e.preventDefault();
        if (this.inputTitle.value.length !== 0) {
            this.props.history.push(`/?title=${this.inputTitle.value}&year=${this.inputYear.value}&order=title&sort=asc`);
            this.props.getMovieList({title: this.inputTitle.value, year: this.inputYear.value});
        } else {
            this.props.history.push(`/?error`);
        }
    }

    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        if (params.get('title'))
            this.props.getMovieList({title: params.get('title'), year: params.get('year')});
    }

    sort_by(field, reverse) {

        const key = function(x) {
            return x[field]
        };
      
        reverse = !reverse ? 1 : -1;
      
        return function(a, b) {
            a = key(a);
            b = key(b)
            return reverse * ((a > b) - (b > a));
        }
    }

    handlerOrder(value) {
        const params = new URLSearchParams(this.props.location.search);
        this.props.history.push(`/?title=${this.inputTitle.value}&year=${this.inputYear.value}&order=${value}&sort=${params.get('sort')}`);
    }

    handleSort() {
        const params = new URLSearchParams(this.props.location.search);
        const newSort = params.get('sort') === "asc" ? "desc" : "asc";
        this.props.history.push(`/?title=${this.inputTitle.value}&year=${this.inputYear.value}&order=${params.get('order')}&sort=${newSort}`);
    }

    render() {
        const { classes } = this.props;
        const params = new URLSearchParams(this.props.location.search);
        const formError = params.get('error') !== null;
        const order = params.get('order');
        const reverse = params.get('sort') === "desc" ? true : false;

        let movieList;
        if (this.props.items && this.props.items.length > 0) {
            movieList = this.props.items.sort(this.sort_by(order, reverse)).map((item, i) => {
                return (
                    <MovieCard key={i} infos={item} />
                );
            });
        } else {
            movieList = <div className={classes.root}><Card className={classes.card}>Nenhum resultado encontrado</Card></div>
        }

        return (
            <>
                {this.props.isLoading && <Loading />}
                <form className={classes.root} noValidate autoComplete="off" onSubmit={this.search.bind(this)}>
                    <TextField label="Título" inputRef={el => this.inputTitle = el} defaultValue={params.get('title')} error={formError} helperText={formError ? "Campo obrigatório" : ""} />
                    <TextField label="Ano" inputRef={el => this.inputYear = el} defaultValue={params.get('year')} />
                    <Fab color="primary" aria-label="add" onClick={this.search.bind(this)}>
                        <SearchIcon />
                    </Fab>
                    <input type="submit" style={{ display: 'none' }} />
                </form>

                { (this.props.items && this.props.items.length > 0) && (
                    <div className={classes.orderParams}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>Ordenar por</InputLabel>
                            <Select
                                id="order"
                                value={order}
                                onChange={e => this.handlerOrder(e.target.value)}
                                label="Ordenar por"
                            >
                                <MenuItem value="title">Título</MenuItem>
                                <MenuItem value="rating">Avaliação</MenuItem>
                            </Select>
                        </FormControl>
                        <Fab onClick={() => this.handleSort()}>
                            {reverse ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                        </Fab>
                    </div>
                )}

                {params.get('title') || formError ? (
                    <div className={classes.cardWrapper}>{movieList}</div>
                    ) : (
                    <div className={classes.container}>
                        <MoodIcon className={classes.icon} />
                        <div className={classes.welcomeMessage}>Seja bem-vindo!</div>
                        <div className={classes.instructionsMessage}>Utilize os campos de busca acima para pesquisar um conteúdo!</div>
                    </div>
                )}
            </>
        );
    }
}

const MoviesListComponent = connect(mapStateToProps, mapDispatchToProps)(MoviesList);
export default withStyles(useStyles)(MoviesListComponent);