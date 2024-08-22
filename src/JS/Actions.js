import {movies$} from '../movies';
import { GET_MOVIES, GET_MOVIES_ERROR } from './ActionsType';


export const getMovies = () => (dispatch) => {
     Promise.all([movies$]).then((results) => {
        let movies = [];
        results.forEach((result) => {
            movies = [...movies, ...result];
        });
        console.log(movies)
        dispatch({
            type: GET_MOVIES,
            payload: movies
        });
    }).catch((error) => {
        console.error('Error in one of the promises:', error);
        dispatch({
            type: GET_MOVIES_ERROR,
            payload: error
        });
    });
};

export const getAndRemoveMovie = (movieIdToRemove)  => (dispatch , getState) => {
    try {

            const currentMovies = getState().movies; // Récupérer l'état actuel des films

            // Filtrer le tableau pour supprimer le film avec l'id spécifique
            const updatedMovies = currentMovies.filter(movie => movie.id !== movieIdToRemove);

            // Dispatch de l'action avec le tableau mis à jour
            dispatch({
                type: GET_MOVIES,
                payload: updatedMovies
            });

    } catch (error) {
        console.error('Error in getAndRemoveMovie:', error);

    }

};

export const incrementLikes = (movieId) => (dispatch , getState) => {
    try {

        const currentMovies = getState().movies; // Récupérer l'état actuel des films

        // Filtrer le tableau pour supprimer le film avec l'id spécifique
        const updatedMovies = currentMovies.map(movie => {
            if(movie.id === movieId )
            return {...movie, likes: movie.likes + 1
        }
        return movie;
        });

        // Dispatch de l'action avec le tableau mis à jour
        dispatch({
            type: GET_MOVIES,
            payload: updatedMovies
        });

} catch (error) {
    console.error('Error in getAndRemoveMovie:', error);
}

};


export const decrementLikes = (movieId) => (dispatch , getState) => {
    try {

        const currentMovies = getState().movies; // Récupérer l'état actuel des films

        // Filtrer le tableau pour supprimer le film avec l'id spécifique
        const updatedMovies = currentMovies.map(movie => {
            if(movie.id === movieId )
            return {...movie, dislikes: movie.dislikes + 1
        }
        return movie;
        });

        // Dispatch de l'action avec le tableau mis à jour
        dispatch({
            type: GET_MOVIES,
            payload: updatedMovies
        });

} catch (error) {
    console.error('Error in getAndRemoveMovie:', error);
}

};

