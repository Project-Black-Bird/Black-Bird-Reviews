import React from "react";
import PropTypes, { func } from "prop-types";
import { connect } from "react-redux";
function Post(props) {
  return (
    <div className="Post-container">
      {/* the alt attribute will need to be replaced later */}
      <img src={props.image} alt="a post image" />
      <span className="title">{props.title}</span>
      <span className="review">{props.review}</span>
      <div className="actions">
        {props.user.email && props.user.id ? (
          <div className="edit-delete">
            <button className="edit">Edit</button>
            <button className="delete">Delete</button>
          </div>
        ) : null}
        <button type="button" className="like">
          {`Like ${props.likes || 0}`}
        </button>
        <button type="button" className="share">
          Share
        </button>
      </div>
    </div>
  );
}
// Expected prop types
// help catch bugs by
// throwing errors
Post.propTypes = {
  image: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  const { user } = state;
  return { user };
}
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Post);
