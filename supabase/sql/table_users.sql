DROP TABLE IF EXISTS public.users CASCADE;

CREATE TABLE public.users (
    id INT GENERATED ALWAYS AS IDENTITY NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NULL,
    PASSWORD TEXT NOT NULL DEFAULT '' :: TEXT,
    currency NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    subscriber BOOLEAN NOT NULL DEFAULT FALSE,
    private BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email),
    CONSTRAINT users_phone_key UNIQUE (phone),
    CONSTRAINT email_format CHECK (
        email ~ '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$' :: TEXT
    ),
    CONSTRAINT email_length CHECK (LENGTH(email) <= 100),
    CONSTRAINT phone_format CHECK (phone ~ '^\d{3}-\d{3}-\d{4}$' :: TEXT)
) TABLESPACE pg_default;

ALTER SEQUENCE public.users_id_seq RESTART WITH 1;