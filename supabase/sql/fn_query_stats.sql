CREATE FUNCTION fn_query_stats () RETURNS VOID LANGUAGE plpgsql
SET
    search_path = 'public' AS $$ BEGIN
INSERT INTO
    stats (users, phones, bank, subscribers, years)
SELECT
    COUNT(*),
    COUNT(phone),
    SUM(currency),
    COUNT(
        CASE
            WHEN subscriber THEN 1
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
    users;
END $$;