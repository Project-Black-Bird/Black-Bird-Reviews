UPDATE users
SET email = $1
WHERE user_id = $2
returning user_id, name, email, image;