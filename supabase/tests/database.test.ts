import { createClient } from '@supabase/supabase-js';
import { describe, expect, test } from 'bun:test';
import { type Database } from '../types/database';

const supabase = createClient<Database>(
    Bun.env.SUPABASE_URL as string,
    Bun.env.SUPABASE_ANON_KEY as string,
);

describe('Database', () => {
    test('Select 1', async () => {
        const query1 = 'registered:created_at,email,phone,currency';
        const query2 = ',settings!inner(notifications),profiles!inner(*)';

        const { data, count, status } = await supabase
            .from('users')
            .select(query1 + query2, { count: 'exact' })
            .eq('settings.theme', 'dark')
            .neq('profiles.gender', 'nonbinary')
            .is('subscriber', true)
            .not('profiles.country', 'in', '(US)')
            .lt('currency', 9000)
            .lte('profiles.birth_year', 2020)
            .gt('settings.notifications', 1)
            .gte('profiles.birth_year', 1950)
            .match({ private: false, 'settings.auto_renew': false })
            .or('email.like.%com,email.ilike.%ORG')
            .order('phone', { nullsFirst: true })
            .order('currency', { ascending: false })
            .limit(10);

        expect(data!.length).toBeGreaterThanOrEqual(10);
        expect(count).toBeGreaterThanOrEqual(12);
        expect(status).toStrictEqual(206);
    });

    test('Select 2', async () => {
        const { data, count, status } = await supabase
            .from('users')
            .select('', { count: 'exact' })
            .csv();

        expect(typeof data).toStrictEqual('string');
        expect(count).toStrictEqual(1000);
        expect(status).toStrictEqual(200);
    });

    test('Select 3', async () => {
        const { error, status } = await supabase
            .schema('public')
            .from('users')
            .select()
            .range(0, 9)
            .single();

        expect(error).toBeDefined();
        expect(status).toStrictEqual(406);
    });

    test('Insert 1', async () => {
        const { count, status } = await supabase
            .from('test')
            .insert({}, { count: 'exact' })
            .select();

        expect(count).toStrictEqual(1);
        expect(status).toStrictEqual(201);
    });

    test('Insert 2', async () => {
        const { count, status } = await supabase
            .from('test')
            .insert({ text: '' }, { count: 'exact' })
            .select();

        expect(count).toStrictEqual(1);
        expect(status).toStrictEqual(201);
    });

    test('Insert 3', async () => {
        const { count, status } = await supabase
            .from('test')
            .insert({ text: 'abcdefghij' }, { count: 'exact' })
            .select();

        expect(count).toStrictEqual(1);
        expect(status).toStrictEqual(201);
    });

    test('Insert 4', async () => {
        const { error, status } = await supabase
            .from('test')
            .insert({ text: 'abcdefghijk' }, { count: 'exact' })
            .select();

        expect(error).toBeDefined();
        expect(status).toStrictEqual(400);
    });

    test('Update 1', async () => {
        const { count, status } = await supabase
            .from('test')
            .update({ text: 'abc' }, { count: 'exact' })
            .is('text', null)
            .select();

        expect(count).toStrictEqual(1);
        expect(status).toStrictEqual(200);
    });

    test('Update 2', async () => {
        const { count, status } = await supabase
            .from('test')
            .update({ text: 'abc' }, { count: 'exact' })
            .eq('text', '')
            .select();

        expect(count).toStrictEqual(1);
        expect(status).toStrictEqual(200);
    });

    test('Update 3', async () => {
        const { count, status } = await supabase
            .from('test')
            .update({ text: 'abc' }, { count: 'exact' })
            .eq('text', 'abcdefghij')
            .select();

        expect(count).toStrictEqual(1);
        expect(status).toStrictEqual(200);
    });

    test('Update 4', async () => {
        const { error, status } = await supabase
            .from('test')
            .update({ text: 'abcdefghijk' });

        expect(error).toBeDefined();
        expect(status).toStrictEqual(400);
    });

    test('Delete 1', async () => {
        const { count, status } = await supabase
            .from('test')
            .delete({ count: 'exact' })
            .eq('text', 'abc')
            .select();

        expect(count).toStrictEqual(3);
        expect(status).toStrictEqual(200);
    });

    test('Delete 2', async () => {
        const { count, status } = await supabase
            .from('test')
            .delete({ count: 'exact' })
            .eq('text', '');

        expect(count).toStrictEqual(0);
        expect(status).toStrictEqual(204);
    });

    test('RPC', async () => {
        const { error, status } = await supabase
            .rpc('fn_query_stats');

        expect(error).toBeDefined();
        expect(status).toStrictEqual(204);
    });
});
