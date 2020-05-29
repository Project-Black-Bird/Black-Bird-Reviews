import React, { Component } from "react";
import "./CommentForm.scss";
import { connect } from "react-redux";
import axios from "axios";

class CommentForm extends Component {
  state = {
    comment: "",
  };
  constructor(props) {
    super(props);
  }
  handleChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    const { comment } = this.state;
    e.preventDefault();
    if (comment) {
      // console.log(this.props.user.user_id);
      // console.log(this.props.post_id);
      // console.log(comment);
      axios
        .post("/api/comments", {
          user_id: this.props.user.user_id,
          comment,
          post_id: this.props.post_id,
        })
        .then((res) => {
          // console.log(res.data);
          if(this.props.showComments){
            this.props.toggleComments();
            this.props.toggleComments();
          }
          else{
            this.props.toggleComments();
          }
          this.setState({comment:""});
        })
        .catch((err) => console.log(err));
    } else {
      window.alert("Please enter all the fields!");
    }
  };

  render() {
    // console.log(this.props.edit);
    return (
      <form
        className="CommentForm-container"
        onSubmit={(e) => this.handleSubmit(e)}>
        {/* <h4>Write your comment</h4> */}
        <textarea
          type="text"
          label="Comment"
          value={this.state.comment}
          name="comment"
          onChange={this.handleChange}
          className="textArea"
          placeholder="Type your comment here..."
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

function mapStateToProps(state) {
  let { user } = state;
  return { user };
}
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
