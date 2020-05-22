import React from 'react';
import { connect } from 'react-redux';
import Post from '../Post/Post';
import './Posts.css';
import posts from './POSTS_MOCK.json';
import CreatePost from '../Post/CreatePost/CreatePost';
class Posts extends React.Component {
	state = {
		posts: [],
		search: '',
	};
	constructor(props) {
		super(props);
		this.updatePost = this.updatePost.bind(this);
	}
	getAllPosts() {
		this.setState({ posts: posts });
	}
	updatePost(post_id, title, image, review) {
		// this could be something like optimistic update
		this.setState({
			...this.state,
			posts: this.state.posts.map(post => {
				if (post.post_id == post_id) {
					console.log('found post, updating...');
					post.title = title;
					post.image = image;
					post.review = review;
				}
				return post;
			}),
		});
	}
	renderPosts() {
		return this.state.posts.map(post => {
			const { search } = this.state;
			let user = { ...(this.props.user || {}) };
			user = user || {};
			// user.id = user.id || 0;
			// user.email = user.email || "blackbirdreviews@yahoo.com";

			if (
				search !== '' &&
				post.title.toLowerCase().indexOf(search.toLowerCase()) === -1
			) {
				return null;
			}

			return (
				<Post
					post_id={post.post_id}
					image={post.image}
					title={post.title}
					review={post.review}
					likes={post.likes}
					user={this.props.user}
					updatePost={this.updatePost}
				/>
			);
		});
	}
	componentDidMount() {
		this.getAllPosts();
	}

	onchange = e => {
		this.setState({ search: e.target.value });
	};

	render() {
		return (
			<div className="Posts-container">
				<CreatePost />
				<input
					className="search-input"
					placeholder="Search Title"
					onChange={this.onchange}
				/>
				<div className="posts">{this.renderPosts()}</div>
			</div>
		);
	}
}
function mapStateToProps(state) {
	let { user } = state;
	return { user };
}
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
