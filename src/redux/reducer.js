export const initialState = {
  user: {},
  posts: [],
};

export const GET_USER = "GET_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const GET_POSTS = "GET_POSTS";

//action that will take the user object received from the database and will place it in redux state, making it available for all components to use.
export function getUser(userObj) {
  return {
    type: GET_USER,
    payload: userObj,
  };
}

//action that will clear the user from redux state when the user has logged out.
export function logoutUser() {
  return {
    type: LOGOUT_USER,
    payload: {},
  };
}

//action that will take the post object received from the database and will place it in redux state, making it available for all components to use.
export function getPosts(posts) {
  return {
    type: GET_POSTS,
    payload: posts,
  };
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USER:
      return { ...state, user: payload };
    case LOGOUT_USER:
      return { ...state, user: payload };
    case GET_POSTS:
      return { ...state, posts: payload };
    default:
      return state;
  }
}
