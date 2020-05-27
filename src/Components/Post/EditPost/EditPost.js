import React from "react";

import "./EditPost.scss";
class EditPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.image || "https://via.placeholder.com/150",
      title: this.props.title,
      review: this.props.review,
    };
    this.handleImageInput = this.handleImageInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReviewInput = this.handleReviewInput.bind(this);
    this.handleTitleInput = this.handleTitleInput(this);
  }
  handleImageInput(e) {
    this.setState({ ...this.state, image: e.target.value });
  }
  handleTitleInput(e) {
    this.setState({ ...this.state, title: e.target.value });
  }
  handleReviewInput(e) {
    this.setState({
      ...this.state,
      review:
        e.target.value >= 500 ? e.target.value.substr(0, 500) : e.target.value,
    });
  }
  handleSubmit(e) {
    e.passive = true;
    e.preventDefault();
    this.props.doneEditing(this.state);
  }
  render() {
    return (
      <form className="EditPost-container" onSubmit={this.handleSubmit}>
        <div className="img-group">
          <img src={this.state.image} />
          <input
            name="image"
            value={this.state.image}
            onChange={this.handleImageInput}
            placeholder="Enter an image Url"
            alt="loading..."
          />
        </div>
        <input
          name="title"
          onChange={this.handleTitleInput}
          value={this.state.title}
        />
        <textarea
          name="review"
          value={this.state.review}
          onChange={this.handleReviewInput}
        />
        <button type="submit">Save</button>
      </form>
    );
  }
}
export default EditPost;
