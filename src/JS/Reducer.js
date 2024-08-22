import { GET_MOVIES, GET_MOVIES_ERROR } from "./ActionsType";

const initialState = {
    movies: [],
    error : null
}


const Reducer = (state = initialState, {type , payload}) => {
    switch (type) {
        case GET_MOVIES:
            return {
                ...state,
                movies: payload
            }
        case GET_MOVIES_ERROR:
            return {
                ...state ,
                error: payload
            }
        default:
            return state;
    }
}

export default Reducer;
