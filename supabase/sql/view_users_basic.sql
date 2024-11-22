CREATE
OR REPLACE VIEW public.view_users_basic WITH (security_invoker = ON) AS
SELECT
    email,
    subscriber,
    private
FROM
    public.users
ORDER BY
    email;