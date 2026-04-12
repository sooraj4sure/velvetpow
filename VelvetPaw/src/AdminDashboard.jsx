import { useState, useEffect } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Jost:wght@200;300;400;500&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap');

  :root {
    --gold: #c4a04a;
    --gold-dim: #8a6f30;
    --dark: #0e0d0b;
    --dark2: #1a1814;
    --dark3: #242018;
    --surface: #2a251e;
    --surface2: #332c22;
    --ivory: #f0e8d8;
    --ivory2: #d8ccb8;
    --text: #ede6d6;
    --text2: #b0a488;
    --text3: #786a50;
    --green: #4a9e6e;
    --red: #9e4a4a;
    --blue: #4a6e9e;
  }
  * { box-sizing:border-box; margin:0; padding:0; }
  body { background:var(--dark); color:var(--text); font-family:'Jost',sans-serif; font-weight:300; }

  /* LOGIN */
  .login-wrap {
    min-height:100vh; display:flex; align-items:center; justify-content:center;
    background:var(--dark);
  }
  .login-box {
    width:360px; background:var(--dark2); border:0.5px solid rgba(196,160,74,0.25);
    padding:48px 40px;
  }
  .login-logo { font-family:'Cormorant Garamond',serif; font-size:20px; color:var(--gold); letter-spacing:0.1em; margin-bottom:4px; }
  .login-sub { font-size:9px; letter-spacing:0.35em; text-transform:uppercase; color:var(--text3); margin-bottom:36px; }
  .login-label { font-size:9px; letter-spacing:0.3em; text-transform:uppercase; color:var(--text3); margin-bottom:8px; display:block; }
  .login-input {
    width:100%; background:var(--surface); border:0.5px solid rgba(196,160,74,0.2);
    color:var(--ivory); font-family:'Jost',sans-serif; font-size:13px;
    padding:12px 16px; outline:none; margin-bottom:16px; transition:border-color 0.3s;
  }
  .login-input:focus { border-color:var(--gold); }
  .login-btn {
    width:100%; background:var(--gold); color:var(--dark); border:none;
    font-family:'Jost',sans-serif; font-size:10px; letter-spacing:0.3em;
    text-transform:uppercase; padding:14px; cursor:pointer; font-weight:500;
    transition:background 0.3s; margin-top:8px;
  }
  .login-btn:hover { background:#e8d08a; }
  .login-error { font-size:11px; color:#e27070; margin-top:12px; text-align:center; }

  /* LAYOUT */
  .admin-wrap { display:flex; min-height:100vh; }

  /* SIDEBAR */
  .sidebar {
    width:220px; flex-shrink:0; background:var(--dark2);
    border-right:0.5px solid rgba(196,160,74,0.15);
    display:flex; flex-direction:column; position:fixed; top:0; left:0; bottom:0;
  }
  .sidebar-logo { padding:28px 24px 20px; border-bottom:0.5px solid rgba(196,160,74,0.1); }
  .sidebar-logo-name { font-family:'Cormorant Garamond',serif; font-size:18px; color:var(--gold); }
  .sidebar-logo-tag { font-size:8px; letter-spacing:0.3em; text-transform:uppercase; color:var(--text3); margin-top:2px; }
  .sidebar-nav { flex:1; padding:16px 0; }
  .nav-item {
    display:flex; align-items:center; gap:12px; padding:11px 24px;
    font-size:11px; letter-spacing:0.15em; text-transform:uppercase; color:var(--text3);
    cursor:pointer; transition:all 0.25s; border-left:2px solid transparent;
  }
  .nav-item:hover { color:var(--ivory2); background:rgba(196,160,74,0.04); }
  .nav-item.active { color:var(--gold); border-left-color:var(--gold); background:rgba(196,160,74,0.06); }
  .nav-icon { font-size:14px; width:16px; text-align:center; }
  .nav-badge {
    margin-left:auto; background:var(--gold); color:var(--dark);
    font-size:9px; font-weight:500; padding:2px 7px; border-radius:20px;
  }
  .sidebar-footer { padding:20px 24px; border-top:0.5px solid rgba(196,160,74,0.1); }
  .logout-btn {
    font-size:9px; letter-spacing:0.25em; text-transform:uppercase; color:var(--text3);
    background:none; border:none; cursor:pointer; transition:color 0.3s; font-family:'Jost',sans-serif;
  }
  .logout-btn:hover { color:var(--red); }

  /* MAIN */
  .main { margin-left:220px; flex:1; padding:40px 48px; min-height:100vh; }
  .page-header { margin-bottom:36px; }
  .page-eyebrow { font-size:9px; letter-spacing:0.4em; text-transform:uppercase; color:var(--gold); margin-bottom:8px; }
  .page-title { font-family:'Cormorant Garamond',serif; font-size:32px; color:var(--ivory); font-weight:300; }

  /* STATS ROW */
  .stats-row { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:40px; }
  .stat-card { background:var(--dark2); border:0.5px solid rgba(196,160,74,0.15); padding:24px; }
  .stat-label { font-size:9px; letter-spacing:0.3em; text-transform:uppercase; color:var(--text3); margin-bottom:12px; }
  .stat-num { font-family:'Cormorant Garamond',serif; font-size:40px; color:var(--ivory); font-weight:300; line-height:1; }
  .stat-sub { font-size:10px; color:var(--text3); margin-top:6px; }

  /* TABLE */
  .table-wrap { background:var(--dark2); border:0.5px solid rgba(196,160,74,0.15); overflow:hidden; }
  .table-toolbar {
    padding:18px 24px; border-bottom:0.5px solid rgba(196,160,74,0.1);
    display:flex; align-items:center; justify-content:space-between; gap:16px;
  }
  .toolbar-title { font-size:11px; letter-spacing:0.2em; text-transform:uppercase; color:var(--text2); }
  .search-input {
    background:var(--surface); border:0.5px solid rgba(196,160,74,0.2);
    color:var(--ivory); font-family:'Jost',sans-serif; font-size:12px;
    padding:8px 14px; outline:none; width:220px; transition:border-color 0.3s;
  }
  .search-input:focus { border-color:var(--gold); }
  .search-input::placeholder { color:var(--text3); }
  table { width:100%; border-collapse:collapse; }
  th {
    font-size:8px; letter-spacing:0.3em; text-transform:uppercase; color:var(--text3);
    padding:12px 20px; text-align:left; border-bottom:0.5px solid rgba(196,160,74,0.1);
    font-weight:400;
  }
  td { padding:14px 20px; font-size:12px; color:var(--text2); border-bottom:0.5px solid rgba(196,160,74,0.06); vertical-align:middle; }
  tr:hover td { background:rgba(196,160,74,0.02); }
  tr:last-child td { border-bottom:none; }
  .td-name { color:var(--ivory); font-size:13px; }
  .td-email { color:var(--text2); }
  .badge {
    display:inline-block; font-size:8px; letter-spacing:0.15em; text-transform:uppercase;
    padding:3px 10px; border-radius:20px;
  }
  .badge-gold { background:rgba(196,160,74,0.12); color:var(--gold); border:0.5px solid rgba(196,160,74,0.3); }
  .badge-green { background:rgba(74,158,110,0.12); color:var(--green); border:0.5px solid rgba(74,158,110,0.3); }
  .badge-blue { background:rgba(74,110,158,0.12); color:var(--blue); border:0.5px solid rgba(74,110,158,0.3); }

  /* VIEW MODAL */
  .overlay {
    position:fixed; inset:0; background:rgba(14,13,11,0.9); z-index:100;
    display:flex; align-items:center; justify-content:center; padding:24px;
  }
  .detail-modal {
    background:var(--dark2); border:0.5px solid rgba(196,160,74,0.25);
    max-width:620px; width:100%; max-height:88vh; overflow-y:auto;
  }
  .modal-head {
    padding:28px 32px 20px; border-bottom:0.5px solid rgba(196,160,74,0.15);
    display:flex; align-items:flex-start; justify-content:space-between; position:sticky; top:0; background:var(--dark2); z-index:2;
  }
  .modal-head-name { font-family:'Cormorant Garamond',serif; font-size:22px; color:var(--ivory); }
  .modal-head-email { font-size:11px; color:var(--text3); margin-top:3px; }
  .close-btn { background:none; border:none; color:var(--text3); font-size:20px; cursor:pointer; transition:color 0.3s; line-height:1; padding:0; }
  .close-btn:hover { color:var(--ivory); }
  .modal-body { padding:28px 32px; }
  .detail-section { margin-bottom:28px; }
  .detail-section-title { font-size:8px; letter-spacing:0.4em; text-transform:uppercase; color:var(--gold); margin-bottom:14px; padding-bottom:8px; border-bottom:0.5px solid rgba(196,160,74,0.1); }
  .detail-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  .detail-item { }
  .detail-key { font-size:9px; letter-spacing:0.2em; text-transform:uppercase; color:var(--text3); margin-bottom:4px; }
  .detail-val { font-size:13px; color:var(--ivory2); }

  /* MEDIA GRID */
  .media-section { margin-bottom:40px; }
  .media-section-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; }
  .media-section-title { font-size:11px; letter-spacing:0.2em; text-transform:uppercase; color:var(--text2); }
  .pending-count { font-size:10px; color:var(--gold); }
  .media-admin-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:16px; }
  .media-card { background:var(--dark2); border:0.5px solid rgba(196,160,74,0.15); overflow:hidden; transition:border-color 0.3s; }
  .media-card:hover { border-color:rgba(196,160,74,0.35); }
  .media-card.featured-card { border-color:rgba(196,160,74,0.5); }
  .media-img-wrap { position:relative; aspect-ratio:4/3; background:var(--surface); overflow:hidden; }
  .media-img-wrap img { width:100%; height:100%; object-fit:cover; display:block; }
  .media-featured-badge {
    position:absolute; top:10px; right:10px;
    background:var(--gold); color:var(--dark); font-size:8px; letter-spacing:0.2em;
    text-transform:uppercase; padding:3px 10px; font-weight:500;
  }
  .media-placeholder-icon { font-size:36px; color:rgba(196,160,74,0.2); }
  .media-card-body { padding:16px; }
  .media-pet-name { font-family:'Cormorant Garamond',serif; font-size:17px; color:var(--ivory); margin-bottom:2px; }
  .media-breed { font-size:10px; letter-spacing:0.15em; text-transform:uppercase; color:var(--text3); margin-bottom:8px; }
  .media-caption { font-size:11px; color:var(--text2); line-height:1.5; margin-bottom:14px; font-style:italic; }
  .media-files { font-size:10px; color:var(--text3); margin-bottom:12px; }
  .media-actions { display:flex; gap:8px; }
  .btn-approve {
    flex:1; background:rgba(74,158,110,0.15); border:0.5px solid rgba(74,158,110,0.4);
    color:var(--green); font-family:'Jost',sans-serif; font-size:9px; letter-spacing:0.2em;
    text-transform:uppercase; padding:9px; cursor:pointer; transition:all 0.25s;
  }
  .btn-approve:hover { background:rgba(74,158,110,0.25); }
  .btn-approve.active { background:rgba(74,158,110,0.3); }
  .btn-remove {
    flex:1; background:rgba(158,74,74,0.15); border:0.5px solid rgba(158,74,74,0.4);
    color:var(--red); font-family:'Jost',sans-serif; font-size:9px; letter-spacing:0.2em;
    text-transform:uppercase; padding:9px; cursor:pointer; transition:all 0.25s;
  }
  .btn-remove:hover { background:rgba(158,74,74,0.25); }
  .btn-view {
    background:transparent; border:0.5px solid rgba(196,160,74,0.25); color:var(--text2);
    font-family:'Jost',sans-serif; font-size:9px; letter-spacing:0.2em; text-transform:uppercase;
    padding:6px 14px; cursor:pointer; transition:all 0.25s; white-space:nowrap;
  }
  .btn-view:hover { border-color:var(--gold); color:var(--gold); }

  /* EMPTY STATE */
  .empty { text-align:center; padding:64px 24px; color:var(--text3); }
  .empty-icon { font-size:32px; color:rgba(196,160,74,0.15); margin-bottom:16px; }
  .empty-text { font-size:12px; letter-spacing:0.1em; }

  /* LOADING */
  .loading { text-align:center; padding:64px; color:var(--text3); font-size:11px; letter-spacing:0.2em; text-transform:uppercase; }

  /* FILTER TABS */
  .filter-tabs { display:flex; gap:4px; margin-bottom:24px; }
  .filter-tab {
    font-size:9px; letter-spacing:0.25em; text-transform:uppercase; padding:8px 18px;
    border:0.5px solid rgba(196,160,74,0.15); background:transparent; color:var(--text3);
    cursor:pointer; transition:all 0.25s; font-family:'Jost',sans-serif;
  }
  .filter-tab:hover { color:var(--ivory2); border-color:rgba(196,160,74,0.3); }
  .filter-tab.active { background:rgba(196,160,74,0.08); border-color:var(--gold); color:var(--gold); }

  @media (max-width:900px) {
    .sidebar { width:60px; }
    .nav-item span, .sidebar-logo-name, .sidebar-logo-tag, .nav-badge { display:none; }
    .main { margin-left:60px; padding:24px; }
    .stats-row { grid-template-columns:1fr 1fr; }
  }
