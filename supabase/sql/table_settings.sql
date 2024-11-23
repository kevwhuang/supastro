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