INSERT INTO likes (post_id,user_id)
(
    SELECT $1, $2
        WHERE NOT EXISTS(
            SELECT 1 FROM likes
            WHERE post_id = $1 AND user_id = $2
        )
);
