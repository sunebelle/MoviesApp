import { API } from "../api";

export const getMovies = () => {
    return API.GET_MOVIES()
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};