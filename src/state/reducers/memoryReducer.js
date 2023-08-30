import { ADD_COMMENT_FAILED, ADD_COMMENT_SUCCESS, ADD_MEMORIES_SUCCESS, EDIT_MEMORIES_FAILED, EDIT_MEMORIES_SUCCESS, GET_ALL_MEMORIES_FAILED, GET_ALL_MEMORIES_SUCCESS, GET_SINGLE_MEMORY_SUCCESS, RESET_STATUS } from "../actions/types";


const initialState = {
  allMemories: [],
  memories: {},
  allComments: [],
  addMemory: "",
  cuurentPage: null,
  numberOfPage: null,
  statusText: "",
  updatedPost: {}
}


const memoryReducer = (state = initialState, action) => {
  const { type, payload } = action;

  if (type === RESET_STATUS) {
    return {
      ...state,
      statusText: ""
    }
  }

  if (type === EDIT_MEMORIES_SUCCESS) {
    console.log(payload.data.updatedPost);
    return {
      ...state,
      updatedPost: payload.data.updatedPost
    }
  }

  if (type === EDIT_MEMORIES_FAILED) {
    
  }
  
  if (type === ADD_MEMORIES_SUCCESS) {
    // console.log(payload.statusText);
    return {
      ...state,
      addMemory: "Memory added",
      statusText: payload.statusText
    }
  }

  if (type === GET_ALL_MEMORIES_SUCCESS) {
    return {
      ...state,
      allMemories: payload.data,
      currentPage: payload.currentPage,
      numberOfPage: payload.numberOfPage
    }
  }

  if (type === GET_ALL_MEMORIES_FAILED) {
    return {
      ...state,
      allMemories: []
    }
  }

  if (type === GET_SINGLE_MEMORY_SUCCESS) {
    return {
      ...state,
      memories: payload
    }
  }

  if (type === ADD_COMMENT_SUCCESS) {

  }


  if (type === ADD_COMMENT_FAILED) {

  }

  return state
};


export default memoryReducer;

