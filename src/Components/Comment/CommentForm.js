import React, { Component } from "react";
import "./CommentForm.scss";
import { connect } from 'react-redux';
import axios from 'axios';

class CommentForm extends Component {

  state = {
  	comment: '',
  };

  handleChange = e => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    const {comment} = this.state;
    e.preventDefault();
    if(comment){
			axios
				.post('/api/comment', { user_id:this.props.user.user_id, comment, post_id:this.props.post_id })
				.then(() => {
					
				})
				.catch(err => console.log(err));
		}
		else{
			window.alert('Please enter all the fields!');
		}
  };

  render() {
    // console.log(this.props.edit);
    return (
      <form className="CommentForm-container" onSubmit={e => this.handleSubmit(e)}>
        {/* <h4>Write your comment</h4> */}
        <textarea
          type="text"
          label="Comment"
          name="comment"
          onChange={e => this.handleChange(e)}
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
	let { user} = state;
	return { user};
}
const mapDispatchToProps = { };
export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
