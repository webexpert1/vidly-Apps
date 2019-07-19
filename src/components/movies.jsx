import React, { Component } from 'react';
import Like from '../common/like';
import { getMovies } from '../services/fakeMovieService';

class Movies extends Component {
    state  = {
        movies: getMovies()
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

    render() {
        const {length: count } = this.state.movies;

        if(count === 0) {
            return <p>There are no moviies in the database. </p>
        }
        return (
            <div>
                <p>Showing {this.state.movies.length} movies in the database.</p>
                <table className="table">
                    <thead>
                        <tr>
                            <td>Title</td>
                            <td>Genre</td>
                            <td>Stock</td>
                            <td>Rate</td>
                            <td>
                               
                            </td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movies.map(movie => (
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
            </div>
        )
    }
}

export default Movies;

