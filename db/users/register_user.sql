INSERT INTO users(
    name,
    email,
    password,
    image
)
VALUES ($1, $2, $3, $4)
returning name, email, password, image;