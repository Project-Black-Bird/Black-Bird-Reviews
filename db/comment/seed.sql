CREATE TABLE comments(
  comment_id SERIAL PRIMARY KEY NOT NULL,
  user_id int references users(user_id),
  comment text CHECK (LENGTH(comment) <= 500 )
  -- likes_id
);