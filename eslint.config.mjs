import { eslint } from '@aephonics/config';

const globals = [
    '',
];

const overrides = [
    {
        files: ['supabase/tests/database.test.ts'],
        rules: { '@stylistic/quote-props': 0 },
    },
];

eslint[0].ignores.push('supabase/types/database.d.ts');
globals.forEach(e => (eslint[0].languageOptions.globals[e] = true));
overrides.forEach(e => eslint.push(e));

export default eslint;
