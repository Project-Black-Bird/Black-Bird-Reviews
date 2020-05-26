INSERT INTO likes l(
    l.liked,
    l.user_id,
    l.post_id
)
VALUES($1, $2, $3);