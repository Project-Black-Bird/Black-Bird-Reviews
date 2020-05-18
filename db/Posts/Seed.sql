CREATE TABLE IF NOT EXISTS posts (
  post_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id),
  image TEXT,
  review VARCHAR (500),
);