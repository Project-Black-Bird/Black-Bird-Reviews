import React from "react";

import "EditPost.scss";
class EditPost extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="EditPost-container">
        <input name="title" />
        <input name="" />
      </div>
    );
  }
}
export default EditPost;
