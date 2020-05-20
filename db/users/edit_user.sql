UPDATE users
SET email = $2,
where user_id = $1;