import React, { Component } from 'react';
import './CommentForm.scss';

class CommentForm extends Component {
	state = {
		body: '',
		errors: {},
	};

	// componentWillReceiveProps(nextProps) {
	// 	if (nextProps.UI.errors) {
	// 		this.setState({ errors: nextProps.UI.errors });
	// 	}
	// 	if (!nextProps.UI.errors && !nextProps.UI.loading) {
	// 		this.setState({ body: '' });
	// 	}
	// }

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};
	handleSubmit = event => {
		event.preventDefault();
		this.props.submitComment(this.props.screamId, { body: this.state.body });
	};

	render() {
		const { classes, authenticated } = this.props;
		const errors = this.state.errors;
		return (
			// const commentFormMarkup = authenticated ? (
			<div>
				<form onSubmit={this.handleSubmit}>
					<textarea
						name="body"
						type="text"
						label="Comment on scream"
						error={errors.comment ? true : false}
						helperText={errors.comment}
						// value={this.state.body}
						onChange={this.handleChange}

						// className={classes.textarea}
					/>
					<button type="submit">Submit</button>
				</form>
				{/* <hr className={classes.visibleSeparator} /> */}
			</div>
		);
		// ) : null;
		// return commentFormMarkup;
	}
}

export default CommentForm;
