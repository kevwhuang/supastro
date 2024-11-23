CREATE VIEW view_users_basic AS
SELECT
    email,
    phone,
    currency,
    subscriber,
    private,
    created_at
FROM
    users
ORDER BY
    email;