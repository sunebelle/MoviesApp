import axiosClient from "../helpers/axiosClient";

export const API = {
    GET_MOVIES: (): Promise<any> => {
        return axiosClient.get(`/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&sort_by=popularity.desc`);
    },
}