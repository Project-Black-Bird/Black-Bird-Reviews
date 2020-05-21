UPDATE users
SET email = $1,
    image = $2
WHERE user_id = $3
returning user_id, name, email, image;