`;

const API = 'http://localhost:5000';
const ADMIN_PASSWORD = 'velvetpaw2025'; // change this

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(date) {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });
}

function DetailRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="detail-item">
      <div className="detail-key">{label}</div>
      <div className="detail-val">{Array.isArray(value) ? value.join(', ') || '—' : value || '—'}</div>
    </div>
  );
}

// ─── Login ───────────────────────────────────────────────────────────────────

function Login({ onLogin }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const submit = () => {
    if (pw === ADMIN_PASSWORD) onLogin();
    else setErr('Incorrect password. Try again.');
  };
  return (
    <div className="login-wrap">
      <div className="login-box">
        <div className="login-logo">VelvetPaw</div>
        <div className="login-sub">Admin Portal</div>
        <label className="login-label">Admin Password</label>
        <input className="login-input" type="password" placeholder="Enter password"
          value={pw} onChange={e=>setPw(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&submit()} />
        <button className="login-btn" onClick={submit}>Enter Dashboard →</button>
        {err && <div className="login-error">{err}</div>}
      </div>
    </div>
  );
}

// ─── Submissions Tab ──────────────────────────────────────────────────────────

function SubmissionsTab({ submissions, loading }) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const filtered = submissions.filter(s => {
    const q = search.toLowerCase();
    const matchSearch = !q || s.contact?.name?.toLowerCase().includes(q) || s.contact?.email?.toLowerCase().includes(q) || s.contact?.city?.toLowerCase().includes(q);
    const matchFilter = filter === 'all' || (filter === 'early' && s.earlyAccess === 'yes') || (filter === s.petCategory?.toLowerCase());
    return matchSearch && matchFilter;
  });

  return (
    <>
      <div className="filter-tabs">
        {['all','early'].map(f => (
          <button key={f} className={`filter-tab ${filter===f?'active':''}`} onClick={()=>setFilter(f)}>
            {f === 'all' ? `All (${submissions.length})` : `Early Access (${submissions.filter(s=>s.earlyAccess==='yes').length})`}
          </button>
        ))}
      </div>

      <div className="table-wrap">
        <div className="table-toolbar">
          <div className="toolbar-title">Member Submissions</div>
          <input className="search-input" placeholder="Search by name, email, city…" value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
        {loading ? <div className="loading">Loading…</div> : filtered.length === 0 ? (
          <div className="empty"><div className="empty-icon">◈</div><div className="empty-text">No submissions yet</div></div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Pet Category</th>
                <th>Spending</th>
                <th>Early Access</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s._id}>
                  <td className="td-name">{s.contact?.name || '—'}</td>
                  <td className="td-email">{s.contact?.email || '—'}</td>
                  <td>{s.contact?.city || '—'}</td>
                  <td><span className="badge badge-gold">{s.petCategory || '—'}</span></td>
                  <td>{s.lifestyle?.spend || '—'}</td>
                  <td>
                    {s.earlyAccess === 'yes'
                      ? <span className="badge badge-green">Yes</span>
                      : <span className="badge badge-blue">Community</span>}
                  </td>
                  <td>{fmt(s.submittedAt)}</td>
                  <td><button className="btn-view" onClick={()=>setSelected(s)}>View →</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selected && (
        <div className="overlay" onClick={e=>e.target===e.currentTarget&&setSelected(null)}>
          <div className="detail-modal">
            <div className="modal-head">
              <div>
                <div className="modal-head-name">{selected.contact?.name}</div>
                <div className="modal-head-email">{selected.contact?.email} · {selected.contact?.phone}</div>
              </div>
              <button className="close-btn" onClick={()=>setSelected(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-section">
                <div className="detail-section-title">Contact Details</div>
                <div className="detail-grid">
                  <DetailRow label="Full Name" value={selected.contact?.name} />
                  <DetailRow label="Email" value={selected.contact?.email} />
                  <DetailRow label="Phone" value={selected.contact?.phone} />
                  <DetailRow label="City" value={selected.contact?.city} />
                  <DetailRow label="Multiple Pets" value={selected.contact?.multiple} />
                </div>
              </div>
              <div className="detail-section">
                <div className="detail-section-title">Lifestyle & Spending</div>
                <div className="detail-grid">
                  <DetailRow label="Vacation Arrangement" value={selected.lifestyle?.vacation} />
                  <DetailRow label="Food Approach" value={selected.lifestyle?.food} />
                  <DetailRow label="Monthly Spend" value={selected.lifestyle?.spend} />
                  <DetailRow label="Car Setup" value={selected.lifestyle?.car} />
                  <DetailRow label="Past Purchases" value={selected.lifestyle?.purchases} />
                </div>
              </div>
              <div className="detail-section">
                <div className="detail-section-title">Personality Answers</div>
                <div className="detail-grid">
                  <DetailRow label="Pet Phrase" value={selected.personality?.phrase} />
                  <DetailRow label="Doorbell Reaction" value={selected.personality?.doorbell} />
                  <DetailRow label="At Restaurant" value={selected.personality?.restaurant} />
                  <DetailRow label="Home Design Pain" value={selected.personality?.design} />
                  <DetailRow label="Splurge Mentality" value={selected.personality?.splurge} />
                </div>
              </div>
              <div className="detail-section">
                <div className="detail-section-title">Product Interest</div>
                <div className="detail-grid">
                  <DetailRow label="Off-Leash Worry" value={selected.products?.offleash} />
                  <DetailRow label="Guest Management" value={selected.products?.guests} />
                </div>
              </div>
              <div className="detail-section">
                <div className="detail-section-title">Classification</div>
                <div className="detail-grid">
                  <DetailRow label="Pet Category" value={selected.petCategory} />
                  <DetailRow label="Early Access" value={selected.earlyAccess} />
                  <DetailRow label="Submitted" value={fmt(selected.submittedAt)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Media Tab ────────────────────────────────────────────────────────────────

function MediaTab({ media, loading, onToggleFeature, onDelete }) {
  const [filter, setFilter] = useState('all');
  const pending = media.filter(m => !m.featured);
  const featured = media.filter(m => m.featured);
  const shown = filter === 'all' ? media : filter === 'pending' ? pending : featured;

  return (
    <>
      <div className="filter-tabs">
        <button className={`filter-tab ${filter==='all'?'active':''}`} onClick={()=>setFilter('all')}>All ({media.length})</button>
        <button className={`filter-tab ${filter==='pending'?'active':''}`} onClick={()=>setFilter('pending')}>Pending ({pending.length})</button>
        <button className={`filter-tab ${filter==='featured'?'active':''}`} onClick={()=>setFilter('featured')}>Live on Site ({featured.length})</button>
      </div>

      {loading ? <div className="loading">Loading…</div> : shown.length === 0 ? (
        <div className="empty"><div className="empty-icon">◈</div><div className="empty-text">No submissions in this category</div></div>
      ) : (
        <div className="media-admin-grid">
          {shown.map(m => (
            <div key={m._id} className={`media-card ${m.featured ? 'featured-card' : ''}`}>
              <div className="media-img-wrap">
                {m.files?.[0] ? (
                  <img src={`${API}/uploads/${m.files[0].split(/[\\/]/).pop()}`} alt={m.petName}
                    onError={e=>{ e.target.style.display='none'; }} />
                ) : (
                  <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <div className="media-placeholder-icon">◈</div>
                  </div>
                )}
                {m.featured && <div className="media-featured-badge">Live</div>}
              </div>
              <div className="media-card-body">
                <div className="media-pet-name">{m.petName || 'Unnamed'}</div>
                <div className="media-breed">{m.breed || 'Breed not specified'}</div>
                {m.caption && <div className="media-caption">"{m.caption}"</div>}
                <div className="media-files">{m.files?.length || 0} file{m.files?.length !== 1 ? 's' : ''} uploaded · {fmt(m.submittedAt)}</div>
                <div className="media-actions">
                  <button className={`btn-approve ${m.featured?'active':''}`} onClick={()=>onToggleFeature(m._id, m.featured)}>
                    {m.featured ? '✓ Featured' : '+ Feature'}
                  </button>
                  <button className="btn-remove" onClick={()=>onDelete(m._id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────

function OverviewTab({ submissions, media }) {
  const categories = {};
  submissions.forEach(s => { if(s.petCategory) categories[s.petCategory] = (categories[s.petCategory]||0)+1; });
  const topCats = Object.entries(categories).sort((a,b)=>b[1]-a[1]).slice(0,5);

  const spendMap = {};
  submissions.forEach(s => { const sp = s.lifestyle?.spend; if(sp) spendMap[sp] = (spendMap[sp]||0)+1; });

  const earlyCount = submissions.filter(s=>s.earlyAccess==='yes').length;

  return (
    <>
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label">Total Members</div>
          <div className="stat-num">{submissions.length}</div>
          <div className="stat-sub">questionnaire responses</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Early Access</div>
          <div className="stat-num">{earlyCount}</div>
          <div className="stat-sub">want collar collection</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pet Photos</div>
          <div className="stat-num">{media.length}</div>
          <div className="stat-sub">{media.filter(m=>m.featured).length} featured live</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pending Review</div>
          <div className="stat-num">{media.filter(m=>!m.featured).length}</div>
          <div className="stat-sub">media submissions</div>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24}}>
        <div className="table-wrap">
          <div className="table-toolbar"><div className="toolbar-title">Top Pet Categories</div></div>
          <table>
            <thead><tr><th>Category</th><th>Count</th><th>Share</th></tr></thead>
            <tbody>
              {topCats.map(([cat, count]) => (
                <tr key={cat}>
                  <td className="td-name">{cat}</td>
                  <td>{count}</td>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <div style={{flex:1,height:3,background:'var(--surface)'}}>
                        <div style={{width:`${Math.round(count/submissions.length*100)}%`,height:'100%',background:'var(--gold)'}} />
                      </div>
                      <span style={{fontSize:10,color:'var(--text3)',minWidth:28}}>{Math.round(count/submissions.length*100)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
              {topCats.length === 0 && <tr><td colSpan={3} style={{textAlign:'center',color:'var(--text3)',padding:32}}>No data yet</td></tr>}
            </tbody>
          </table>
        </div>

        <div className="table-wrap">
          <div className="table-toolbar"><div className="toolbar-title">Spending Distribution</div></div>
          <table>
            <thead><tr><th>Spend Range</th><th>Members</th><th>Share</th></tr></thead>
            <tbody>
              {Object.entries(spendMap).map(([range, count]) => (
                <tr key={range}>
                  <td className="td-name">{range}</td>
                  <td>{count}</td>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <div style={{flex:1,height:3,background:'var(--surface)'}}>
                        <div style={{width:`${Math.round(count/submissions.length*100)}%`,height:'100%',background:'var(--gold)'}} />
                      </div>
                      <span style={{fontSize:10,color:'var(--text3)',minWidth:28}}>{Math.round(count/submissions.length*100)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
              {Object.keys(spendMap).length === 0 && <tr><td colSpan={3} style={{textAlign:'center',color:'var(--text3)',padding:32}}>No data yet</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ─── Main Admin App ───────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState('overview');
  const [submissions, setSubmissions] = useState([]);
  const [media, setMedia] = useState([]);
  const [loadingSub, setLoadingSub] = useState(true);
  const [loadingMedia, setLoadingMedia] = useState(true);

  useEffect(() => {
    if (!authed) return;
    fetch(`${API}/api/submissions`).then(r=>r.json()).then(data=>{ setSubmissions(data); setLoadingSub(false); }).catch(()=>setLoadingSub(false));
    fetch(`${API}/api/featured`).then(r=>r.json()).then(data=>{ setMedia(data); setLoadingMedia(false); }).catch(()=>setLoadingMedia(false));
  }, [authed]);

  const toggleFeature = async (id, currentlyFeatured) => {
    await fetch(`${API}/api/featured/${id}/feature`, {
      method:'PATCH',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ featured: !currentlyFeatured })
    });
    setMedia(prev => prev.map(m => m._id === id ? { ...m, featured: !currentlyFeatured } : m));
  };

  const deleteMedia = async (id) => {
    if (!window.confirm('Remove this submission?')) return;
    await fetch(`${API}/api/featured/${id}`, { method:'DELETE' });
    setMedia(prev => prev.filter(m => m._id !== id));
  };

  if (!authed) return (
    <>
      <style>{css}</style>
      <Login onLogin={()=>setAuthed(true)} />
    </>
  );

  const navItems = [
    { id:'overview', icon:'◈', label:'Overview' },
    { id:'submissions', icon:'◇', label:'Submissions', badge: submissions.length },
    { id:'media', icon:'◉', label:'Media', badge: media.filter(m=>!m.featured).length || null },
  ];

  return (
    <>
      <style>{css}</style>
      <div className="admin-wrap">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="sidebar-logo-name">VelvetPaw</div>
            <div className="sidebar-logo-tag">Admin Portal</div>
          </div>
          <nav className="sidebar-nav">
            {navItems.map(n => (
              <div key={n.id} className={`nav-item ${tab===n.id?'active':''}`} onClick={()=>setTab(n.id)}>
                <span className="nav-icon">{n.icon}</span>
                <span>{n.label}</span>
                {n.badge ? <span className="nav-badge">{n.badge}</span> : null}
              </div>
            ))}
          </nav>
          <div className="sidebar-footer">
            <button className="logout-btn" onClick={()=>setAuthed(false)}>Sign Out →</button>
          </div>
        </aside>

        <main className="main">
          <div className="page-header">
            <div className="page-eyebrow">Admin Portal</div>
            <div className="page-title">
              {tab === 'overview' ? 'Dashboard Overview' : tab === 'submissions' ? 'Member Submissions' : 'Media Showcase'}
            </div>
          </div>

          {tab === 'overview' && <OverviewTab submissions={submissions} media={media} />}
          {tab === 'submissions' && <SubmissionsTab submissions={submissions} loading={loadingSub} />}
          {tab === 'media' && <MediaTab media={media} loading={loadingMedia} onToggleFeature={toggleFeature} onDelete={deleteMedia} />}
        </main>
      </div>
    </>
  );
}
