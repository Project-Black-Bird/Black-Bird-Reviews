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
      let { user } = this.props;
      user = user || {};
      user.id = user.id || 0;
      user.email = user.email || "blackbirdreviews@yahoo.com";
      return (
        <Post
          image={post.image}
          title={post.title}
          review={post.review}
          likes={post.likes}
          user={{ ...this.props.user, ...user }}
        />
      );
    });
  }
  componentDidMount() {
    this.getAllPosts();
  }
  render() {
    return <div className="Posts-container">{this.renderPosts()}</div>;
  }
}
function mapStateToProps(state) {
  let { user } = state;
  return { user };
}
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
