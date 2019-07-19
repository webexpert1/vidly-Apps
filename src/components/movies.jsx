import React, { Component } from 'react';
import Like from '../common/like';
import { getMovies } from '../services/fakeMovieService';
import { paginate } from '../utils/paginate';
import Pagination from '../common/pagination';


class Movies extends Component {
    state  = {
        movies: getMovies(),
        currentPage: 1,
        pageSize: 4
    }

    handelDelete = (movie) => {
         const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies: movies});
    }

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    }

    handlePageChange = (page) => {
        this.setState({currentPage: page});
    }

   
    render() {
        const {length: count } = this.state.movies;
        const {currentPage, pageSize} = this.state;
        const { movies: allMovies } = this.state;

        const movies = paginate(allMovies, currentPage, pageSize)

        if(count === 0) {
            return <p>There are no moviies in the database. </p>
        }
        return (
            <div>
                <p>Showing {this.state.movies.length} movies in the database.</p>

                
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th>
                               
                            </th>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map(movie => (
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td> <Like liked={movie.liked} onClick={() =>this.handleLike(movie)} /></td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => this.handelDelete(movie)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
                <Pagination itemsCount={count} currentPage={currentPage} pageSize={pageSize} onPageChange={this.handlePageChange} />
            </div>
        )
    }
}

export default Movies;

