import React, { Component } from "react";
import "./CommentForm.scss";
import Axios from "axios";
import PropTypes from "prop-types";
class CommentForm extends Component {
  state = {
    body: "",
  };
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // handleChange = event => {

  // };
  handleSubmit(e) {
    e.preventDefault();
    console.log(e.target.elements);
    Axios.post("/api/comments", {
      post_id: this.props.post_id,
      user_id: this.props.user_id,
      comment: this.state.body,
    })
      .then((response) => {
        console.log("successfully added commment");
        this.props.showComments();
      })
      .catch((e) => {
        console.error(e);
      });
  }
  handleInput(e) {
    this.setState({ ...this.state, body: e.target.value });
  }

  render() {
    // console.log(this.props.edit);
    return (
      <form className="CommentForm-container" onSubmit={this.handleSubmit}>
        {/* <h4>Write your comment</h4> */}
        <textarea
          type="text"
          label="Comment"
          // onChange={this.handleChange}
          className="textArea"
          value={this.state.body}
          onChange={this.handleInput}
          placeholder="Type your comment here.."
        />
        <div>
          <button className="form-btn" type="submit" disabled={this.props.edit}>
            Submit
          </button>
        </div>
      </form>
    );
  }
}
CommentForm.propTypes = {
  post_id: PropTypes.number.isRequired,
  user_id: PropTypes.number.isRequired,
};
export default CommentForm;
