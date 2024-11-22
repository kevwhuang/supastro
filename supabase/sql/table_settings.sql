DROP TABLE IF EXISTS public.settings CASCADE;

CREATE TABLE public.settings (
    id INT NOT NULL,
    theme public.theme NOT NULL DEFAULT 'light' :: theme,
    auto_renew BOOLEAN NOT NULL DEFAULT TRUE,
    notifications SMALLINT NOT NULL DEFAULT '255' :: SMALLINT,
    CONSTRAINT settings_pkey PRIMARY KEY (id),
    CONSTRAINT settings_id_fkey FOREIGN KEY (id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT notifications_range CHECK (
        notifications >= 0
        AND notifications <= 255
    )
) TABLESPACE pg_default;