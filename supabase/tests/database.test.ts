import { describe, expect, test } from 'bun:test';
import { createClient } from '@supabase/supabase-js';

import type { Database } from '../types/database';

const supabase = createClient<Database>(
    Bun.env.SUPABASE_URL!,
    Bun.env.SUPABASE_ANON_KEY!,
);

describe('Database', () => {
    test('Select 1', select1);
    test('Select 2', select2);
    test('Select 3', select3);
    test('Insert 1', insert1);
    test('Insert 2', insert2);
    test('Insert 3', insert3);
    test('Insert 4', insert4);
    test('Update 1', update1);
    test('Update 2', update2);
    test('Update 3', update3);
    test('Update 4', update4);
    test('Delete 1', delete1);
    test('Delete 2', delete2);
    test('RPC', rpc);
});

async function select1(): Promise<void> {
    let query = 'registered:created_at,email,phone,currency';
    query += ',settings!inner(notifications),profiles!inner(*)';

    const { count, data, status } = await supabase
        .from('users')
        .select(query, { count: 'exact' })
        .eq('settings.theme', 'dark')
        .neq('profiles.gender', 'nonbinary')
        .is('subscriber', true)
        .not('profiles.country', 'in', '(US)')
        .lt('currency', 9000)
        .lte('profiles.birth_year', 2020)
        .gt('settings.notifications', 1)
        .gte('profiles.birth_year', 1950)
        .match({ 'private': false, 'settings.auto_renew': false })
        .or('email.like.%com,email.ilike.%ORG')
        .order('phone', { nullsFirst: true })
        .order('currency', { ascending: false })
        .limit(10);

    expect(data!.length).toBeGreaterThanOrEqual(10);
    expect(count).toBeGreaterThanOrEqual(12);
    expect(status).toStrictEqual(206);
}

async function select2(): Promise<void> {
    const { count, data, status } = await supabase
        .from('users')
        .select('', { count: 'exact' })
        .csv();

    expect(typeof data).toStrictEqual('string');
    expect(count).toStrictEqual(1000);
    expect(status).toStrictEqual(200);
}

async function select3(): Promise<void> {
    const { error, status } = await supabase
        .schema('public')
        .from('users')
        .select()
        .range(0, 9)
        .single();

    expect(error).toBeDefined();
    expect(status).toStrictEqual(406);
}

async function insert1(): Promise<void> {
    const { count, status } = await supabase
        .from('test')
        .insert({}, { count: 'exact' })
        .select();

    expect(count).toStrictEqual(1);
    expect(status).toStrictEqual(201);
}

async function insert2(): Promise<void> {
    const { count, status } = await supabase
        .from('test')
        .insert({ text: '' }, { count: 'exact' })
        .select();

    expect(count).toStrictEqual(1);
    expect(status).toStrictEqual(201);
}

async function insert3(): Promise<void> {
    const { count, status } = await supabase
        .from('test')
        .insert({ text: 'abcdefghij' }, { count: 'exact' })
        .select();

    expect(count).toStrictEqual(1);
    expect(status).toStrictEqual(201);
}

async function insert4(): Promise<void> {
    const { error, status } = await supabase
        .from('test')
        .insert({ text: 'abcdefghijk' }, { count: 'exact' })
        .select();

    expect(error).toBeDefined();
    expect(status).toStrictEqual(400);
}

async function update1(): Promise<void> {
    const { count, status } = await supabase
        .from('test')
        .update({ text: 'abc' }, { count: 'exact' })
        .is('text', null)
        .select();

    expect(count).toStrictEqual(1);
    expect(status).toStrictEqual(200);
}

async function update2(): Promise<void> {
    const { count, status } = await supabase
        .from('test')
        .update({ text: 'abc' }, { count: 'exact' })
        .eq('text', '')
        .select();

    expect(count).toStrictEqual(1);
    expect(status).toStrictEqual(200);
}

async function update3(): Promise<void> {
    const { count, status } = await supabase
        .from('test')
        .update({ text: 'abc' }, { count: 'exact' })
        .eq('text', 'abcdefghij')
        .select();

    expect(count).toStrictEqual(1);
    expect(status).toStrictEqual(200);
}

async function update4(): Promise<void> {
    const { error, status } = await supabase
        .from('test')
        .update({ text: 'abcdefghijk' });

    expect(error).toBeDefined();
    expect(status).toStrictEqual(400);
}

async function delete1(): Promise<void> {
    const { count, status } = await supabase
        .from('test')
        .delete({ count: 'exact' })
        .eq('text', 'abc')
        .select();

    expect(count).toStrictEqual(3);
    expect(status).toStrictEqual(200);
}

async function delete2(): Promise<void> {
    const { count, status } = await supabase
        .from('test')
        .delete({ count: 'exact' })
        .eq('text', '');

    expect(count).toStrictEqual(0);
    expect(status).toStrictEqual(204);
}

async function rpc(): Promise<void> {
    const { error, status } = await supabase
        .rpc('fn_query_stats');

    expect(error).toBeDefined();
    expect(status).toStrictEqual(204);
}
