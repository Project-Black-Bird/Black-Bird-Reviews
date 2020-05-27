import React from "react";
import Axios from "axios";

import "./Comments.scss";
import commentsMock from "./COMMENTS_MOCK.json";

import Comment from "../Comment/Comment";

class Comments extends React.Component {
  state = {
    comments: [],
    limit: 2,
  };
  constructor(props) {
    super(props);
  }
  renderComments(arr) {
    let renderedComments = [];
    for (
      let commentIndex = 0;
      commentIndex <
      (this.state.limit < arr.length ? this.state.limit : arr.length);
      commentIndex++
    ) {
      let comment = arr[commentIndex];
      console.log("RENDERCOMMENTS", comment);
      renderedComments.push(
        <Comment
          comment_id={comment.comment_id}
          text={comment.comment}
          username={comment.username || "FIX COMMENTS USERNAME"}
        />
      );
    }
    return renderedComments;
  }
  componentWillMount() {
    Axios.get(`/api/comments/post/${this.props.post_id}`).then((response) => {
      console.log(response);
      this.setState({
        ...this.state,
        comments: response.data || [],
      });
    });
  }
  render() {
    return (
      <div className="Comments-container">
        {(this.state.comments || []).length > 0
          ? this.renderComments(this.state.comments)
          : "no comments here"}
      </div>
    );
  }
}
export default Comments;
