CREATE FUNCTION fn_copy_deleted_user () RETURNS TRIGGER LANGUAGE plpgsql
SET
    search_path = 'public' AS $$ BEGIN
INSERT INTO
    users_deleted
VALUES
    (
        old.id,
        old.email,
        old.phone,
        old.subscriber,
        old.created_at
    );
RETURN NULL;
END $$;