import React from "react";
import Axios from "axios";
import connect from "react-redux";

import "./Comments.scss";
import commentsMock from "./COMMENTS_MOCK.json";

import Comment from "../Comment/Comment";

class Comments extends React.Component {
  state = {
    comments: [],
    limit: 0,
  };
  constructor(props) {
    super(props);
  }
  renderComments(arr) {
    let renderedComments = [];
    // let limit = this.state.comments.length
    for (
      let commentIndex = 0;
      commentIndex < this.state.comments.length;
      commentIndex++
    ) {
      let comment = arr[commentIndex];
      renderedComments.push(
        <Comment
          key={comment.comment_id}
          comment_id={comment.comment_id}
          text={comment.comment}
          username={comment.username || "FIX COMMENTS USERNAME"}
        />
      );
    }
    return renderedComments;
  }
  getComments() {
    Axios.get(`/api/comments/post/${this.props.post_id}`).then((response) => {
      console.log(response);
      this.setState({
        ...this.state,
        comments: response.data || [],
      });
    });
  }
  componentWillMount() {
    this.getComments();
  }
  render() {
    return (
      <div className="Comments-container">
        {(this.state.comments || []).length > 0 ? (
          <>
            {this.renderComments(this.state.comments)}
            {/* <button className="comments-buttons" onClick={this.getMoreComments}>
              View more comments
            </button> */}
            {/* <button className="comments-buttons" onClick={this.props.toggle}>
              Hide Comments
            </button> */}
          </>
        ) : (
          "no comments here"
        )}
      </div>
    );
  }
}
export default Comments;
