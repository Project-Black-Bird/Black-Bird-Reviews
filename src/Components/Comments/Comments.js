import React from "react";
import Axios from "axios";

import "./Comments.scss";
import commentsMock from "./COMMENTS_MOCK.json";
class Comments extends React.Component {
  state = {
    comments: [],
  };
  constructor(props) {
    super(props);
  }
  renderComments(arr) {
    return arr.map((comment) => {
      return <div>{comment.text}</div>;
    });
  }
  componentDidMount() {
    this.setState({
      ...this.state,
      comments: this.renderComments(commentsMock),
    });
    //   Axios.get(
    //     "https://my.api.mockaroo.com/black_bird_reviews_comments_mock.json?key=b81e5900"
    //   )
    //     .then((response) => {
    //       this.renderComments(response.data);
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
  }
  render() {
    return (
      <div className="Comments-container">
        {(this.state.comments || []).length > 0
          ? this.state.comments
          : "no comments here"}
      </div>
    );
  }
}
export default Comments;
