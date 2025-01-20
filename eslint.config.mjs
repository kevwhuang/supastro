import { eslint } from '@aephonics/config';

const overrides = [
    {
        files: ['**/*.{ts,tsx,astro}'],
        languageOptions: {
            globals: {
                ZustandActions: true,
                ZustandState: true,
            },
        },
        rules: {},
    },
];

const ignores = [
    'dist/**',
    'supabase/types/database.d.ts',
];

eslint.push(...overrides);
eslint.forEach(e => (e.ignores = ignores));

export default eslint;
