CREATE TABLE stats (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    users INT,
    phones INT,
    bank BIGINT,
    subscribers INT,
    years INT,
    queried_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
