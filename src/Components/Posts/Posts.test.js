import React from "react";
import Posts from "./Posts";
import TestRenderer from "react-test-renderer";
import PostsMock from "./POSTS_MOCK.json";
describe("Posts Component", () => {
  let component;
  let testInstance;
  beforeEach(() => {
    // component = TestRenderer.create(<Posts />);
    // testInstance = component.root;
  });
  it("should mount", () => {
    // console.log(testInstance.findAllByProps({ className: "Post-container" }));
  });
});
