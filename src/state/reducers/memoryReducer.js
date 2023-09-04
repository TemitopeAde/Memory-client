import { ADD_COMMENT_FAILED, ADD_COMMENT_SUCCESS, ADD_MEMORIES_SUCCESS, EDIT_MEMORIES_FAILED, EDIT_MEMORIES_SUCCESS, GET_ALL_MEMORIES_FAILED, GET_ALL_MEMORIES_SUCCESS, GET_COMMENT, GET_SINGLE_MEMORY_SUCCESS, RESET_STATUS, SEARCH_MEMORIES, SEARCH_MEMORIES_FAILED } from "../actions/types";


const initialState = {
  addComment: false,
  allMemories: [],
  searchMemories: [],
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

  if (type === GET_COMMENT) {
    return {
      ...state,
      allComments: payload
    }
  }

  if (type === SEARCH_MEMORIES) {
    return {
      ...state,
      searchMemories: payload
    }
  }

  if (type === SEARCH_MEMORIES_FAILED) {
    return {
      ...state,
      searchMemories: []
    }
  }

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
      updatedPost: payload.data.updatedPost,
      statusText: payload.statusText
    }
  }

  if (type === EDIT_MEMORIES_FAILED) {
    
  }
  
  if (type === ADD_MEMORIES_SUCCESS) {
    
    return {
      ...state,
      addMemory: "Memory added",
      statusText: payload.statusText
    }
  }

  if (type === GET_ALL_MEMORIES_SUCCESS) {
    console.log(payload, "payload");
    return {
      ...state,
      allMemories: payload,
      currentPage: payload,
      numberOfPage: payload,
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
    return {
      ...state,
      addComment: true
    }
  }

  if (type === ADD_COMMENT_FAILED) {
    return {
      ...state,
      addComment: false
    }
  }

  return state
};


export default memoryReducer;

