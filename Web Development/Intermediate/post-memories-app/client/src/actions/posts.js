import * as api from '../api/index'
import * as types from '../Constants/actionTypes.js';

export const getPosts = () => async (dispatch) => {

    try {
        const { data } = await api.fetchPosts()

        dispatch({
            type: types.FETCH_ALL,
            payload: data
        })

    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPosts(post);

        dispatch({
            type: types.CREATE,
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: types.DELETE, payload: id })

    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {

        const { data } = await api.updatePost(id, post);

        dispatch({ type: types.UPDATE, payload: data })

    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {

        const { data } = await api.likePost(id)

        dispatch({ type: types.LIKE, payload: data })

    } catch (error) {
        console.log(error)
    }
}