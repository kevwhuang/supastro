DROP TABLE IF EXISTS public.stats CASCADE;

CREATE TABLE public.stats (
    id INT GENERATED ALWAYS AS IDENTITY NOT NULL,
    users INT NOT NULL,
    phones INT NOT NULL,
    bank BIGINT NOT NULL,
    subscribers INT NOT NULL,
    years INT NOT NULL,
    queried_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT stats_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;