export async function generatePasswordHash(): Promise<string> {
    let password = '';
    const len = 8 + 93 * Math.random() >> 0;

    while (password.length < len) {
        password += String.fromCharCode(33 + 94 * Math.random() >> 0);
    }

    return await Bun.password.hash(password);
};

export async function replaceTablePasswords(table: string = 'users'): Promise<void> {
    const supabase = (await import('@supabase/supabase-js'))
        .createClient(
            Bun.env.SUPABASE_URL as string,
            Bun.env.SUPABASE_ANON_KEY as string,
        );

    const { data: payload } = await supabase.from(table).select();
    if (!payload) return;

    for (let i = 0; i < payload.length; i++) {
        payload[i].password = await generatePasswordHash();
    }

    await supabase.from(table).upsert(payload);
};
