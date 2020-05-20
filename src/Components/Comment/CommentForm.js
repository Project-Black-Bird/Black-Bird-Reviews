import React, { Component } from 'react';
import './CommentForm.scss';

class CommentForm extends Component {
	// state = {
	// 	body: '',
	// };

	// handleChange = event => {

	// };
	// handleSubmit = event => {

	// };

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<h4>Write your comment</h4>
					<textarea
						type="text"
						label="Comment"
						// onChange={this.handleChange}
						className="textArea"
						placeholder="Type your comment here.."
					/>
					<div>
						<button className="form-btn" type="submit">
							Submit
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default CommentForm;
