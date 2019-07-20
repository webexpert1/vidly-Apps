import React from 'react'
import Like from '../common/like';

const MoviesTable = (props) => {
    const { movies, onLike, onDelete } = props;
    return (
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
                    <td> <Like liked={movie.liked} onClick={() => onLike(movie)} /></td>
                    <td>
                        <button className="btn btn-danger" onClick={() => onDelete(movie)}>Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>

    </table>
    );
}

export default MoviesTable;