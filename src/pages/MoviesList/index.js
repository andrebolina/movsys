import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getMovieList } from '../../actions';

import Loading from '../../components/Loading';

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
        if (this.refs.q.value.length !== 0) {
            this.props.history.push(`/?q=${this.refs.q.value}&y=${this.refs.y.value}&order=title&sort=asc`);
            this.props.getMovieList({q: this.refs.q.value, y: this.refs.y.value});
        }
    }

    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        if (params.get('q'))
            this.props.getMovieList({q: params.get('q'), y: params.get('y')});
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

    render() {
        const params = new URLSearchParams(this.props.location.search);
        const order = params.get('order');
        const reverse = params.get('sort') === "desc" ? true : false;

        let movieList;
        if (this.props.items && this.props.items.length > 0) {
            movieList = this.props.items.sort(this.sort_by(order, reverse)).map((item, i) => <div key={i}><img src={item.Poster} alt={item.title} /><a href={`/movie/${item.imdbID}`}>{item.title} - {item.Year} - {item.rating}</a></div> );
        } else {
            movieList = <div className="alert alert-info" role="alert">Not Found!</div> 
        }

        return (
            <>
                {this.props.isLoading && <Loading />}
                <div className='col-md-12'>
                    <h2 className="page-title">Search</h2>
                    <input type="text" placeholder="Enter Movie Title..." ref="q" defaultValue={params.get('q')} />
                    <input type="text" placeholder="Year" ref="y" defaultValue={params.get('y')} />
                    <button className="btn btn-primary btn-sm" type="submit" onClick={this.search.bind(this)} >Submit</button>
                </div>

                {params.get('q') ? movieList : <div>Faça sua busca</div>}
            </>
        );
    }
}

const MoviesListComponent = connect(mapStateToProps, mapDispatchToProps)(MoviesList);
export default withRouter(MoviesListComponent);