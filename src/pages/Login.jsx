import React, { useState } from 'react';
import { supabase } from '@/api/base44Client';

const nextUrl = () => {
  const n = new URLSearchParams(window.location.search).get('next');
  return n && n.startsWith(window.location.origin) ? n : '/';
};

export default function Login() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setMsg(null);
    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) { throw error; }
        window.location.href = nextUrl();
      } else if (mode === 'register') {
        const { data, error } = await supabase.auth.signUp({
          email, password,
          options: { data: { full_name: name }, emailRedirectTo: window.location.origin + '/' },
        });
        if (error) { throw error; }
        if (data.session) { window.location.href = nextUrl(); }
        else { setMsg({ ok: true, text: 'Llogaria u krijua. Hap email-in dhe kliko lidhjen e konfirmimit.' }); }
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + '/login?mode=reset' });
        if (error) { throw error; }
        setMsg({ ok: true, text: 'Të dërguam një email për ndryshimin e fjalëkalimit.' });
      }
    } catch (err) {
      const t = String(err.message || err);
      setMsg({ ok: false, text: /Invalid login/i.test(t) ? 'Email-i ose fjalëkalimi është i gabuar.' : t });
    } finally {
      setBusy(false);
    }
  };

  const title = { login: 'Hyr në Elif', register: 'Krijo llogari', reset: 'Rikthe fjalëkalimin' }[mode];

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <form onSubmit={submit} className="w-full max-w-sm bg-white rounded-3xl shadow-xl border border-slate-100 p-7 space-y-4">
        <div className="text-center">
          <img src="/elif-icon-192.png" alt="Elif" className="w-16 h-16 mx-auto rounded-2xl mb-3" />
          <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
          <p className="text-sm text-slate-500 mt-1">Ruaj progresin, pikët dhe grupet e tua.</p>
        </div>
        {mode === 'register' && (
          <input className="w-full border rounded-xl px-4 py-3" placeholder="Emri" value={name} onChange={(e) => setName(e.target.value)} required />
        )}
        <input className="w-full border rounded-xl px-4 py-3" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        {mode !== 'reset' && (
          <input className="w-full border rounded-xl px-4 py-3" type="password" placeholder="Fjalëkalimi" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} required />
        )}
        {msg && <p className={'text-sm rounded-xl px-3 py-2 ' + (msg.ok ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700')}>{msg.text}</p>}
        <button disabled={busy} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl py-3 disabled:opacity-60">
          {busy ? '…' : { login: 'Hyr', register: 'Regjistrohu', reset: 'Dërgo lidhjen' }[mode]}
        </button>
        <div className="text-sm text-center text-slate-600 space-y-1">
          {mode !== 'login' && <button type="button" className="underline" onClick={() => setMode('login')}>Ke llogari? Hyr</button>}
          {mode !== 'register' && <div><button type="button" className="underline" onClick={() => setMode('register')}>S'ke llogari? Regjistrohu</button></div>}
          {mode === 'login' && <div><button type="button" className="underline" onClick={() => setMode('reset')}>Harrove fjalëkalimin?</button></div>}
          <div><a href="/" className="text-slate-400">← Kthehu te Elif</a></div>
        </div>
      </form>
    </div>
  );
}
