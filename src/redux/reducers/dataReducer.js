import {
    GET_POSTS,
    LOADING_DATA,
    ADD_POST,
    GET_COMMENTS,
    ADD_COMMENT
} from '../types';

const initialState = {
    posts: [],
    comments: [],
    post: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        case ADD_POST:
            return {   
                ...state,
                posts: [action.payload, ...state.posts]
            };
            case ADD_COMMENT:
                return {
                    ...state,
                    comments: [action.payload, ...state.comments]
                };
            case GET_COMMENTS:
                return {
                    ...state,
                    post: action.payload.post,
                    comments: action.payload.comments
                };
        default:
            return state;
    }
}