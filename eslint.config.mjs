import { eslint } from '@aephonics/config';

const ignores = [
    'supabase/types/database.d.ts',
];

const globals = [
    '',
];

const overrides = [
    {
        files: ['**/*.{js,jsx,mjs,ts,tsx}'],
        ignores: [...ignores],
        rules: {
            '@tslint/no-empty-object-type': 0,
            'no-undef': 0,
        },
    },
];

ignores.forEach(e => eslint[0].ignores.push(e));
globals.forEach(e => (eslint[0].languageOptions.globals[e] = true));
overrides.forEach(e => eslint.push(e));

export default eslint;
