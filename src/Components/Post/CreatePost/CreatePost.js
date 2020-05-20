import React from "react";

import "./CreatePost.scss";
class CreatePost extends React.Component {
  state = {
    title: "",
    image: "",
    review: "",
  };
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInput(e) {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
  }
  render() {
    return (
      <div className="CreatePost-container">
        <h4>Create a review</h4>
        <form onSubmit={this.handleSubmit}>
          <input name="title" placeholder="Name of the product" />
          <input name="image" placeholder="Image Link" />
          <textarea name="review" placeholder="Review" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
export default CreatePost;
