import React from "react";
import Posts from "../../Components/Posts/Posts";
import TestRenderer from "react-test-renderer";
import PostsMock from "../../Components/Posts/POSTS_MOCK.json";
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
