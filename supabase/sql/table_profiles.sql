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
