CREATE TABLE IF NOT EXISTS likes(
    like_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    post_id INT REFERENCES posts(post_id),
    liked INT
);