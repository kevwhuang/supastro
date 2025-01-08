CREATE TABLE users_deleted (
    id BIGINT PRIMARY KEY,
    email TEXT,
    phone TEXT,
    subscriber BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
