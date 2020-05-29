const initialState = {
  user: {},
  posts: [],
  update: {
    comments: false,
    commentsCount: false,
  },
};

const GET_USER = "GET_USER";
const LOGOUT_USER = "LOGOUT_USER";
const GET_POSTS = "GET_POSTS";
const ADD_COMMENT = "ADD_COMMENT";
const UPDATE_COMMENTS = "UPDATE_COMMENTS";
const UPDATE_COMMENTS_COUNT = "UPDATE_COMMENTS_COUNT";
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
export function addComment() {
  console.log("REDUX ADD COMMENT");
  return { type: ADD_COMMENT, payload: {} };
}
export function updateCommentsDone() {
  return { type: UPDATE_COMMENTS, payload: {} };
}
export function updateCommentsCountDone() {
  return { type: UPDATE_COMMENTS_COUNT, payload: {} };
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
    case ADD_COMMENT:
      return { ...state, update: { comments: true, commentsCount: true } };
    case UPDATE_COMMENTS:
      return {
        ...state,
        update: { comments: false, commentsCount: state.update.commentsCount },
      };
    case UPDATE_COMMENTS_COUNT:
      if (payload.post_id && payload.count) {
        console.log("updating count for posts");
        let posts = [
          ...state.posts.map((post) => {
            if (post.post_id == payload.post_id) {
            }
          }),
        ];
        return {
          ...state,
          posts,
          update: { comments: state.update.comments, commentsCount: false },
        };
      }
      return {
        ...state,
        update: { comments: state.update.comments, commentsCount: false },
      };
    default:
      return state;
  }
}
