import React from 'react';
import { connect } from 'react-redux';
import Post from '../Post/Post';
import './Posts.css';
import posts from './POSTS_MOCK.json';
import { getPosts } from '../../redux/reducer';
import CreatePost from '../Post/CreatePost/CreatePost';
import axios from 'axios';
class Posts extends React.Component {
	state = {
		posts: this.props.posts || [],
		search: '',
		showReviewForm: false,
	};
	constructor(props) {
		super(props);
		this.updatePost = this.updatePost.bind(this);
<<<<<<< HEAD
		this.toggleReviewForm = this.toggleReviewForm.bind(this);
=======
		this.getAllPosts = this.getAllPosts.bind(this);
		this.deletePost = this.deletePost.bind(this);
>>>>>>> master
	}

	getAllPosts() {
		//this.setState({ posts: posts });
		axios
			.get('/api/posts/')
			.then(res => {
				this.props.getPosts(res.data);
			})
			.catch(err => console.log(err));
	}
	updatePost(post_id, title, image, review) {
		// this could be something like optimistic update
		axios
			.put(`/api/posts/${post_id}`, { post_id, title, image, review })
			.then(res => {
				this.getAllPosts();
			})
			.catch(err => console.log(err));
	}

	deletePost(post_id){
		axios.delete(`/api/post/${post_id}`)
		.then( () =>{
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
					user_id={post.user_id}
					username={post.name}
					updatePost={this.updatePost}
					deletePost={this.deletePost}
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

	toggleReviewForm() {
		this.setState({
			...this.state,
			showReviewForm: !this.state.showReviewForm,
		});
	}

	render() {
		return (
			<div className="Posts-container">
				<div>
					{this.props.user.user_id && this.props.user.email ? (
						<CreatePost />
					) : null}
					{this.props.user.user_id && this.props.user.email ? (
						<button onClick={this.toggleReviewForm}>Create a Review</button>
					) : null}

					<div>
						<div className="container-input">
							<button type="submit" class="search-button">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="26"
									height="26"
									viewBox="0 0 20 20"
									className="search-icon"
								>
									<path d="M15.59,13.91l2.78,2.69a1.25,1.25,0,1,1-1.74,1.8l-2.82-2.73a8,8,0,1,1,1.78-1.76ZM14.64,9.2A5.45,5.45,0,1,0,9.2,14.64,5.45,5.45,0,0,0,14.64,9.2Z" />
								</svg>
							</button>
							<input
								type="text"
								className="search-input"
								placeholder="Search Title ..."
								onChange={this.onchange}
							/>
						</div>
					</div>
				</div>

				<div className="posts">{this.renderPosts()}</div>
			</div>
		);
	}
}
function mapStateToProps(state) {
	let { user, posts } = state;
	return { user, posts };
}
const mapDispatchToProps = { getPosts };
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
