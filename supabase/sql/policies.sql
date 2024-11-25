CREATE POLICY users_all ON users AS PERMISSIVE FOR ALL TO public USING (TRUE);

CREATE POLICY users_deleted_select ON users_deleted AS PERMISSIVE FOR
SELECT
    TO public USING (TRUE);

CREATE POLICY users_deleted_insert ON users_deleted AS PERMISSIVE FOR
INSERT
    TO public WITH CHECK (TRUE);

CREATE POLICY settings_select ON settings AS PERMISSIVE FOR
SELECT
    TO public USING (TRUE);

CREATE POLICY settings_insert ON settings AS PERMISSIVE FOR
INSERT
    TO public WITH CHECK (TRUE);

CREATE POLICY settings_update ON settings AS PERMISSIVE FOR
UPDATE
    TO public USING (TRUE);

CREATE POLICY profiles_select ON profiles AS PERMISSIVE FOR
SELECT
    TO public USING (TRUE);

CREATE POLICY profiles_insert ON profiles AS PERMISSIVE FOR
INSERT
    TO public WITH CHECK (TRUE);

CREATE POLICY profiles_update ON profiles AS PERMISSIVE FOR
UPDATE
    TO public USING (TRUE);

CREATE POLICY stats_select ON stats AS PERMISSIVE FOR
SELECT
    TO public USING (TRUE);

CREATE POLICY stats_insert ON stats AS PERMISSIVE FOR
INSERT
    TO public WITH CHECK (TRUE);

CREATE POLICY test_all ON test AS PERMISSIVE FOR ALL TO public USING (TRUE);