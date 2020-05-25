CREATE TABLE IF NOT EXISTS posts (
  post_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id),
  image TEXT,
  review VARCHAR (500),
  title CHECK(LENGTH(title)<300),
  comment_id int references comments(comment_id)
);