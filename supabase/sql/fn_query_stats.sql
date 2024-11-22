CREATE
OR REPLACE FUNCTION public.query_stats () RETURNS VOID LANGUAGE plpgsql
SET
    search_path = '' AS $$ BEGIN
INSERT INTO
    public.stats (users, phones, bank, subscribers, years)
SELECT
    COUNT(*),
    COUNT(phone),
    SUM(currency),
    SUM(
        CASE
            WHEN subscriber = TRUE THEN 1
            ELSE 0
        END
    ),
    SUM(
        EXTRACT(
            DAY
            FROM
                current_date - created_at
        )
    ) / 365
FROM
    public.users;
END;
$$;