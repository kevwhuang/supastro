CREATE TRIGGER trg_copy_deleted_user
AFTER
    DELETE ON users FOR EACH ROW EXECUTE FUNCTION fn_copy_deleted_user();
    