import React, { Component } from 'react';
import { connect } from "react-redux";
import { getMovieList } from '../../services/api';
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

import useStyles from './styles';

const mapStateToProps = ({ movies, isLoading }) => {
    return { movies, isLoading };
};

const mapDispatchToProps = dispatch => {
    return {
        getMovieList: payload => dispatch(getMovieList(payload))
    };
}

class MoviesList extends Component {
    /*
        #Comment
        O componente tem uma execução padrão caso seja realizada a pesquisa diretamente pela URL e não pelo formulário
    */
    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        if (params.get('title'))
            this.props.getMovieList({title: params.get('title'), year: params.get('year')});
    }

    /*
        #Comment
        Método para inverter o sentido da ordenação, sem alterar as demais informações
    */
    handleSort() {
        const params = new URLSearchParams(this.props.location.search);
        const newSort = params.get('sort') === "asc" ? "desc" : "asc";
        this.props.history.push(`/?title=${this.inputTitle.value}&year=${this.inputYear.value}&order=${params.get('order')}&sort=${newSort}`);
    }

    /*
        #Comment
        Método para definir qual a propriedade a ser considerada na ordenação (Titulo ou Avaliações)
    */
    handlerOrder(value) {
        const params = new URLSearchParams(this.props.location.search);
        this.props.history.push(`/?title=${this.inputTitle.value}&year=${this.inputYear.value}&order=${value}&sort=${params.get('sort')}`);
    }

    /*
        #Comment
        Método genérico criado para ser utilizado no método sort nativo, com o intuito de ordenar a lista de objetos com base em uma das propriedades (Titulo ou Avaliações) e em um dos sentidos (Ascendente, Descendente), recebidos via parâmetros
    */
    sort_by(field, reverse) {
        const key = function(x) {
            return x[field]
        };
      
        reverse = !reverse ? 1 : -1;
      
        return function(a, b) {
            a = key(a);
            b = key(b);
            return reverse * ((a > b) - (b > a));
        }
    }

    /*
        #Comment
        Método que verifica os requisitos e realiza a atualização da lista de filmes, atualizando também a URL
    */
    search(e) {
        e.preventDefault();
        const { getMovieList, history } = this.props;
        const searchTitle = this.inputTitle.value;
        const seartchYear = this.inputYear.value;
        
        if (searchTitle.length !== 0) {
            getMovieList({title: searchTitle, year: seartchYear});
            history.push(`/?title=${searchTitle}&year=${seartchYear}&order=title&sort=asc`);
        } else {
            history.push(`/?error`);
        }
    }    

    render() {
        const { movies, classes, location, isLoading } = this.props;
        const params = new URLSearchParams(location.search);
        const formError = params.get('error') !== null;
        const order = params.get('order');
        const reverse = params.get('sort') === "desc" ? true : false;

        {/*
            #Comment
            Confere se existem filmes retornados pela API, se positivo retorna cada filme no componente MovieCard, caso contrário exibe uma mensagem padrão
        */}
        let movieList;
        if (movies && movies.length > 0) {
            movieList = movies.sort(this.sort_by(order, reverse)).map((item, i) => {
                return (
                    <MovieCard key={i} infos={item} />
                );
            });
        } else {
            movieList = <div className={classes.root}><Card className={classes.card}>Nenhum resultado encontrado</Card></div>
        }

        return (
            <>
                {isLoading && <Loading />}

                {/*
                    #Comment
                    Campos que serão usados como filtros para a pesquisa
                */}
                <form className={classes.root} noValidate autoComplete="off" onSubmit={this.search.bind(this)}>
                    <TextField
                        label="Título"
                        inputRef={el => this.inputTitle = el}
                        defaultValue={params.get('title')}
                        error={formError}
                        helperText={formError ? "Campo obrigatório" : ""}
                    />
                    <TextField
                        label="Ano"
                        inputRef={el => this.inputYear = el}
                        defaultValue={params.get('year')}
                    />
                    <Fab color="primary" onClick={this.search.bind(this)}><SearchIcon /></Fab>
                    <input type="submit" className={classes.inputButton} />
                </form>

                {/*
                    #Comment
                    Campo de seleção para definir o atributo de ordenação e botão para definir a ordem
                */}
                { (movies && movies.length > 0) && (
                    <div className={classes.orderParams}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>Ordenar por</InputLabel>
                            <Select
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

                {/*
                    #Comment
                    Verifica se o usuário já fez alguma pesquisa para exibir o resultado ou senão exibir a mensagem padrão de boas-vindas
                */}
                {params.get('title') || formError ? (
                    <div className={classes.cardWrapper}>{movieList}</div>
                    ) : (
                    <div className={classes.container}>
                        <MoodIcon className={classes.icon} />
                        <div className={classes.welcomeMessage}>Seja bem-vindo!</div>
                        <div className={classes.instructionsMessage}>Utilize os campos de busca acima para pesquisar um filme.</div>
                    </div>
                )}
            </>
        );
    }
}

const MoviesListComponent = connect(mapStateToProps, mapDispatchToProps)(MoviesList);
export default withStyles(useStyles)(MoviesListComponent);