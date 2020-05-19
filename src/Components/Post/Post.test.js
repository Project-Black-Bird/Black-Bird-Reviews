///<reference types='jest' />
import React from "react";
import Post from "./Post";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import store from "../..";

describe("Post Component", () => {
  let component;
  beforeEach(() => {
    // component = renderer.create(
    //   <Provider store={store}>
    //     <Post />
    //   </Provider>
    // );
    console.log("hello world");
  });
  test("should mount", () => {});
});
