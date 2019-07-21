import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utils/paginate';
import Pagination from '../common/pagination';
import ListGroup from '../common/listGroup';
import MoviesTable from '../components/moviesTable';

import _ from 'lodash';


class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        selectedGenre: '',
        pageSize: 4,
        sortColumn: { path: 'title', order: 'asc'}
    }

    componentDidMount() {
        const genres = [{'_id':'', 'name': 'All Genres'},...getGenres()];
        this.setState({ movies: getMovies(), genres });
    }

    handelDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies: movies });
    }

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    }

    handleGenreSelect = (genre) => {
        this.setState({selectedGenre: genre, currentPage: 1});
    } 

    handleSort = (sortColumn) => {
        
        this.setState({ sortColumn});
    }

    getPagedData = () => {
        const {  currentPage, pageSize , selectedGenre, sortColumn, movies: allMovies } = this.state;


        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

        return {totalCount: filtered.length, data: movies };
    }

    render() {
        const { length: count } = this.state.movies;
        const {  currentPage, pageSize , selectedGenre, sortColumn, movies: allMovies } = this.state;
        
        if (count === 0) {
            return <p>There are no movies in the database. </p>
        }

        const { totalCount, data: movies} = this.getPagedData()
        return (
            <div className="row mt-30"> 
                <div className="col-3">
                    <ListGroup 
                         items={this.state.genres}
                         selectedGenre={this.state.selectedGenre}
                         onItemSelect={this.handleGenreSelect} />
                </div>
                <div className="col">
                    <p>Showing {totalCount} movies in the database.</p>
                    <MoviesTable movies={movies} 
                                onLike={this.handleLike} onDelete={this.handelDelete}
                                onSort={this.handleSort} sortColumn={sortColumn} />
                  
                    <Pagination itemsCount={totalCount} 
                                currentPage={currentPage} pageSize={pageSize}
                                onPageChange={this.handlePageChange} />

                </div>
            </div>
        )
    }
}

export default Movies;

