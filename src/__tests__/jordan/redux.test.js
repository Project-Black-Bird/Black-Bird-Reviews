///<reference types='jest' />

import * as reducer from "../../redux/reducer";
// import reduxStore from "../../redux/store";
import { createStore } from "redux";

import postsMock from "../../Components/Posts/POSTS_MOCK.json";
describe("redux store", () => {
  let state;
  let store;
  let user = {
    user_id: 0,
    username: "blackBirdReviews",
    email: "blackBirdReviews@yahoo.com",
  };
  beforeEach(() => {
    store = createStore(reducer.default);
    state = store.getState();
    expect(state).toEqual(reducer.initialState);
  });
  it("should let you dispatch user updates", () => {
    store.dispatch(reducer.getUser(user));
    expect(store.getState().user).toEqual(user);
  });
  it("should let you dispatch postsUpdate", () => {
    expect(store.getState().posts).toEqual([]);
    store.dispatch(reducer.getPosts(postsMock));
    expect(store.getState().posts).toEqual(postsMock);
  });
  it("should let you log out the user on the front end", () => {
    store.dispatch(reducer.getUser(user));
    store.dispatch(reducer.logoutUser());
    expect(store.getState().user).toEqual({});
  });
});
