DROP SCHEMA public CASCADE;

CREATE SCHEMA public;

CREATE TYPE enum_theme AS ENUM ('light', 'dark');

CREATE TYPE enum_gender AS ENUM ('male', 'female', 'nonbinary');

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL UNIQUE CHECK (
        LENGTH(email) <= 100
        AND email ~ '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
    ),
    phone TEXT UNIQUE CHECK (phone ~ '^\d{3}-\d{3}-\d{4}$'),
    password TEXT NOT NULL,
    currency NUMERIC(10, 2) DEFAULT 0,
    subscriber BOOLEAN DEFAULT FALSE,
    private BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE users_deleted (
    id BIGINT PRIMARY KEY,
    email TEXT,
    phone TEXT,
    subscriber BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE settings (
    id BIGINT PRIMARY KEY,
    theme enum_theme DEFAULT 'light',
    auto_renew BOOLEAN DEFAULT TRUE,
    notifications SMALLINT DEFAULT 255 CHECK (
        notifications BETWEEN 0
        AND 255
    ),
    CONSTRAINT settings_id_fkey FOREIGN KEY (id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE profiles (
    id BIGINT PRIMARY KEY,
    username TEXT NOT NULL UNIQUE CHECK (LENGTH(username) <= 100),
    first_name TEXT CHECK (LENGTH(first_name) <= 100),
    last_name TEXT CHECK (LENGTH(last_name) <= 100),
    gender enum_gender,
    birth_year SMALLINT CHECK (
        birth_year BETWEEN 1900
        AND EXTRACT(
            YEAR
            FROM
                NOW()
        )
    ),
    country TEXT CHECK (country ~ '^[A-Z]{2}$'),
    company TEXT CHECK (LENGTH(company) <= 100),
    title TEXT CHECK (LENGTH(title) <= 100),
    bio TEXT CHECK (LENGTH(bio) <= 1000),
    avatar TEXT CHECK (
        LENGTH(avatar) <= 500
        AND avatar ~ '^(https?://)[^\\s/$.?#].[^\\s]*'
    ),
    CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE stats (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    users INT,
    phones INT,
    bank BIGINT,
    subscribers INT,
    years INT,
    queried_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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

CREATE TRIGGER trg_copy_deleted_user
AFTER
    DELETE ON users FOR EACH ROW EXECUTE FUNCTION fn_copy_deleted_user();

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

SELECT
    fn_query_stats();