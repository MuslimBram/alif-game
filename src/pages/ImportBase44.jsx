import React, { useEffect, useState } from 'react';
import { base44, supabase } from '@/api/base44Client';

// Import një-herësh i të dhënave të eksportuara nga Base44 (vetëm për adminët).
// Skedari JSON ndodhet përkohësisht në server dhe fshihet pas importit.
const DATA_URL = '/b44-import-7e0de6c3.json';
const ORDER = ['AlphabetLetter', 'TajweedRule', 'Word', 'CustomGame', 'Opinion', 'Group', 'Challenge', 'UserScore', 'UserProgress', 'UserMedineProgress'];
const CHUNK = 500;

export default function ImportBase44() {
  const [me, setMe] = useState(null);
  const [log, setLog] = useState([]);
  const [busy, setBusy] = useState(false);
  const add = (t) => setLog((l) => [...l, t]);

  useEffect(() => { base44.auth.me().then(setMe).catch(() => setMe(false)); }, []);

  const run = async () => {
    setBusy(true); setLog([]);
    try {
      const res = await fetch(DATA_URL, { cache: 'no-store' });
      if (!res.ok) throw new Error('Skedari i të dhënave nuk u gjet (' + res.status + ').');
      const all = await res.json();
      const { data: { user } } = await supabase.auth.getUser();
      const groupMap = {};
      for (const entity of ORDER) {
        const rows = all[entity] || [];
        if (!rows.length) { add(`${entity}: bosh, kalohet.`); continue; }
        // Shtohen vetëm rreshtat që nuk janë importuar më parë (sipas base44_id).
        const existing = new Set();
        for (let from = 0; ; from += 1000) {
          const { data: ex, error: exErr } = await supabase.from('records').select('data->>base44_id').eq('entity', entity).range(from, from + 999);
          if (exErr) throw exErr;
          ex.forEach((x) => { const v = x.base44_id; if (v) existing.add(v); });
          if (ex.length < 1000) break;
        }
        const todo = rows.filter((r) => !existing.has(r.data.base44_id));
        if (!todo.length) { add(`${entity}: të gjitha ${rows.length} janë tashmë në databazë.`); continue; }
        let done = 0;
        for (let i = 0; i < todo.length; i += CHUNK) {
          const batch = todo.slice(i, i + CHUNK).map((r) => {
            const data = { ...r.data };
            if (entity === 'Challenge' && data.group_id && groupMap[data.group_id]) data.group_id = groupMap[data.group_id];
            const row = { entity, data, created_by: user.id, created_by_email: user.email };
            if (r.created_date) row.created_date = r.created_date;
            if (r.updated_date) row.updated_date = r.updated_date;
            return row;
          });
          const { data: inserted, error } = await supabase.from('records').insert(batch).select('id, data');
          if (error) throw new Error(`${entity}: ${error.message}`);
          if (entity === 'Group') inserted.forEach((x) => { if (x.data?.base44_id) groupMap[x.data.base44_id] = x.id; });
          done += batch.length;
          add(`${entity}: ${done} / ${todo.length} të reja`);
        }
      }
      add('✅ Importi përfundoi.');
    } catch (e) {
      add('❌ ' + (e.message || String(e)));
    } finally {
      setBusy(false);
    }
  };

  if (me === null) return <p className="p-8 text-center">Duke kontrolluar llogarinë…</p>;
  if (!me || me.role !== 'admin') {
    return <p className="p-8 text-center">Kjo faqe është vetëm për adminët. <a className="underline" href="/login?next=/import-base44">Hyr</a></p>;
  }
  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Import nga Base44</h1>
      <p className="text-sm text-slate-600">Importon shkronjat, fjalët, rregullat e texhvidit, lojërat, opinionet, grupet dhe sfidat nga eksporti i Base44. Shtohen vetëm të dhënat që mungojnë; asgjë nuk dyfishohet.</p>
      <button disabled={busy} onClick={run} className="w-full bg-emerald-600 text-white rounded-xl py-3 font-semibold disabled:opacity-60">
        {busy ? 'Duke importuar…' : 'Fillo importin'}
      </button>
      <pre className="bg-slate-50 border rounded-xl p-3 text-xs whitespace-pre-wrap">{log.join('\n')}</pre>
    </div>
  );
}
