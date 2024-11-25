GRANT USAGE ON SCHEMA public TO anon,
authenticated,
service_role;

GRANT ALL ON ALL TABLES IN SCHEMA public TO anon,
authenticated,
service_role;

GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon,
authenticated,
service_role;

GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon,
authenticated,
service_role;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon,
authenticated,
service_role;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON ROUTINES TO anon,
authenticated,
service_role;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon,
authenticated,
service_role;

ALTER TABLE
    users ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    users_deleted ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    settings ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    profiles ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    stats ENABLE ROW LEVEL SECURITY;

ALTER VIEW view_users_basic
SET
    (security_invoker = ON);