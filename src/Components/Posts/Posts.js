import React from 'react';
import { connect } from 'react-redux';
import Post from '../Post/Post';
import './Posts.css';
import posts from './POSTS_MOCK.json';
import {getPosts} from '../../redux/reducer';
import CreatePost from '../Post/CreatePost/CreatePost';
import axios from 'axios';
class Posts extends React.Component {
	state = {
		posts: this.props.posts || [],
		search: '',
	};
	constructor(props) {
		super(props);
		this.updatePost = this.updatePost.bind(this);
	}


	getAllPosts() {
		//this.setState({ posts: posts });
		axios.get('/api/posts/')
		.then(res =>{
			this.props.getPosts(res.data);
		})
		.catch(err => console.log(err));
	}
	updatePost(post_id, title, image, review) {
		// this could be something like optimistic update
		axios.put(`/api/posts/${post_id}`,{post_id, title, image, review})
		.then(res =>{
			this.getAllPosts();
		})
		.catch(err => console.log(err));
	}
	renderPosts() {
		return this.props.posts.map(post => {
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
					likes={post.likes || 0}
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
	let { user, posts } = state;
	return { user, posts };
}
const mapDispatchToProps = {getPosts};
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
