/* Tamil Buddy — app logic. Content lives in data.js. */
'use strict';
(function () {
  const D = window.TB_DATA;
  const P = {};
  D.phrases.forEach(p => { P[p.id] = p; });
  const CAT = {};
  D.categories.forEach(c => { CAT[c.id] = c.name; });
  const CLOZE = {}; (D.clozes || []).forEach(c => { CLOZE[c.id] = c; });
  const DIAL = {}; (D.dialogues || []).forEach(d => { DIAL[d.id] = d; });
  const LESSONS = [];
  D.units.forEach((u, ui) => u.lessons.forEach((l, li) => LESSONS.push(Object.assign({}, l, { unit: u, ui, li }))));

  const KEY = 'tamilBuddy.progress';
  const DAY = 864e5;
  const INTERVALS = [0, 1, 3, 7, 14, 30]; // days per review box
  const REGION = { 'sri-lanka': 'Sri Lankan Tamil', jaffna: 'Jaffna / Northern', india: 'Indian Tamil', formal: 'Formal' };
  const $main = document.getElementById('main');
  const $ov = document.getElementById('overlay');

  /* ---------------- Saved progress ---------------- */
  function defaults() {
    return { v: 1, xp: 0, lessons: {}, learned: {}, srs: {}, fav: [], marked: [], recent: [], days: [],
      review: { right: 0, wrong: 0, sessions: 0 }, scores: [], ach: {} };
  }
  function sanitize(o) {
    const d = defaults();
    if (!o || typeof o !== 'object') return d;
    for (const k in d) {
      const a = o[k], b = d[k];
      if (a !== undefined && a !== null && typeof a === typeof b && Array.isArray(a) === Array.isArray(b)) d[k] = a;
    }
    if (!isFinite(d.xp) || d.xp < 0) d.xp = 0;
    ['fav', 'marked', 'recent'].forEach(k => { d[k] = d[k].filter(id => typeof id === 'string' && P[id]); });
    d.days = d.days.filter(x => typeof x === 'string');
    for (const id in d.srs) { const r = d.srs[id]; if (!r || typeof r !== 'object' || !isFinite(r.box) || !isFinite(r.due)) delete d.srs[id]; }
    d.review = Object.assign({ right: 0, wrong: 0, sessions: 0 }, d.review);
    return d;
  }
  function load() {
    let raw = null;
    try { raw = localStorage.getItem(KEY); } catch (e) { return defaults(); }
    if (!raw) return defaults();
    try { return sanitize(JSON.parse(raw)); }
    catch (e) { try { localStorage.setItem(KEY + '.broken-backup', raw); } catch (_) {} return defaults(); }
  }
  let S = load();
  let saveWarned = false;
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); }
    catch (e) { if (!saveWarned) { saveWarned = true; toast('Progress could not be saved on this device (storage blocked or full).'); } }
  }
  if (navigator.storage && navigator.storage.persist) { navigator.storage.persist().catch(() => {}); }

  /* ---------------- Helpers ---------------- */
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  const uniq = a => Array.from(new Set(a));
  function ds(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  const today = () => ds(new Date());
  function markDay() { const t = today(); if (!S.days.includes(t)) { S.days.push(t); S.days = S.days.slice(-400); } }
  function norm(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\u0B80-\u0BFF ]+/g, ' ').replace(/\s+/g, ' ').trim(); }
  function near(a, b) { // true if a and b differ by at most one letter
    if (Math.abs(a.length - b.length) > 1) return false;
    let i = 0, j = 0, e = 0;
    while (i < a.length && j < b.length) {
      if (a[i] === b[j]) { i++; j++; continue; }
      if (++e > 1) return false;
      if (a.length > b.length) i++; else if (b.length > a.length) j++; else { i++; j++; }
    }
    return e + (a.length - i) + (b.length - j) <= 1;
  }
  function loose(s) { return norm(s).replace(/h/g, '').replace(/w/g, 'v').replace(/([a-z])\1+/g, '$1'); }
  let toastTimer;
  function toast(msg) { const t = document.getElementById('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2800); }

  const ICON = {
    x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    speaker: '<svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 9v6h4l5 4V5L8 9zM17 9a4 4 0 0 1 0 6"/></svg>',
    mic: '<svg viewBox="0 0 24 24" aria-hidden="true" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>'
  };

  /* ---------------- Device voice (optional) ---------------- */
  let taVoice = null;
  function loadVoices() { try { taVoice = speechSynthesis.getVoices().find(v => /^ta([-_]|$)/i.test(v.lang)) || null; } catch (e) { taVoice = null; } }
  if ('speechSynthesis' in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
  function speak(id) {
    const p = P[id]; if (!taVoice || !p || !p.tamil) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(p.tamil.replace(/\.\.\./g, ' '));
    u.voice = taVoice; u.lang = taVoice.lang; u.rate = 0.8; speechSynthesis.speak(u);
  }
  const speakBtn = id => taVoice && P[id] && P[id].tamil ? `<button class="btn" data-a="speak" data-v="${esc(id)}">${ICON.speaker} Listen (device voice)</button>` : '';

  /* ---------------- Spaced repetition ---------------- */
  function srsUpdate(id, res) {
    if (!P[id]) return;
    const now = Date.now();
    const r = S.srs[id] || { box: 0, due: now, right: 0, wrong: 0 };
    if (res === 'good') { r.box = Math.min(r.box + 1, 5); r.right++; r.due = now + INTERVALS[r.box] * DAY; }
    else if (res === 'nearly') { r.box = Math.max(1, r.box - 1); r.due = now + DAY; }
    else { r.box = 0; r.wrong++; r.due = now; }
    r.last = now; S.srs[id] = r;
  }
  const isDifficult = id => { const r = S.srs[id]; return S.marked.includes(id) || (!!r && r.wrong > 0 && (r.box === 0 || r.wrong > r.right)); };
  const dueIds = () => { const now = Date.now(); return Object.keys(S.srs).filter(id => P[id] && S.srs[id].due <= now).sort((a, b) => S.srs[a].due - S.srs[b].due); };
  const difficultIds = () => uniq(S.marked.concat(Object.keys(S.srs).filter(id => P[id] && isDifficult(id))));
  const reviewQueue = () => uniq(difficultIds().filter(id => S.marked.includes(id) || (S.srs[id] && S.srs[id].due <= Date.now())).concat(dueIds()));

  /* ---------------- Progress numbers ---------------- */
  const learnedCount = () => Object.keys(S.learned).filter(id => P[id]).length;
  const lessonDone = id => !!(S.lessons[id] && S.lessons[id].done);
  const unitDone = u => u.lessons.every(l => lessonDone(l.id));
  const unitsDone = () => D.units.filter(unitDone).length;
  const lessonsDone = () => LESSONS.filter(l => lessonDone(l.id)).length;
  const nextLesson = () => LESSONS.find(l => !lessonDone(l.id)) || null;
  function streak() {
    const set = new Set(S.days); const d = new Date(); let n = 0;
    if (!set.has(ds(d))) { d.setDate(d.getDate() - 1); if (!set.has(ds(d))) return 0; }
    while (set.has(ds(d))) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  const ACH = [
    { id: 'first_lesson', name: 'First lesson', desc: 'Complete a lesson', test: () => lessonsDone() >= 1 },
    { id: 'ten', name: 'First 10 phrases', desc: 'Learn 10 phrases', test: () => learnedCount() >= 10 },
    { id: 'unit', name: 'First unit', desc: 'Finish a whole unit', test: () => unitsDone() >= 1 },
    { id: 'review', name: 'First review', desc: 'Complete a review session', test: () => S.review.sessions >= 1 },
    { id: 'fifty', name: '50 phrases', desc: 'Learn 50 phrases', test: () => learnedCount() >= 50 }
  ];
  function checkAch() { ACH.forEach(a => { if (!S.ach[a.id] && a.test()) { S.ach[a.id] = today(); setTimeout(() => toast('Achievement: ' + a.name), 400); } }); }

  /* ---------------- App state ---------------- */
  let view = 'learn';
  let L = null;            // active lesson / review session
  let overlay = null;      // {t:'phrase'|'big'|'guide', id}
  let lastFocus = null;
  let pQuery = '', pFilter = 'all';

  function render() {
    document.body.classList.toggle('in-lesson', !!L);
    document.querySelectorAll('#nav button').forEach(b => b.setAttribute('aria-current', b.dataset.v === view ? 'page' : 'false'));
    if (L) { renderLesson(); return; }
    if (view === 'phrases') { renderPhrases(); return; }
    $main.innerHTML = view === 'review' ? reviewView() : view === 'progress' ? progressView() : learnView();
  }

  /* ---------------- Learn ---------------- */
  function learnView() {
    const nx = nextLesson();
    const due = reviewQueue().length;
    const hero = nx
      ? `<section class="hero"><p class="kicker">Unit ${nx.ui + 1}: ${esc(nx.unit.title)}</p><h2>${esc(nx.title)}</h2>
         <button class="btn block" data-a="start" data-v="${nx.id}">${lessonsDone() ? 'Continue learning' : 'Start your first lesson'}</button></section>`
      : `<section class="hero"><p class="kicker">Course complete</p><h2>You've finished every lesson</h2>
         <button class="btn block" data-a="nav" data-v="review">Keep phrases fresh in Review</button></section>`;
    const quick = D.essential.filter(id => P[id]).map(id =>
      `<button data-a="open" data-v="${id}"><b>${esc(P[id].romanized)}</b><span>${esc(P[id].english)}</span></button>`).join('');
    const units = D.units.map((u, ui) => {
      const done = u.lessons.filter(l => lessonDone(l.id)).length;
      const items = u.lessons.map((l, li) => {
        const cls = lessonDone(l.id) ? 'done' : (nx && nx.id === l.id ? 'next' : '');
        const state = lessonDone(l.id) ? 'completed' : (cls === 'next' ? 'up next' : 'not started');
        return `<li><button class="lesson-btn ${cls}" data-a="start" data-v="${l.id}" aria-label="Lesson ${li + 1}: ${esc(l.title)}, ${state}">
          <span class="dot" aria-hidden="true">${lessonDone(l.id) ? '✓' : li + 1}</span>
          <span><span class="t">${esc(l.title)}</span><span class="s">${l.items.length} phrases${S.lessons[l.id] ? ' · best ' + S.lessons[l.id].best + '%' : ''}</span></span></button></li>`;
      }).join('');
      return `<section class="unit"><div class="unit-head"><h3>Unit ${ui + 1}: ${esc(u.title)}</h3><span class="muted small">${done}/${u.lessons.length}</span></div><ul class="lesson-list">${items}</ul></section>`;
    }).join('');
    return `<div class="top"><h1>Tamil Buddy</h1><div class="chips-stats"><span class="stat-chip" title="Experience points">${S.xp} XP</span><span class="stat-chip" title="Days in a row">${streak()} day${streak() === 1 ? '' : 's'}</span></div></div>
      ${hero}
      ${due ? `<button class="btn block" data-a="nav" data-v="review" style="margin:8px 0">${due} phrase${due === 1 ? '' : 's'} ready to review</button>` : ''}
      <h2>Quick phrases</h2><div class="quick">${quick}</div>
      <h2>Course</h2><p class="muted small">Every lesson is open — start anywhere. Spoken Sri Lankan Tamil, written in English letters.</p>${units}`;
  }

  /* ---------------- Phrasebook ---------------- */
  function renderPhrases() {
    const chips = [['all', 'All'], ['fav', '★ Favourites'], ['recent', 'Recent'], ['help', 'Help & emergencies']]
      .concat(D.categories.filter(c => c.id !== 'help').map(c => [c.id, c.name]));
    $main.innerHTML = `<h1>Phrases</h1>
      <div class="search-wrap"><label class="sr" for="psearch">Search phrases in Tamil or English</label>
      <input id="psearch" class="search" type="search" placeholder="Search: water, enga, thank you…" autocomplete="off" autocapitalize="off" spellcheck="false" value="${esc(pQuery)}">
      <div class="filters" role="group" aria-label="Filter phrases">${chips.map(([id, name]) =>
        `<button data-a="filter" data-v="${id}" class="${id === 'help' ? 'helpchip' : ''}" aria-pressed="${pFilter === id}">${esc(name)}</button>`).join('')}</div></div>
      <div id="plist" aria-live="polite"></div>
      <p class="muted small" style="margin-top:20px">Not sure how to say the letters? <button class="btn" data-a="guide" style="min-height:40px;padding:6px 12px">Sound guide</button></p>`;
    renderPhraseList();
  }
  function searchPhrases(q) {
    const tokens = norm(q).split(' ').filter(Boolean);
    if (!tokens.length) return D.phrases.slice();
    const res = [];
    D.phrases.forEach(p => {
      const rom = [p.romanized].concat(p.variants || []).join(' ');
      const hay = norm([rom, p.english, (p.categories || []).map(c => CAT[c]).join(' '), (p.tags || []).join(' ')].join(' '));
      const hayL = loose(hay);
      const words = hayL.split(' ');
      if (!tokens.every(t => hay.includes(t) || hayL.includes(loose(t)) || (t.length >= 4 && words.some(w => near(loose(t), w))))) return;
      let score = 0;
      const nr = norm(p.romanized), ne = norm(p.english), first = tokens[0];
      if (nr.startsWith(first) || ne.startsWith(first)) score += 3;
      if (nr.split(' ').includes(first) || ne.split(' ').includes(first)) score += 2;
      if (hay.includes(norm(q))) score += 1;
      res.push([score, p]);
    });
    return res.sort((a, b) => b[0] - a[0]).map(x => x[1]);
  }
  const pItem = p => `<li><button class="pitem" data-a="open" data-v="${p.id}"><span class="txt"><b>${esc(p.romanized)}</b><span>${esc(p.english)}</span></span>${S.fav.includes(p.id) ? '<span class="star" aria-label="Favourite">★</span>' : ''}</button></li>`;
  function renderPhraseList() {
    const box = document.getElementById('plist'); if (!box) return;
    let list = searchPhrases(pQuery);
    if (pFilter === 'fav') list = list.filter(p => S.fav.includes(p.id));
    else if (pFilter === 'recent') { const r = S.recent; list = list.filter(p => r.includes(p.id)); if (!pQuery) list.sort((a, b) => r.indexOf(a.id) - r.indexOf(b.id)); }
    else if (pFilter !== 'all') list = list.filter(p => (p.categories || []).includes(pFilter));
    if (!list.length) {
      const msg = pFilter === 'fav' && !pQuery ? 'No favourites yet. Open a phrase and tap “Favourite” to keep it here.'
        : pFilter === 'recent' && !pQuery ? 'Phrases you open will appear here.'
        : `No phrase matches “${esc(pQuery)}”. Try a shorter word or a different spelling.`;
      box.innerHTML = `<p class="empty">${msg}</p>`; return;
    }
    if (pFilter === 'all' && !pQuery.trim()) {
      const ess = D.essential.filter(id => P[id]).map(id => P[id]);
      let html = `<p class="group-title">Most useful</p><ul class="plist">${ess.map(pItem).join('')}</ul>`;
      D.categories.filter(c => c.id !== 'essential').forEach(c => {
        const items = D.phrases.filter(p => p.categories && p.categories[0] === c.id);
        if (items.length) html += `<p class="group-title">${esc(c.name)}</p><ul class="plist">${items.map(pItem).join('')}</ul>`;
      });
      box.innerHTML = html; return;
    }
    box.innerHTML = `<p class="muted small">${list.length} phrase${list.length === 1 ? '' : 's'}</p><ul class="plist">${list.map(pItem).join('')}</ul>`;
  }

  /* ---------------- Overlays: phrase detail, big view, sound guide ---------------- */
  function openOverlay(o) { if (!overlay) lastFocus = document.activeElement; overlay = o; renderOverlay(); }
  function closeOverlay() {
    overlay = null; $ov.hidden = true; $ov.innerHTML = ''; document.body.classList.remove('noscroll');
    if (view === 'phrases' && !L) renderPhraseList(); else if (!L) render();
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
  }
  function renderOverlay() {
    if (!overlay) return;
    $ov.hidden = false; document.body.classList.add('noscroll');
    if (overlay.t === 'big') {
      const p = P[overlay.id];
      $ov.innerHTML = `<div class="big" data-a="closeBig" role="dialog" aria-label="Large phrase view. Tap to close.">
        ${p.tamil ? `<div class="b-script" lang="ta">${esc(p.tamil)}</div>` : ''}<div class="b-rom">${esc(p.romanized)}</div><div class="b-en">${esc(p.english)}</div>
        <p class="muted small">Tap anywhere to close</p></div>`;
      $ov.querySelector('.big').focus && $ov.querySelector('.big').setAttribute('tabindex', '-1');
      $ov.querySelector('.big').focus(); return;
    }
    if (overlay.t === 'guide') {
      $ov.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-labelledby="gt"><div class="sheet-bar"><button class="icon-btn" data-a="close" aria-label="Close">${ICON.back}</button></div>
        <h1 id="gt">Sound guide</h1><p class="muted">Tamil is written here in English letters. These spellings stay the same everywhere in the app.</p>
        <table class="guide"><tbody>${D.soundGuide.map(r => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}<br><span class="muted small">e.g. ${esc(r[2])}</span></td></tr>`).join('')}</tbody></table>
        <p class="muted small" style="margin-top:14px">Pronunciation hints use English-style syllables, so treat them as close approximations. The best teacher is a local speaker — ask them to say a phrase and copy them.</p></div>`;
      $ov.querySelector('[data-a="close"]').focus(); return;
    }
    const p = P[overlay.id]; if (!p) { closeOverlay(); return; }
    const fav = S.fav.includes(p.id), mk = S.marked.includes(p.id);
    const related = uniq(D.phrases.filter(q => q.id !== p.id && ((p.group && q.group === p.group) || (q.categories || [])[0] === (p.categories || [])[0])).map(q => q.id)).slice(0, 4);
    $ov.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-labelledby="pt">
      <div class="sheet-bar"><button class="icon-btn" data-a="close" aria-label="Back">${ICON.back}</button><span class="muted small">${esc(CAT[(p.categories || [])[0]] || '')}</span><span style="width:44px"></span></div>
      <div class="tamil-rom-wrap"><h1 id="pt" class="tamil-rom" style="margin:0">${esc(p.romanized)}</h1></div>
      <p class="meaning">${esc(p.english)}</p>
      <div class="badges">${REGION[p.region] ? `<span class="badge">${REGION[p.region]}</span>` : ''}${p.check ? '<span class="badge warn">Needs a native check</span>' : ''}</div>
      ${p.pronunciation ? `<p class="say">Say it: <b>${esc(p.pronunciation)}</b></p>` : ''}
      <div class="actions">
        <button class="btn" data-a="fav" data-v="${p.id}" aria-pressed="${fav}">${fav ? '★ Favourite' : '☆ Favourite'}</button>
        <button class="btn" data-a="mark" data-v="${p.id}" aria-pressed="${mk}">${mk ? '✓ In review' : 'Mark for review'}</button>
        <button class="btn primary" data-a="big" data-v="${p.id}" style="grid-column:1/-1">Show to someone (large text)</button>
        ${speakBtn(p.id) ? `<div style="grid-column:1/-1">${speakBtn(p.id)}<p class="muted small" style="margin-top:4px">Computer voice — not a native Sri Lankan speaker.</p></div>` : ''}
      </div>
      ${p.context ? `<div class="detail-block"><h3>When to use it</h3><p>${esc(p.context)}</p></div>` : ''}
      ${p.variants && p.variants.length ? `<div class="detail-block"><h3>Also heard</h3><p>${p.variants.map(esc).join('<br>')}</p></div>` : ''}
      ${p.tamil ? `<div class="detail-block"><h3>Tamil script (optional)</h3><p class="script" lang="ta">${esc(p.tamil)}</p></div>` : ''}
      ${p.check ? `<div class="detail-block"><h3>Still to confirm</h3><p class="small">${esc(p.check)}</p></div>` : ''}
      ${related.length ? `<div class="detail-block"><h3>Related</h3><ul class="plist">${related.map(id => pItem(P[id])).join('')}</ul></div>` : ''}
    </div>`;
    $ov.scrollTop = 0;
    $ov.querySelector('[data-a="close"]').focus();
  }
  function openPhrase(id) {
    if (!P[id]) return;
    S.recent = [id].concat(S.recent.filter(x => x !== id)).slice(0, 20); save();
    openOverlay({ t: 'phrase', id });
  }

  /* ---------------- Lessons & review sessions ---------------- */
  function distractors(id, field, n) {
    const p = P[id], key = norm(p[field]);
    const pool = D.phrases.filter(q => q.id !== id && norm(q[field]) !== key && !(p.group && q.group === p.group));
    const cat = (p.categories || [])[0];
    const ordered = shuffle(pool.filter(q => (q.categories || [])[0] === cat)).concat(shuffle(pool.filter(q => (q.categories || [])[0] !== cat)));
    const out = [];
    for (const q of ordered) { if (out.length >= n) break; if (!out.some(o => norm(o[field]) === norm(q[field]))) out.push(q); }
    return out;
  }
  function buildLessonSteps(lesson) {
    const ids = lesson.items.filter(id => P[id]);
    const learn = ids.filter(id => !S.learned[id]).map(id => ({ t: 'learn', id }));
    const practice = ids.map((id, i) => ({ t: i % 2 ? 'translate' : 'meaning', id }));
    if (ids.length >= 3) practice.push({ t: 'match', ids: shuffle(ids).slice(0, 4) });
    (lesson.cloze || []).forEach(c => { if (CLOZE[c]) practice.push({ t: 'cloze', c: CLOZE[c] }); });
    (lesson.dialogues || []).forEach(d => { if (DIAL[d]) practice.push({ t: 'dialogue', d: DIAL[d] }); });
    shuffle(ids).slice(0, 2).forEach(id => practice.push({ t: 'recall', id }));
    return learn.concat(shuffle(practice));
  }
  function buildReviewSteps(ids) {
    return ids.filter(id => P[id]).map((id, i) => ({ t: ['recall', 'meaning', 'translate'][i % 3], id }));
  }
  function startLesson(id) {
    const lesson = LESSONS.find(l => l.id === id); if (!lesson) return;
    L = { kind: 'lesson', lesson, title: lesson.title, steps: buildLessonSteps(lesson), i: 0, correct: 0, attempts: 0, wrong: new Set(), answered: false };
    view = 'learn'; render(); window.scrollTo(0, 0);
  }
  function startReview(ids, title) {
    ids = uniq(ids).filter(id => P[id]).slice(0, 12);
    if (!ids.length) { toast('Nothing to review yet.'); return; }
    L = { kind: 'review', title: title || 'Review', ids, steps: buildReviewSteps(shuffle(ids)), i: 0, correct: 0, attempts: 0, wrong: new Set(), answered: false };
    render(); window.scrollTo(0, 0);
  }
  function prepare(st) {
    if (st.opts) return;
    if (st.t === 'meaning') st.opts = shuffle([P[st.id]].concat(distractors(st.id, 'english', 3))).map(p => ({ label: p.english, ok: p.id === st.id }));
    else if (st.t === 'translate') st.opts = shuffle([P[st.id]].concat(distractors(st.id, 'romanized', 3))).map(p => ({ label: p.romanized, ok: p.id === st.id, rom: true }));
    else if (st.t === 'cloze') st.opts = shuffle(st.c.options).map(o => ({ label: o, ok: o === st.c.answer, rom: true }));
    else if (st.t === 'dialogue') st.opts = shuffle([st.d.answer].concat(st.d.wrong)).map(o => ({ label: o, ok: o === st.d.answer }));
    else if (st.t === 'match') { st.left = shuffle(st.ids); st.right = shuffle(st.ids); st.done = []; st.errors = 0; st.sel = null; st.opts = []; }
    else st.opts = [];
  }
  const sayHint = p => p.pronunciation ? `<p class="say">Say it: <b>${esc(p.pronunciation)}</b></p>` : '';
  const optsHTML = st => `<div class="opts">${st.opts.map((o, i) => {
    let cls = 'opt' + (o.rom ? ' rom' : ''), mark = '';
    if (L.answered) { if (o.ok) { cls += ' correct'; mark = '<span class="mark">✓ Correct</span>'; } else if (st.chosen === i) { cls += ' wrong'; mark = '<span class="mark">✗ Your answer</span>'; } }
    return `<button class="${cls}" data-a="answer" data-v="${i}" ${L.answered ? 'disabled' : ''}><span>${esc(o.label)}</span>${mark}</button>`;
  }).join('')}</div>`;

  function stepBody(st) {
    const p = st.id ? P[st.id] : null;
    switch (st.t) {
      case 'learn': return `<p class="prompt">New phrase</p><div class="tamil-rom-wrap"><h1 class="tamil-rom" tabindex="-1">${esc(p.romanized)}</h1></div>
        ${sayHint(p)}<p class="meaning" ${st.hide ? 'hidden' : ''}>${esc(p.english)}</p>
        <button class="btn" data-a="toggleMeaning" style="min-height:40px">${st.hide ? 'Show meaning' : 'Hide meaning'}</button>
        ${p.context ? `<p class="muted" style="margin-top:12px">${esc(p.context)}</p>` : ''}
        ${REGION[p.region] ? `<div class="badges"><span class="badge">${REGION[p.region]}</span></div>` : ''}
        <div class="speak-prompt">${ICON.mic} Say it aloud two or three times.</div>${speakBtn(p.id)}`;
      case 'meaning': return `<p class="prompt">What does this mean?</p><div class="tamil-rom-wrap"><h1 class="tamil-rom" tabindex="-1">${esc(p.romanized)}</h1></div>${optsHTML(st)}`;
      case 'translate': return `<p class="prompt">How do you say this in Tamil?</p><h1 tabindex="-1">${esc(p.english)}</h1>${optsHTML(st)}`;
      case 'cloze': return `<p class="prompt">Complete the phrase</p><p class="cloze" tabindex="-1">${esc(st.c.text).replace('___', '<span class="blank" aria-label="blank">&nbsp;</span>')}</p>
        <p class="meaning">“${esc(P[st.c.phrase] ? P[st.c.phrase].english : '')}”</p>${optsHTML(st)}`;
      case 'dialogue': return `<p class="prompt">Understand the reply</p>${st.d.lines.map(l => `<div class="bubble ${l[0] === 'You' ? 'me' : ''}"><small>${esc(l[0])}</small><b>${esc(l[1])}</b></div>`).join('')}
        <h2 tabindex="-1" style="margin-top:16px">${esc(st.d.question)}</h2>${optsHTML(st)}`;
      case 'recall': return `<p class="prompt">Remember the Tamil</p><h1 tabindex="-1">${esc(p.english)}</h1>
        <div class="speak-prompt">${ICON.mic} Say it aloud first, then check.</div>
        ${st.revealed ? `<div class="tamil-rom-wrap"><span class="tamil-rom">${esc(p.romanized)}</span></div>${sayHint(p)}${speakBtn(p.id)}<p class="prompt">How did you do?</p>` : ''}`;
      case 'match': {
        const btn = (id, side) => { const done = st.done.includes(id), sel = st.sel && st.sel.side === side && st.sel.id === id;
          return `<button class="${side === 'l' ? 'rom' : ''} ${done ? 'done' : ''} ${sel ? 'sel' : ''} ${st.flash && st.flash.includes(side + id) ? 'shake' : ''}" data-a="match" data-v="${side}:${id}" ${done ? 'disabled aria-label="Matched"' : ''} aria-pressed="${sel}">${esc(side === 'l' ? P[id].romanized : P[id].english)}</button>`; };
        return `<p class="prompt">Match the pairs</p><p class="muted small">Tap a Tamil phrase, then its meaning.</p>
          <div class="match"><div class="col">${st.left.map(id => btn(id, 'l')).join('')}</div><div class="col">${st.right.map(id => btn(id, 'r')).join('')}</div></div>`;
      }
    }
    return '';
  }
  function feedbackHTML(st) {
    const ok = L.lastOk;
    let info = '';
    if (st.id) { const p = P[st.id]; info = `<div><b>${esc(p.romanized)}</b> — ${esc(p.english)}</div>${p.pronunciation && !ok ? `<div class="small">Say it: ${esc(p.pronunciation)}</div>` : ''}`; }
    else if (st.t === 'cloze') { const p = P[st.c.phrase]; info = `<div><b>${esc(st.c.text.replace('___', st.c.answer))}</b> — ${esc(p ? p.english : '')}</div>`; }
    else if (st.t === 'dialogue') info = `<div>${esc(st.d.answer)}</div><div class="small">${st.d.lines.map(l => esc(l[1])).join(' · ')}</div>`;
    else if (st.t === 'match') info = ok ? '<div>All pairs matched.</div>' : '<div>Done — the mixed-up phrases will come back in review.</div>';
    return `<div class="fb ${ok ? 'ok' : 'bad'}" role="status"><strong>${ok ? '✓ Correct' : '✗ Not quite'}</strong>${info}</div>`;
  }
  function footHTML(st) {
    if (st.t === 'learn') return `<button class="btn primary block" data-a="next">Continue</button>`;
    if (st.t === 'recall' && !st.revealed) return `<button class="btn primary block" data-a="reveal">Show answer</button>`;
    if (st.t === 'recall') return `<div class="self"><button class="btn" data-a="self" data-v="again">Need practice</button><button class="btn" data-a="self" data-v="nearly">Nearly</button><button class="btn primary" data-a="self" data-v="good">Got it</button></div>`;
    if (L.answered) return feedbackHTML(st) + `<button class="btn primary block" data-a="next">Continue</button>`;
    return '';
  }
  function renderLesson() {
    if (L.result) { $main.innerHTML = resultHTML(); const h = $main.querySelector('h1'); h && h.focus(); return; }
    const st = L.steps[L.i]; prepare(st);
    const pct = Math.round(L.i / L.steps.length * 100);
    $main.innerHTML = `<div class="lesson"><div class="lbar"><button class="icon-btn" data-a="quit" aria-label="Leave ${L.kind}">${ICON.x}</button>
      <div class="pbar" role="progressbar" aria-label="${esc(L.title)} progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><span style="width:${pct}%"></span></div></div>
      <section class="lbody">${stepBody(st)}</section><div class="lfoot">${footHTML(st)}</div></div>`;
    const f = L.answered ? $main.querySelector('.lfoot [data-a="next"]') : ($main.querySelector('[tabindex="-1"]') || $main.querySelector('.lbody button'));
    if (f) f.focus({ preventScroll: L.answered ? false : true });
  }
  function grade(ok, ids) {
    const st = L.steps[L.i];
    L.answered = true; L.lastOk = ok; L.attempts++;
    if (ok) L.correct++;
    else {
      ids.forEach(id => L.wrong.add(id));
      if (!st.again) L.steps.push(Object.assign({}, st, { opts: null, chosen: null, again: true, revealed: false }));
    }
    if (L.kind === 'review') { ids.forEach(id => srsUpdate(id, ok ? 'good' : 'again')); S.review[ok ? 'right' : 'wrong']++; markDay(); save(); }
  }
  const stepIds = st => st.id ? [st.id] : st.t === 'cloze' ? [st.c.phrase] : st.t === 'dialogue' ? (st.d.phrases || []) : [];
  function next() {
    L.i++; L.answered = false;
    if (L.i >= L.steps.length) finish(); else renderLesson();
    window.scrollTo(0, 0);
  }
  function finish() {
    if (L.result) return;
    const pct = L.attempts ? Math.round(L.correct / L.attempts * 100) : 100;
    let xp = 0; const newIds = [];
    if (L.kind === 'lesson') {
      const id = L.lesson.id, first = !lessonDone(id);
      L.lesson.items.filter(x => P[x]).forEach(x => {
        if (!S.learned[x]) { S.learned[x] = today(); newIds.push(x); }
        srsUpdate(x, L.wrong.has(x) ? 'again' : 'good');
      });
      const prev = S.lessons[id];
      S.lessons[id] = { done: true, best: Math.max(pct, prev ? prev.best || 0 : 0), date: today() };
      xp = first ? 10 + L.correct : 5;
    } else {
      S.review.sessions++;
      S.marked = S.marked.filter(id => !(L.ids.includes(id) && !L.wrong.has(id)));
      xp = Math.min(L.correct, 15);
    }
    S.xp += xp;
    S.scores = S.scores.concat([{ d: today(), t: L.title, s: pct }]).slice(-20);
    markDay(); checkAch(); save();
    L.result = { pct, xp, newIds, wrong: Array.from(L.wrong).filter(id => P[id]) };
    renderLesson();
  }
  function resultHTML() {
    const r = L.result, nx = L.kind === 'lesson' ? nextLesson() : null;
    const list = ids => `<ul>${ids.map(id => `<li><b>${esc(P[id].romanized)}</b> — ${esc(P[id].english)}</li>`).join('')}</ul>`;
    return `<div class="result"><h1 tabindex="-1">${r.pct >= 80 ? 'Nicely done!' : r.pct >= 50 ? 'Good practice!' : 'Keep going — it sticks with repetition.'}</h1>
      <p class="score">${r.pct}%</p><p class="muted">${L.correct} correct out of ${L.attempts} answers · +${r.xp} XP</p></div>
      ${r.newIds.length ? `<h2>New phrases</h2>${list(r.newIds)}` : ''}
      ${r.wrong.length ? `<h2>Needs more practice</h2>${list(r.wrong)}<p class="muted small">These are now in your Review list.</p>` : ''}
      <div style="display:grid;gap:10px;margin-top:24px">
        ${nx ? `<button class="btn primary block" data-a="start" data-v="${nx.id}">Next lesson: ${esc(nx.title)}</button>` : ''}
        ${r.wrong.length ? `<button class="btn block" data-a="reviewMistakes">Review mistakes</button>` : ''}
        <button class="btn block" data-a="home">Back to ${L.kind === 'review' ? 'Review' : 'Learn'}</button></div>`;
  }

  /* ---------------- Review screen ---------------- */
  function reviewView() {
    const q = reviewQueue(), dif = difficultIds(), learned = Object.keys(S.learned).filter(id => P[id]);
    if (!learned.length && !S.marked.length) return `<h1>Review</h1><div class="panel"><p>Phrases appear here after you finish a lesson, or when you tap “Mark for review” in the phrasebook.</p>
      <div class="row"><button class="btn primary" data-a="nav" data-v="learn">Start a lesson</button><button class="btn" data-a="nav" data-v="phrases">Open phrasebook</button></div></div>`;
    return `<h1>Review</h1>
      <div class="hero"><p class="kicker">${q.length ? 'Ready now' : 'All caught up'}</p><h2>${q.length ? `${q.length} phrase${q.length === 1 ? '' : 's'} to review` : 'Nothing due right now'}</h2>
      ${q.length ? `<button class="btn block" data-a="review" data-v="due">Start review</button>` : `<button class="btn block" data-a="review" data-v="random">Practise 10 random phrases</button>`}</div>
      <div class="row" style="margin:12px 0">
        <button class="btn" data-a="review" data-v="difficult" ${dif.length ? '' : 'disabled'}>Review difficult (${dif.length})</button>
        <button class="btn" data-a="review" data-v="random" ${learned.length ? '' : 'disabled'}>Random practice</button></div>
      <p class="muted small">Phrases you miss come back soon. Ones you remember come back after 1, 3, 7, 14 and then 30 days.</p>
      ${dif.length ? `<h2>Difficult and marked phrases</h2><ul class="plist">${dif.map(id => pItem(P[id])).join('')}</ul>` : ''}`;
  }

  /* ---------------- Progress screen ---------------- */
  function progressView() {
    const ld = lessonsDone(), lt = LESSONS.length, lc = learnedCount(), pt = D.phrases.length;
    const acc = S.review.right + S.review.wrong ? Math.round(S.review.right / (S.review.right + S.review.wrong) * 100) + '%' : '–';
    const st = streak(), offline = navigator.serviceWorker && navigator.serviceWorker.controller;
    const bar = (a, b) => `<div class="bar" aria-hidden="true"><span style="width:${b ? Math.round(a / b * 100) : 0}%"></span></div>`;
    return `<h1>Progress</h1>
      <div class="stats">
        <div class="stat"><div class="n">${S.xp}</div><div class="l">XP earned</div></div>
        <div class="stat"><div class="n">${st}</div><div class="l">day streak · ${S.days.length} days practised in total</div></div>
        <div class="stat"><div class="n">${ld}/${lt}</div><div class="l">lessons</div>${bar(ld, lt)}</div>
        <div class="stat"><div class="n">${unitsDone()}/${D.units.length}</div><div class="l">units</div>${bar(unitsDone(), D.units.length)}</div>
        <div class="stat"><div class="n">${lc}/${pt}</div><div class="l">phrases learned</div>${bar(lc, pt)}</div>
        <div class="stat"><div class="n">${acc}</div><div class="l">review accuracy · ${S.marked.length} marked</div></div>
      </div>
      ${S.scores.length ? `<h2>Recent results</h2><ul class="plist">${S.scores.slice(-5).reverse().map(s => `<li style="display:flex;justify-content:space-between;padding:10px 4px"><span>${esc(s.t)} <span class="muted small">${esc(s.d)}</span></span><b>${s.s}%</b></li>`).join('')}</ul>` : ''}
      <h2>Achievements</h2><ul class="ach">${ACH.map(a => `<li class="${S.ach[a.id] ? 'got' : ''}"><span class="medal" aria-hidden="true">${S.ach[a.id] ? '★' : '·'}</span><span><b>${esc(a.name)}</b><br><span class="small">${S.ach[a.id] ? 'Earned ' + esc(S.ach[a.id]) : esc(a.desc)}</span></span></li>`).join('')}</ul>
      <p class="muted small">Missed a day? No problem — streaks are just for fun, and nothing is lost.</p>
      <h2>Your data</h2><div class="panel">
        <p class="small">Progress saves automatically on this device. ${offline ? '<b>Offline mode is ready.</b>' : location.protocol.startsWith('http') ? 'Offline mode is being set up — open the app once more while online.' : 'Offline install works when the app is opened from its web address.'}</p>
        <p class="small muted">To move progress to another phone or keep a backup, export a file and import it there.</p>
        <div class="row"><button class="btn" data-a="export">Export progress</button><button class="btn" data-a="import">Import progress</button></div>
        <div class="row" style="margin-top:10px"><button class="btn" data-a="guide">Sound guide</button><button class="btn danger" data-a="reset">Reset progress</button></div></div>
      <p class="muted small" style="margin-top:16px">Tamil Buddy teaches everyday spoken Sri Lankan Tamil. Phrases tagged “Needs a native check” are still waiting for a fluent speaker to confirm them. In an emergency, call 119 (police) or 1990 (ambulance) — this app does not replace a translator.</p>`;
  }
  function exportProgress() {
    const blob = new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'tamil-buddy-progress-' + today() + '.json';
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    toast('Progress exported');
  }
  document.getElementById('importFile').addEventListener('change', e => {
    const f = e.target.files && e.target.files[0]; e.target.value = ''; if (!f) return;
    const rd = new FileReader();
    rd.onload = () => {
      try {
        const o = JSON.parse(rd.result);
        if (!o || typeof o !== 'object' || !('xp' in o) || !('lessons' in o)) throw new Error('bad');
        if (!confirm('Replace your current progress with the imported file?')) return;
        S = sanitize(o); save(); render(); toast('Progress imported');
      } catch (err) { toast('That file is not a Tamil Buddy progress file.'); }
    };
    rd.readAsText(f);
  });

  /* ---------------- Events (one delegated handler) ---------------- */
  const ACT = {
    nav: v => { L = null; view = v; if (overlay) closeOverlay(); render(); window.scrollTo(0, 0); $main.focus({ preventScroll: true }); },
    home: () => { const v = L && L.kind === 'review' ? 'review' : 'learn'; L = null; view = v; render(); window.scrollTo(0, 0); },
    start: v => { if (overlay) closeOverlay(); startLesson(v); },
    open: v => openPhrase(v),
    close: () => closeOverlay(),
    closeBig: () => { const id = overlay.id; overlay = { t: 'phrase', id }; renderOverlay(); },
    big: v => openOverlay({ t: 'big', id: v }),
    guide: () => openOverlay({ t: 'guide' }),
    speak: v => speak(v),
    fav: v => { S.fav = S.fav.includes(v) ? S.fav.filter(x => x !== v) : S.fav.concat(v); save(); renderOverlay(); toast(S.fav.includes(v) ? 'Added to favourites' : 'Removed from favourites'); },
    mark: v => {
      if (S.marked.includes(v)) S.marked = S.marked.filter(x => x !== v);
      else { S.marked = S.marked.concat(v); if (!S.srs[v]) S.srs[v] = { box: 0, due: Date.now(), right: 0, wrong: 0 }; else S.srs[v].due = Date.now(); }
      save(); renderOverlay(); toast(S.marked.includes(v) ? 'Added to Review' : 'Removed from Review');
    },
    filter: v => { pFilter = v; document.querySelectorAll('.filters button').forEach(b => b.setAttribute('aria-pressed', b.dataset.v === v)); renderPhraseList(); },
    answer: v => { const st = L.steps[L.i]; if (L.answered || !st.opts[+v]) return; st.chosen = +v; grade(st.opts[+v].ok, stepIds(st)); renderLesson(); },
    next: () => next(),
    toggleMeaning: () => { const st = L.steps[L.i]; st.hide = !st.hide; renderLesson(); },
    reveal: () => { L.steps[L.i].revealed = true; renderLesson(); const b = $main.querySelector('[data-v="good"]'); b && b.focus(); },
    self: v => {
      const st = L.steps[L.i];
      L.attempts++; if (v === 'good') L.correct++; else if (v === 'again') L.wrong.add(st.id);
      if (L.kind === 'review') { srsUpdate(st.id, v); if (v !== 'nearly') S.review[v === 'good' ? 'right' : 'wrong']++; markDay(); save(); }
      next();
    },
    match: v => {
      const st = L.steps[L.i]; if (L.answered) return;
      const [side, id] = v.split(':'); st.flash = null;
      if (!st.sel || st.sel.side === side) st.sel = { side, id };
      else {
        const other = st.sel;
        if (other.id === id) { st.done.push(id); }
        else { st.errors++; L.wrong.add(side === 'l' ? id : other.id); st.flash = ['l' + (side === 'l' ? id : other.id), 'r' + (side === 'r' ? id : other.id)]; }
        st.sel = null;
        if (st.done.length === st.ids.length) { L.answered = true; L.lastOk = st.errors === 0; L.attempts++; if (L.lastOk) L.correct++; }
      }
      renderLesson();
    },
    quit: () => {
      if (L.result || confirm(L.kind === 'review' ? 'Stop reviewing? Answers so far are saved.' : 'Leave this lesson? It will count once you finish it.')) {
        const v = L.kind === 'review' ? 'review' : 'learn'; L = null; view = v; render();
      }
    },
    reviewMistakes: () => { const ids = L.result.wrong; L = null; startReview(ids, 'Mistakes review'); },
    review: v => {
      const learned = Object.keys(S.learned).filter(id => P[id]);
      if (v === 'due') startReview(reviewQueue(), 'Review');
      else if (v === 'difficult') startReview(shuffle(difficultIds()), 'Difficult phrases');
      else startReview(shuffle(learned.length ? learned : S.marked).slice(0, 10), 'Random practice');
    },
    export: () => exportProgress(),
    import: () => document.getElementById('importFile').click(),
    reset: () => {
      if (!confirm('Reset ALL progress, favourites and review history? This cannot be undone.')) return;
      if (!confirm('Are you sure? Consider exporting a backup first.')) return;
      S = defaults(); save(); render(); toast('Progress reset');
    }
  };
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-a]'); if (!b || b.disabled) return;
    const fn = ACT[b.dataset.a]; if (fn) { e.preventDefault(); fn(b.dataset.v, b); }
  });
  document.addEventListener('input', e => {
    if (e.target.id === 'psearch') { pQuery = e.target.value; renderPhraseList(); }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay) { e.preventDefault(); if (overlay.t === 'big') ACT.closeBig(); else closeOverlay(); }
    else if (e.key === 'Enter' && overlay && overlay.t === 'big') { ACT.closeBig(); }
  });

  /* ---------------- Start ---------------- */
  render();
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(() => {}));
  }
  // For automated tests only (read-only peek at lesson state)
  window.__TB = { get L() { return L; }, get S() { return S; } };
})();
