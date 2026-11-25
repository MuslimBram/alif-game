// Zëvendësim i Base44 me Supabase (falas).
// Ruhet e njëjta ndërfaqe: base44.entities.X.list/filter/create/update/delete,
// base44.auth.*, base44.integrations.Core.*, base44.functions.invoke
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});

// Entitete që i përkasin vetëm përdoruesit që i krijon
const PRIVATE_ENTITIES = new Set(['UserProgress']);

const authError = (message = 'Authentication required') => {
  const e = new Error(message);
  e.status = 401;
  return e;
};

async function currentUser() {
  const { data } = await supabase.auth.getSession();
  return data.session ? data.session.user : null;
}

function toRecord(row) {
  return {
    ...(row.data || {}),
    id: row.id,
    created_date: row.created_date,
    updated_date: row.updated_date,
    created_by: row.created_by_email || null,
  };
}

function sortRecords(rows, sort) {
  if (!sort) { return rows; }
  const desc = sort.startsWith('-');
  const key = desc ? sort.slice(1) : sort;
  const val = (r) => r[key];
  return [...rows].sort((a, b) => {
    const x = val(a), y = val(b);
    if (x === y) { return 0; }
    if (x === undefined || x === null) { return 1; }
    if (y === undefined || y === null) { return -1; }
    const r = (typeof x === 'number' && typeof y === 'number') ? x - y : String(x).localeCompare(String(y), undefined, { numeric: true });
    return desc ? -r : r;
  });
}

async function fetchAll(entity, query) {
  const rows = [];
  const pageSize = 1000;
  let from = 0;
  const me = PRIVATE_ENTITIES.has(entity) ? await currentUser() : null;
  if (PRIVATE_ENTITIES.has(entity) && !me) { return []; }
  for (;;) {
    let q = supabase.from('records').select('*').eq('entity', entity).range(from, from + pageSize - 1);
    if (query && Object.keys(query).length) { q = q.contains('data', query); }
    if (me) { q = q.eq('created_by', me.id); }
    const { data, error } = await q;
    if (error) { throw error; }
    rows.push(...data);
    if (data.length < pageSize) { break; }
    from += pageSize;
  }
  return rows.map(toRecord);
}

function stripMeta(obj) {
  const { id, created_date, updated_date, created_by, ...rest } = obj || {};
  return rest;
}

function makeEntity(entity) {
  return {
    async list(sort, limit) {
      const rows = sortRecords(await fetchAll(entity), sort);
      return limit ? rows.slice(0, limit) : rows;
    },
    async filter(query, sort, limit) {
      const rows = sortRecords(await fetchAll(entity, query || {}), sort);
      return limit ? rows.slice(0, limit) : rows;
    },
    async get(id) {
      const { data, error } = await supabase.from('records').select('*').eq('id', id).single();
      if (error) { throw error; }
      return toRecord(data);
    },
    async create(values) {
      const me = await currentUser();
      if (!me) { throw authError(); }
      const { data, error } = await supabase.from('records').insert({
        entity, data: stripMeta(values), created_by: me.id, created_by_email: me.email,
      }).select('*').single();
      if (error) { throw error; }
      return toRecord(data);
    },
    async bulkCreate(list) {
      const out = [];
      for (const v of list) { out.push(await this.create(v)); }
      return out;
    },
    async update(id, values) {
      const { data: cur, error: e1 } = await supabase.from('records').select('data').eq('id', id).single();
      if (e1) { throw e1; }
      const { data, error } = await supabase.from('records')
        .update({ data: { ...(cur.data || {}), ...stripMeta(values) } }).eq('id', id).select('*').single();
      if (error) { throw error; }
      return toRecord(data);
    },
    async delete(id) {
      const { error } = await supabase.from('records').delete().eq('id', id);
      if (error) { throw error; }
      return { id };
    },
  };
}

const entities = new Proxy({}, { get: (cache, name) => (cache[name] ||= makeEntity(String(name))) });

async function loadProfile(user) {
  const { data } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
  const p = data || { email: user.email, full_name: user.user_metadata?.full_name, role: 'user', data: {} };
  return {
    ...(p.data || {}),
    id: user.id,
    email: user.email,
    full_name: p.full_name || user.user_metadata?.full_name || user.email.split('@')[0],
    role: p.role || 'user',
    created_date: p.created_date,
  };
}

const auth = {
  async me() {
    const user = await currentUser();
    if (!user) { throw authError(); }
    return loadProfile(user);
  },
  async isAuthenticated() {
    return !!(await currentUser());
  },
  async updateMe(values) {
    const user = await currentUser();
    if (!user) { throw authError(); }
    const { data: cur } = await supabase.from('profiles').select('data').eq('id', user.id).maybeSingle();
    const { full_name, role, email, id, ...rest } = values || {};
    const patch = { data: { ...((cur && cur.data) || {}), ...rest } };
    if (full_name) { patch.full_name = full_name; }
    const { error } = await supabase.from('profiles').update(patch).eq('id', user.id);
    if (error) { throw error; }
    return loadProfile(user);
  },
  redirectToLogin(next) {
    const target = next || window.location.href;
    window.location.href = '/login?next=' + encodeURIComponent(target);
  },
  async logout(redirectUrl) {
    await supabase.auth.signOut();
    if (redirectUrl) { window.location.href = redirectUrl; } else { window.location.reload(); }
  },
};

const notAvailable = (what) => {
  const e = new Error(what + ' nuk është aktiv ende në këtë version.');
  e.status = 503;
  return Promise.reject(e);
};

const integrations = {
  Core: {
    async UploadFile({ file }) {
      const user = await currentUser();
      if (!user) { throw authError(); }
      const safe = (file.name || 'file').replace(/[^a-zA-Z0-9._-]/g, '_');
      const path = `${user.id}/${Date.now()}-${safe}`;
      const { error } = await supabase.storage.from('uploads').upload(path, file, { upsert: false });
      if (error) { throw error; }
      const { data } = supabase.storage.from('uploads').getPublicUrl(path);
      return { file_url: data.publicUrl };
    },
    InvokeLLM() { return notAvailable('Asistenti AI'); },
    GenerateImage() { return notAvailable('Gjenerimi i imazheve me AI'); },
    SendEmail() { return notAvailable('Dërgimi i email-eve'); },
  },
};

const functions = {
  invoke(name) { return notAvailable('Funksioni "' + name + '"'); },
};

export const base44 = { entities, auth, integrations, functions, supabase };
export default base44;
