import React from "react";
import Axios from "axios";

import "./Comments.scss";

class Comments extends React.Component {
  state = {
    comments: [],
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
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
