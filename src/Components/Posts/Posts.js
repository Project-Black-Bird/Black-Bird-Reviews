import React from "react";
import { connect } from "react-redux";
import Post from "../Post/Post";
import "./Posts.css";
import posts from "./POSTS_MOCK.json";
class Posts extends React.Component {
  state = {
    posts: [],
  };
  constructor(props) {
    super(props);
  }
  getAllPosts() {
    this.setState({ posts: posts });
  }
  renderPosts() {
    return this.state.posts.map((post) => {
      <Post
        title="Example Post"
        review="Blank review"
        likes={0}
        {...this.props.user}
      />;
    });
  }
  componentDidMount() {
    this.getAllPosts();
  }
  render() {
    return <div className="Posts-container">{this.renderPosts()}</div>;
  }
}
export default Posts;
