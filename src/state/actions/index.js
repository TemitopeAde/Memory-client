import axios from 'axios';
import { SEARCH_MEMORIES, SEARCH_MEMORIES_FAILED, ADD_MEMORIES_FAILED, ADD_MEMORIES_SUCCESS, DELETE_MEMORIES_FAILED, DELETE_MEMORIES_SUCCESS, EDIT_MEMORIES_FAILED, EDIT_MEMORIES_SUCCESS, GET_ALL_MEMORIES_FAILED, GET_ALL_MEMORIES_SUCCESS, GET_SINGLE_MEMORY_FAILED, GET_SINGLE_MEMORY_SUCCESS, LIKE_POST_FAILED, LIKE_POST_SUCCESS, LOADING, LOGOUT, NOT_LOADING, RESET_STATUS, SIGNIN_FAILED, SIGNIN_SUCCESS, SIGNUP_FAILED, SIGNUP_SUCCESS, GET_COMMENT, GET_COMMENT_FAILED, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILED } from './types';


export const signin = (data) => async (dispatch) => {

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { email, password } = data;
  const url = `http://localhost:5000/users/signin`

  const body = JSON.stringify({ email, password });
  dispatch({
    type: LOADING,
    payload: null
  })

  await axios.post(url, body, config)
    .then((result) => {
      console.log(result);
      dispatch({
        type: SIGNIN_SUCCESS,
        payload: result
      })
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: SIGNIN_FAILED,
        payload: error
      })
    })
    .then(() => {
      dispatch({
        type: NOT_LOADING,
        payload: null
      })
    })

}

export const logout = () => async (dispatch) => {
  console.log("logout");
  dispatch({
    type: LOGOUT,
    payload: null
  })
}

export const likePost = (id) => async (dispatch, getState) => {
  console.log(id);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getState().auth.token}`,
    },
  };

  const url = `http://localhost:5000/posts/${id}/likePost`

  dispatch({
    type: LOADING,
    payload: null
  })



  await axios.patch(url, {}, config)
    .then((result) => {
      console.log(result);
      dispatch({
        type: LIKE_POST_SUCCESS,
        payload: result
      })
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: LIKE_POST_FAILED,
        payload: error
      })
    })
    .then(() => {
      dispatch({
        type: NOT_LOADING,
        payload: null
      })
    })

}

export const deletePost = (id) => async (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getState().auth.token}`,
    },
  };

  const url = `http://localhost:5000/posts/${id}`

  dispatch({
    type: LOADING,
    payload: null
  })

  await axios.delete(url, config)
    .then((result) => {
      console.log(result);
      dispatch({
        type: DELETE_MEMORIES_SUCCESS,
        payload: result
      })
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: DELETE_MEMORIES_FAILED,
        payload: error
      })
    })
    .then(() => {
      dispatch({
        type: NOT_LOADING,
        payload: null
      })
    })

}

export const signup = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { firstName, lastName, email, password, confirmPassword } = data;
  const url = `http://localhost:5000/users/signup`;

  const body = JSON.stringify({ firstName, lastName, confirmPassword, email, password });
  dispatch({
    type: LOADING,
    payload: null
  })

  await axios.post(url, body, config)
    .then((result) => {
      console.log(result);
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: result
      })
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: SIGNUP_FAILED,
        payload: error
      })
    })
    .then(() => {
      dispatch({
        type: NOT_LOADING,
        payload: null
      })
    })
}

export const getMemories = (page) => async (dispatch) => {

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url = `http://localhost:5000/posts?page=${page}`;
  dispatch({
    type: LOADING,
    payload: null
  })

  axios.get(url, config)
    .then((res) => {
      dispatch({
        type: GET_ALL_MEMORIES_SUCCESS,
        payload: res.data
      });

      dispatch({
        type: SEARCH_MEMORIES_FAILED,
        payload: null
      })
    })
    .catch((err) => {
      dispatch({
        type: GET_ALL_MEMORIES_FAILED,
        payload: err
      })
    })
    .then(() => {
      dispatch({
        type: NOT_LOADING,
        payload: null
      })
    })
}

export const getSingleMemories = (data) => async (dispatch) => {


  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url = `http://localhost:5000/posts/${data}`;

  dispatch({
    type: LOADING,
    payload: null
  })

  axios.get(url, config)
    .then((res) => {
     
      dispatch({
        type: GET_SINGLE_MEMORY_SUCCESS,
        payload: res.data.post
      })
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_SINGLE_MEMORY_FAILED,
        payload: err
      })
    })
    .then(() => {
      dispatch({
        type: NOT_LOADING,
        payload: null
      })
    })


}

export const searchMemories = (data) => async (dispatch) => {
  const { params, tags } = data;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url = `http://localhost:5000/posts/search?tags=${tags}&searchQuery=${params}`;

  dispatch({
    type: LOADING,
    payload: null
  })

  axios.get(url, config)
    .then((res) => {
      console.log(res.data.data);
      dispatch({
        type: SEARCH_MEMORIES,
        payload: res.data
      })
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SEARCH_MEMORIES_FAILED,
        payload: err
      })
    })
    .then(() => {
      dispatch({
        type: NOT_LOADING,
        payload: null
      })
    })
}


export const createMemory = (data) => async (dispatch, getState) => {

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getState().auth.token}`,
    },
  };

  const url = `http://localhost:5000/posts`;

  dispatch({
    type: LOADING,
    payload: null
  })

  await axios.post(url, data, config)
    .then((result) => {
      console.log(result);
      dispatch({
        type: ADD_MEMORIES_SUCCESS,
        payload: result
      })
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: ADD_MEMORIES_FAILED,
        payload: error
      })
    })
    .then(() => {
      dispatch({
        type: NOT_LOADING,
        payload: null
      })
    })
}


export const updateMemory = (data, id) => async (dispatch, getState) => {
  const url = `http://localhost:5000/posts/${id}`;

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getState().auth.token}`,
    },
  };

  dispatch({
    type: LOADING,
    payload: null
  })

  axios.patch(url, data, config)
    .then((result) => {
      console.log(result);
      dispatch({
        type: EDIT_MEMORIES_SUCCESS,
        payload: result
      })
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: EDIT_MEMORIES_FAILED,
        payload: error
      })
    })
    .then(() => {
      dispatch({
        type: NOT_LOADING,
        payload: null
      })
    })
}


export const resetStatus = () => async (dispatch) => {
  dispatch({
    type: RESET_STATUS,
    payload: null
  })
}


export const addComments = (data) => async (dispatch) => {
  const {id, comment} = data;
  console.log(id, comment);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url = `http://localhost:5000/posts/${id}/comment`;

  dispatch({
    type: LOADING,
    payload: null
  })

  await axios.post(url, data, config)
    .then((res) => {
      dispatch({
        type: ADD_COMMENT_SUCCESS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: ADD_COMMENT_FAILED,
        payload: null
      })
    })
}