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