/* ═══════════════════════════════════════
   旅遊誌 — Application Logic
   app.js
═══════════════════════════════════════ */

/* ─── SVG Icon Strings ─── */
const EDIT_SVG  = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>`;
const DEL_SVG   = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;
const MINUS_SVG = `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93ZM280-440h400v-80H280v80Z"/></svg>`;

const EXPENSE_CATS = [
  { label: "餐飲", color: "#EA6C1E", svg: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#EA6C1E"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480h80v-320l720-80v60l-460 52v68h460v60H420v160h460q0 83-31.5 156T763-197q-54 54-127 85.5T480-80ZM220-480h40v-160h-40v160Zm0-220h40v-50l-40 4v46Zm100 220h40v-160h-40v160Zm0-220h40v-62l-40 5v57ZM185-360h590q4-10 7-19.5t6-20.5H171q3 11 6.5 20.5T185-360Zm295 200q75 0 139-32.5T728-280H232q45 55 109 87.5T480-160Zm0-120Zm0-80Zm0 80v-80 80Z"/></svg>` },
  { label: "交通", color: "#1A56DB", svg: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#1A56DB"><path d="M160-340v-380q0-53 27.5-84.5t72.5-48q45-16.5 102.5-22T480-880q66 0 124.5 5.5t102 22q43.5 16.5 68.5 48t25 84.5v380q0 59-40.5 99.5T660-200l60 60v20h-80l-80-80H400l-80 80h-80v-20l60-60q-59 0-99.5-40.5T160-340Zm320-460q-106 0-155 12.5T258-760h448q-15-17-64.5-28.5T480-800ZM240-560h200v-120H240v120Zm420 80H240h480-60Zm-140-80h200v-120H520v120ZM383-337q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm280 0q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm-363 57h360q26 0 43-17t17-43v-140H240v140q0 26 17 43t43 17Zm180-480h226-448 222Z"/></svg>` },
  { label: "購物", color: "#16A34A", svg: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#16A34A"><path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z"/></svg>` },
  { label: "住宿", color: "#7C3AED", svg: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#7C3AED"><path d="M40-200v-600h80v400h320v-320h320q66 0 113 47t47 113v360h-80v-120H120v120H40Zm155-275q-35-35-35-85t35-85q35-35 85-35t85 35q35 35 35 85t-35 85q-35 35-85 35t-85-35Zm325 75h320v-160q0-33-23.5-56.5T760-640H520v240ZM308.5-531.5Q320-543 320-560t-11.5-28.5Q297-600 280-600t-28.5 11.5Q240-577 240-560t11.5 28.5Q263-520 280-520t28.5-11.5ZM280-560Zm240-80v240-240Z"/></svg>` },
  { label: "票券", color: "#0EA5E9", svg: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#0EA5E9"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm0-160q17 0 28.5-11.5T520-480q0-17-11.5-28.5T480-520q-17 0-28.5 11.5T440-480q0 17 11.5 28.5T480-440Zm0-160q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm320 440H160q-33 0-56.5-23.5T80-240v-160q33 0 56.5-23.5T160-480q0-33-23.5-56.5T80-560v-160q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v160q-33 0-56.5 23.5T800-480q0 33 23.5 56.5T880-400v160q0 33-23.5 56.5T800-160Zm0-80v-102q-37-22-58.5-58.5T720-480q0-43 21.5-79.5T800-618v-102H160v102q37 22 58.5 58.5T240-480q0 43-21.5 79.5T160-342v102h640ZM480-480Z"/></svg>` },
  { label: "其他", color: "#EC4899", svg: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#EC4899"><path d="M880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720Zm-720 80h640v-80H160v80Zm0 160v240h640v-240H160Zm0 240v-480 480Z"/></svg>` },
];


/* ═══════════════════════════════════════
   DATA LAYER
═══════════════════════════════════════ */
const KEY = 'travel_journal_v4';
let data = {
  days: [{ banner: { date: '', subtitle: '', photos: [] }, events: [] }],
  expenses: [[]],
  flights: [],
  hotels: [],
  settings: { tripName: '', budget: 0, currency: 'TWD', theme: 'light' }
};
let currentDay = 0;
let editingEventId = null;
let _slideshowTimer = null;

/* blob URL cache：key → objectURL，session 內有效 */
const _blobCache = new Map();

function load() {
  try {
    const s = localStorage.getItem(KEY);
    if (s) data = JSON.parse(s);
    while (data.expenses.length < data.days.length) data.expenses.push([]);
    if (!data.flights)   data.flights   = [];
    if (!data.hotels)    data.hotels    = [];
    if (!data.tickets)   data.tickets   = [];
    if (!data.checklist) data.checklist = [];
    if (!data.shopping)  data.shopping  = [];
    if (!data.notes)     data.notes     = '';
    if (!data.settings)  data.settings  = { tripName: '', budget: 0, currency: 'TWD', theme: 'light' };
    data.days.forEach(d => {
      if (!d.banner) d.banner = { date: '', subtitle: '', photos: [] };
      if (!d.banner.photos) d.banner.photos = [];
    });
  } catch(e) {}
}

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch(e) {}
}

/* ─── Utility ─── */
function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* ═══════════════════════════════════════
   TAB NAVIGATION
═══════════════════════════════════════ */
function switchTab(tab) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('screen-' + tab).classList.add('active');
  document.getElementById('tab-' + tab).classList.add('active');
  if (tab === 'expense')  renderExpense();
  if (tab === 'info')     renderInfo();
  if (tab === 'settings') renderSettings();
}

/* ═══════════════════════════════════════
   ITINERARY
═══════════════════════════════════════ */
function renderItinerary() {
  renderDayTabs();
  renderBanner();
  renderTimeline();
}

/* ─── Custom Confirm Dialog ─── */
function showConfirm(title, msg, onOk) {
  let el = document.getElementById('app-confirm');
  if (!el) {
    el = document.createElement('div');
    el.id = 'app-confirm';
    el.innerHTML = `
      <div class="confirm-box">
        <div class="confirm-title" id="confirm-title"></div>
        <div class="confirm-msg" id="confirm-msg"></div>
        <div class="confirm-btns">
          <button class="confirm-btn confirm-cancel" id="confirm-cancel">取消</button>
          <button class="confirm-btn confirm-ok" id="confirm-ok">刪除</button>
        </div>
      </div>`;
    document.body.appendChild(el);
  }
  document.getElementById('confirm-title').textContent = title;
  document.getElementById('confirm-msg').textContent   = msg;
  el.classList.add('show');
  const ok     = document.getElementById('confirm-ok');
  const cancel = document.getElementById('confirm-cancel');
  const close  = () => el.classList.remove('show');
  ok.onclick     = () => { close(); onOk(); };
  cancel.onclick = () => close();
  el.onclick     = (e) => { if (e.target === el) close(); };
}


function deleteDay(i) {
  if (data.days.length <= 1) {
    showToast('至少保留一天');
    return;
  }
  showConfirm(`刪除 Day ${i + 1}？`, '此天的行程與帳單將一併移除。', () => {
    data.days.splice(i, 1);
    data.expenses.splice(i, 1);
    currentDay = Math.min(currentDay, data.days.length - 1);
    if (expenseDay >= data.days.length) expenseDay = data.days.length - 1;
    save();
    renderItinerary();
    renderExpenseDayTabs();
  });
}

/* ─── Toast helper ─── */
let _toastTimer = null;
function showToast(msg) {
  let el = document.getElementById('app-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'app-toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  if (_toastTimer) clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove('show'), 2000);
}

function renderDayTabs() {
  const w = document.getElementById('day-tabs');
  w.innerHTML = '';
  data.days.forEach((_, i) => {
    const b = document.createElement('button');
    b.className = 'day-tab' + (i === currentDay ? ' active' : '');
    b.textContent = i + 1;
    b.onclick = () => { currentDay = i; renderItinerary(); };

    // Long-press to delete
    let pressTimer = null;
    b.addEventListener('pointerdown', () => {
      pressTimer = setTimeout(() => {
        pressTimer = null;
        deleteDay(i);
      }, 600);
    });
    b.addEventListener('pointerup',    () => { if (pressTimer) { clearTimeout(pressTimer); pressTimer = null; } });
    b.addEventListener('pointerleave', () => { if (pressTimer) { clearTimeout(pressTimer); pressTimer = null; } });

    w.appendChild(b);
  });
}

function renderBanner() {
  const area  = document.getElementById('banner-area');
  const b     = data.days[currentDay].banner;
  const photos = b.photos || [];

  let bg = '';
  if (photos.length > 0) {
    const resolved = photos.map(resolvePhoto).filter(Boolean);
    if (resolved.length > 0) {
      bg = `<div class="banner-slides-wrap" id="banner-slides">
        ${resolved.map(u => `<div class="banner-slide" style="background-image:url('${esc(u)}')"></div>`).join('')}
      </div>`;
    } else {
      bg = `<div class="banner-placeholder-bg"></div>`;
    }
  } else {
    bg = `<div class="banner-placeholder-bg"></div>`;
  }

  const dots = photos.length > 1
    ? `<div class="banner-dots">${photos.map((_, i) => `<div class="banner-dot${i === 0 ? ' active' : ''}"></div>`).join('')}</div>`
    : '';

  area.innerHTML = `
    <div class="day-banner">
      ${bg}
      <div class="banner-gradient"></div>
      <div class="banner-text-area">
        ${data.settings?.tripName ? `<div class="banner-trip-name">${esc(data.settings.tripName)}</div>` : ''}
        <input class="banner-date-input" id="banner-date-live"
          data-day="${currentDay}"
          value="${esc(b.date)}"
          placeholder="YYYY/MM/DD（一）"
          oninput="fmtDate(this)"
          onblur="saveBannerText()">
        <input class="banner-subtitle-input" id="banner-sub-live"
          data-day="${currentDay}"
          value="${esc(b.subtitle)}"
          placeholder="行程說明…"
          onblur="saveBannerText()">
      </div>
      <button class="banner-photo-btn" onclick="openBannerActionSheet(event)" title="更多選項">
        <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="rgba(255,255,255,0.9)">
          <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/>
        </svg>
      </button>
      ${dots}
    </div>`;

  // auto slideshow — clear old timer first to prevent leaks
  if (_slideshowTimer) { clearInterval(_slideshowTimer); _slideshowTimer = null; }
  if (photos.length > 1) {
    let idx = 0;
    const slides  = area.querySelector('#banner-slides');
    const dotEls  = area.querySelectorAll('.banner-dot');
    _slideshowTimer = setInterval(() => {
      idx = (idx + 1) % photos.length;
      slides.style.transform = `translateX(-${idx * 100}%)`;
      dotEls.forEach((d, i) => d.classList.toggle('active', i === idx));
    }, 3500);
  }
}

function saveBannerText() {
  const d   = document.getElementById('banner-date-live');
  const s   = document.getElementById('banner-sub-live');
  if (!d || !s) return;
  const dayIdx = parseInt(d.dataset.day ?? currentDay);
  if (isNaN(dayIdx) || !data.days[dayIdx]) return;
  data.days[dayIdx].banner.date     = d.value;
  data.days[dayIdx].banner.subtitle = s.value;
  // 填入日期後推算所有空白天
  inferAllDates();
  save();
  // 重新 render tabs（日期可能更新了）
  renderDayTabs();
  renderExpenseDayTabs();
}

function renderTimeline() {
  const list = document.getElementById('timeline-list');
  const evs  = [...(data.days[currentDay].events || [])].sort((a, b) => a.time.localeCompare(b.time));
  if (!evs.length) {
    list.innerHTML = `<div class="timeline-empty">尚無行程</div>`;
    return;
  }
  list.innerHTML = evs.map((ev, i) => `
    <div class="timeline-item" style="animation-delay:${i * 0.05}s">
      <div class="timeline-left">
        <div class="timeline-dot"></div>
        <div class="timeline-line"></div>
      </div>
      <div class="timeline-right">
        <div class="timeline-time">
          <span>${ev.time}</span>
          <div class="timeline-actions">
            <button class="t-action-btn" onclick="editEvent(${ev.id})">${EDIT_SVG}</button>
            <button class="t-action-btn del" onclick="deleteEvent(${ev.id})">${DEL_SVG}</button>
          </div>
        </div>
        <div class="timeline-title">${esc(ev.title)}</div>
        ${ev.note ? `<div class="timeline-note">${esc(ev.note)}</div>` : ''}
      </div>
    </div>`).join('');
}

/* ─── Date Auto-format: digits → YYYY/MM/DD（weekday） ─── */
const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

function fmtDate(el) {
  let digits = el.value.replace(/\D/g, '').slice(0, 8);
  let out = '';
  if (digits.length <= 4) {
    out = digits;
  } else if (digits.length <= 6) {
    out = digits.slice(0, 4) + '/' + digits.slice(4);
  } else {
    out = digits.slice(0, 4) + '/' + digits.slice(4, 6) + '/' + digits.slice(6);
  }
  if (digits.length === 8) {
    const y  = parseInt(digits.slice(0, 4));
    const m  = parseInt(digits.slice(4, 6)) - 1;
    const d  = parseInt(digits.slice(6, 8));
    const dt = new Date(y, m, d);
    if (!isNaN(dt.getTime())) {
      out += '（' + WEEKDAYS[dt.getDay()] + '）';
    }
  }
  el.value = out;
}

/* parse "YYYY/MM/DD…" → Date or null */
function parseBannerDate(str) {
  const m = String(str || '').match(/(\d{4})\/(\d{2})\/(\d{2})/);
  if (!m) return null;
  return new Date(parseInt(m[1]), parseInt(m[2]) - 1, parseInt(m[3]));
}

/* ─── Date helpers ─── */
function dateToStr(dt) {
  const y  = dt.getFullYear();
  const mo = String(dt.getMonth() + 1).padStart(2, '0');
  const d  = String(dt.getDate()).padStart(2, '0');
  const wd = WEEKDAYS[dt.getDay()];
  return `${y}/${mo}/${d}（${wd}）`;
}

/* 從任一已知天推算所有空白天的日期 */
function inferAllDates() {
  // 找第一個有日期的 anchor
  let anchorIdx = -1;
  let anchorDate = null;
  for (let i = 0; i < data.days.length; i++) {
    const d = parseBannerDate(data.days[i].banner.date);
    if (d) { anchorIdx = i; anchorDate = d; break; }
  }
  if (anchorIdx === -1) return; // 沒有任何日期，無法推算

  // 往前推
  for (let i = anchorIdx - 1; i >= 0; i--) {
    if (!parseBannerDate(data.days[i].banner.date)) {
      const dt = new Date(anchorDate);
      dt.setDate(dt.getDate() - (anchorIdx - i));
      data.days[i].banner.date = dateToStr(dt);
    }
  }
  // 往後推
  for (let i = anchorIdx + 1; i < data.days.length; i++) {
    if (!parseBannerDate(data.days[i].banner.date)) {
      const dt = new Date(anchorDate);
      dt.setDate(dt.getDate() + (i - anchorIdx));
      data.days[i].banner.date = dateToStr(dt);
    }
  }
}

/* resolve stored value → displayable URL */
function resolvePhoto(val) {
  if (!val) return '';
  if (val.startsWith('blob-key:')) return _blobCache.get(val) || '';
  return val;
}

function addDay() {
  // 先找最後一個有日期的天往後推一天
  let nextDate = '';
  for (let i = data.days.length - 1; i >= 0; i--) {
    const d = parseBannerDate(data.days[i].banner.date);
    if (d) {
      d.setDate(d.getDate() + (data.days.length - i));
      nextDate = dateToStr(d);
      break;
    }
  }
  data.days.push({ banner: { date: nextDate, subtitle: '', photos: [] }, events: [] });
  data.expenses.push([]);
  currentDay = data.days.length - 1;
  save();
  renderItinerary();
  const etabs = document.getElementById('expense-day-tabs');
  if (etabs) renderExpenseDayTabs();
}

/* ─── Event Modal ─── */
function openEventModal(id) {
  editingEventId = id !== undefined ? id : null;
  document.getElementById('modal-event-title').textContent = id !== undefined ? '編輯行程' : '新增行程';
  if (id !== undefined) {
    const ev = data.days[currentDay].events.find(e => e.id === id);
    document.getElementById('ev-time').value  = ev.time;
    document.getElementById('ev-title').value = ev.title;
    document.getElementById('ev-note').value  = ev.note || '';
  } else {
    document.getElementById('ev-time').value  = '';
    document.getElementById('ev-title').value = '';
    document.getElementById('ev-note').value  = '';
  }
  document.getElementById('modal-event').classList.add('open');
  setTimeout(() => document.getElementById('ev-title').focus(), 340);
}

function editEvent(id)   { openEventModal(id); }

function deleteEvent(id) {
  data.days[currentDay].events = data.days[currentDay].events.filter(e => e.id !== id);
  save();
  renderTimeline();
}

function saveEvent() {
  const time  = document.getElementById('ev-time').value;
  const title = document.getElementById('ev-title').value.trim();
  if (!time || !title) return;
  const note = document.getElementById('ev-note').value.trim();
  if (editingEventId !== null) {
    const ev = data.days[currentDay].events.find(e => e.id === editingEventId);
    if (ev) { ev.time = time; ev.title = title; ev.note = note; }
  } else {
    data.days[currentDay].events.push({ id: Date.now(), time, title, note });
  }
  save();
  closeModal('modal-event');
  renderTimeline();
}

/* ─── Banner Action Sheet ─── */
function openBannerActionSheet(e) {
  e.stopPropagation();
  document.getElementById('action-sheet-banner').classList.add('open');
}

function bannerActionDelete() {
  closeActionSheet('action-sheet-banner');
  deleteDay(currentDay);
}

function bannerActionEdit() {
  closeActionSheet('action-sheet-banner');
  setTimeout(() => openBannerModal({}), 350);
}

function closeActionSheet(id) {
  document.getElementById(id).classList.remove('open');
}

/* ─── Banner Photo Modal ─── */
function openBannerModal(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  renderPhotoGrid();
  document.getElementById('modal-banner').classList.add('open');
}

function renderPhotoGrid() {
  const grid   = document.getElementById('photo-grid');
  const photos = data.days[currentDay].banner.photos || [];
  grid.innerHTML = '';

  // 已有的照片格子
  photos.forEach((val, idx) => {
    const url = resolvePhoto(val);
    const cell = document.createElement('div');
    cell.className = 'photo-cell photo-cell-filled';
    cell.style.backgroundImage = url ? `url('${url}')` : '';
    cell.innerHTML = `<button class="photo-cell-del" onclick="removeBannerPhoto(${idx})">×</button>`;
    grid.appendChild(cell);
  });

  // 新增格子（最多 5 張）
  if (photos.length < 5) {
    const add = document.createElement('label');
    add.className = 'photo-cell photo-cell-add';
    add.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px"><path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
      <span>新增照片</span>
      <input type="file" accept="image/*" multiple style="display:none" onchange="handleGridUpload(this)">`;
    grid.appendChild(add);
  }
}

function removeBannerPhoto(idx) {
  data.days[currentDay].banner.photos.splice(idx, 1);
  renderPhotoGrid();
}

function handleGridUpload(input) {
  const files = [...input.files];
  const photos = data.days[currentDay].banner.photos || [];
  const remaining = 5 - photos.length;
  files.slice(0, remaining).forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      const key = `blob-key:${Date.now()}-${Math.random().toString(36).slice(2)}|${file.name}`;
      _blobCache.set(key, base64);
      data.days[currentDay].banner.photos.push(key);
      renderPhotoGrid();
    };
    reader.readAsDataURL(file);
  });
}

function saveBanner() {
  save();
  closeModal('modal-banner');
  renderBanner();
}

/* ─── Custom Category Dropdown ─── */
let _selectedCat = null;

function initCatDropdown() {
  const dd = document.getElementById('exp-cat-dropdown');
  if (!dd) return;
  dd.innerHTML = EXPENSE_CATS.map(c => `
    <div class="exp-cat-option" onclick="selectCat('${c.label}')">
      <span class="exp-cat-opt-icon">${c.svg}</span>
      <span class="exp-cat-opt-label">${c.label}</span>
    </div>`).join('');
}

function toggleCatDropdown() {
  const dd = document.getElementById('exp-cat-dropdown');
  if (!dd) return;
  dd.classList.toggle('open');
}

function selectCat(label) {
  _selectedCat = label;
  const cat = EXPENSE_CATS.find(c => c.label === label);
  const iconSlot = document.getElementById('exp-cat-icon');
  const labelEl  = document.getElementById('exp-cat-label');
  if (cat && iconSlot && labelEl) {
    iconSlot.innerHTML = cat.svg.replace(/height="\d+px"/, 'height="18px"').replace(/width="\d+px"/, 'width="18px"');
    labelEl.textContent = cat.label;
  }
  document.getElementById('exp-cat-dropdown')?.classList.remove('open');
}

// Close dropdown on outside click
document.addEventListener('click', (e) => {
  if (!e.target.closest('#exp-cat-wrap')) {
    document.getElementById('exp-cat-dropdown')?.classList.remove('open');
  }
});


const CATS = ['餐飲', '交通', '購物', '住宿', '票券', '其他'];
let expenseDay = 0;

function renderExpense() {
  expenseDay = Math.min(expenseDay, data.days.length - 1);
  renderExpenseDayTabs();
  renderExpenseList();
  setTimeout(initCatDropdown, 0);
}

function renderExpenseDayTabs() {
  const t = document.getElementById('expense-day-tabs');
  if (!t) return;
  t.innerHTML = data.days.map((_, i) =>
    `<button class="day-tab${i === expenseDay ? ' active' : ''}" onclick="switchExpDay(${i})">${i + 1}</button>`
  ).join('');
}

function switchExpDay(i) { expenseDay = i; renderExpenseDayTabs(); renderExpenseList(); }
function fillCat(c) { document.getElementById('exp-cat').value = c; }

function renderExpenseList() {
  const list  = document.getElementById('expense-list');
  const items = data.expenses[expenseDay] || [];
  const sym   = getCurrencySymbol();
  const total = items.reduce((s, i) => s + parseFloat(i.amount || 0), 0);
  document.getElementById('expense-total').textContent = `${sym} ${total.toLocaleString()}`;
  document.getElementById('expense-count').textContent = `${items.length} 筆記錄`;

  const allTotal = data.expenses.reduce((s, day) =>
    s + day.reduce((ds, i) => ds + parseFloat(i.amount || 0), 0), 0);
  const hdr = document.getElementById('expense-header-total');
  if (hdr) hdr.textContent = allTotal > 0 ? `合計 ${sym} ${allTotal.toLocaleString()}` : '';
  const tripEl = document.getElementById('expense-trip-total');
  if (tripEl) tripEl.textContent = `${sym} ${allTotal.toLocaleString()}`;

  // 更新金額輸入框 placeholder
  const amtInput = document.getElementById('exp-amount');
  if (amtInput) amtInput.placeholder = sym;

  if (!items.length) {
    list.innerHTML = `<div class="expense-section-title">明細</div>
      <div style="text-align:center;padding:30px 0;color:var(--text-tertiary);font-size:13px">尚無記錄</div>`;
    return;
  }
  const countLabel = items.length > 0 ? `支出明細（${items.length} 筆）` : '支出明細';
  list.innerHTML = `<div class="expense-section-title">${countLabel}</div>` +
    [...items].reverse().map((item, i) => {
      const catObj  = (typeof EXPENSE_CATS !== 'undefined') ? EXPENSE_CATS.find(c => c.label === item.cat) : null;
      const catText = item.cat || '其他';
      const hasDesc = !!item.name;
      const iconSvg = catObj ? catObj.svg.replace(/height="\d+px"/, 'height="20px"').replace(/width="\d+px"/, 'width="20px"') : '';
      const left = hasDesc
        ? `<div class="expense-row-icon">${iconSvg}</div><div class="expense-row-name">${esc(item.name)}</div>`
        : `<div class="expense-row-icon">${iconSvg}</div><div class="expense-row-name">${esc(catText)}</div>`;
      return `
        <div class="expense-row" style="animation-delay:${i * 0.04}s">
          ${left}
          <div class="expense-row-amount">${sym} ${parseFloat(item.amount).toLocaleString()}</div>
          <button class="expense-row-del" onclick="deleteExpense(${item.id})">${DEL_SVG}</button>
        </div>`;
    }).join('');
}

function addExpense() {
  const name   = document.getElementById('exp-name').value.trim();
  const amount = document.getElementById('exp-amount').value;
  const cat    = _selectedCat || '其他';
  if (!amount) return;
  data.expenses[expenseDay].push({ id: Date.now(), name, amount: parseFloat(amount), cat });
  save();
  document.getElementById('exp-name').value   = '';
  document.getElementById('exp-amount').value = '';
  _selectedCat = null;
  const iconSlot = document.getElementById('exp-cat-icon');
  const labelEl  = document.getElementById('exp-cat-label');
  if (iconSlot) iconSlot.innerHTML = '';
  if (labelEl)  labelEl.textContent = '類別';
  renderExpenseList();
}

function deleteExpense(id) {
  data.expenses[expenseDay] = data.expenses[expenseDay].filter(i => i.id !== id);
  save();
  renderExpenseList();
}

/* ═══════════════════════════════════════
   INFO — HUB + SUB SCREENS
═══════════════════════════════════════ */
function renderInfo() {
  // hub only, sub-screens render on open
}

function openInfoSub(name) {
  document.getElementById('screen-info').classList.remove('active');
  const sub = document.getElementById('screen-info-' + name);
  sub.classList.add('active');
  if (name === 'flight')    renderFlightCards();
  if (name === 'hotel')     renderHotelCards();
  if (name === 'checklist') renderCheckItems();
  if (name === 'shopping')  renderShopItems();
  if (name === 'ticket')    renderTicketCards();
  if (name === 'notes')     renderNotes();
}

function closeInfoSub(name) {
  document.getElementById('screen-info-' + name).classList.remove('active');
  document.getElementById('screen-info').classList.add('active');
}

/* ─── Checklist ─── */
const CHECKLIST_DEFAULTS = [
  { g: '📄 證件 & 文具', items: ['護照','眼鏡','筆記本','筆','購物袋','紙膠帶','口紅膠','小剪刀','分裝袋'] },
  { g: '🔌 電子 & 充電', items: ['手錶充電 x1','充電器 Type-C x2','Sony 充電器 x1','行動電源＋充電線 x1'] },
  { g: '📷 攝影',        items: ['快門線','相機電池','底片','底片相機電池','拭鏡布'] },
  { g: '🧴 盥洗 & 保養', items: ['盥洗用具','毛巾','刮鬍刀','護唇膏','乳液','護手霜'] },
  { g: '💊 藥品 & 衛生', items: ['止痛藥','胃藥','感冒藥','溫度計','OK繃','衛生紙','口罩','落健'] },
  { g: '👗 衣物 & 日用', items: ['帽子','短袖上衣','長褲','短褲','內衣褲','襪子','布鞋','夾腳拖或涼鞋','薄外套','雨傘','黃色雨衣','寶特瓶','帆布包','筷子叉子'] },
];

function initChecklist() {
  if (!data.checklist || data.checklist.length === 0) {
    data.checklist = CHECKLIST_DEFAULTS.flatMap(g =>
      g.items.map(text => ({ text, done: false, group: g.g }))
    );
    save();
  }
}

function renderCheckItems() {
  initChecklist();
  const items = data.checklist;

  const groups = {};
  const groupOrder = [];
  items.forEach((item, i) => {
    const g = item.group || '其他';
    if (!groups[g]) { groups[g] = []; groupOrder.push(g); }
    groups[g].push({ ...item, idx: i });
  });
  // 確保「其他」在最後
  if (groups['其他']) {
    const idx = groupOrder.indexOf('其他');
    if (idx > -1 && idx < groupOrder.length - 1) {
      groupOrder.splice(idx, 1);
      groupOrder.push('其他');
    }
  }

  const CHECK_SVG  = `<svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px"><path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170Z"/></svg>`;

  const gId = (g) => 'cg-' + btoa(unescape(encodeURIComponent(g))).replace(/[^a-z0-9]/gi,'');

  document.getElementById('checklist-items').innerHTML = groupOrder.map(g => {
    const list = groups[g];
    const doneCount = list.filter(i => i.done).length;
    const id = gId(g);
    return `
      <div class="checklist-group-card">
        <div class="checklist-group-header">
          <span class="checklist-group-title">${esc(g)}</span>
          <button class="checklist-group-add" onclick="openChecklistModal('${esc(g)}')">
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
          </button>
        </div>
        ${list.map(item => `
          <div class="check-row ${item.done ? 'done' : ''}" onclick="toggleCheck(${item.idx})">
            <div class="check-box ${item.done ? 'checked' : ''}">${item.done ? CHECK_SVG : ''}</div>
            <span class="check-text">${esc(item.text)}</span>
            <button class="check-minus" onclick="event.stopPropagation();deleteCheckItem(${item.idx})">${MINUS_SVG}</button>
          </div>`).join('')}
      </div>`;
  }).join('');
}

function openChecklistModal(group) {
  initChecklist();
  document.getElementById('modal-checklist-add').classList.add('open');
  document.getElementById('modal-checklist-add').dataset.group = group || '其他';
  setTimeout(() => {
    const inp = document.getElementById('checklist-add-input');
    if (inp) { inp.value = ''; inp.focus(); }
  }, 340);
}

function saveChecklistModal() {
  const text  = document.getElementById('checklist-add-input').value.trim();
  const group = document.getElementById('modal-checklist-add').dataset.group || '其他';
  if (!text) return;
  if (!data.checklist) data.checklist = [];
  data.checklist.push({ text, done: false, group });
  save();
  closeModal('modal-checklist-add');
  renderCheckItems();
}


function addCheckItem() {
  // fallback — 加到其他
  addCheckItemToGroup('其他', 'cg-other');
}

function toggleCheck(i) {
  data.checklist[i].done = !data.checklist[i].done;
  save(); renderCheckItems();
}

function deleteCheckItem(i) {
  data.checklist.splice(i, 1);
  save(); renderCheckItems();
}

/* ─── Shopping List ─── */
function renderShopItems() {
  const items = data.shopping || [];
  const el = document.getElementById('shopping-items');
  if (!items.length) { el.innerHTML = `<div class="list-empty">點右上角 ＋ 新增品項</div>`; return; }

  const PRICE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px"><path d="M444-200h70v-50q50-9 86-39t36-89q0-42-24-77t-96-61q-60-20-83-35t-23-41q0-26 18.5-41t53.5-15q32 0 50 15.5t26 38.5l64-26q-11-35-40.5-61T516-710v-50h-70v50q-50 11-78 44t-28 74q0 47 27.5 76t86.5 50q63 23 87.5 41t24.5 47q0 33-23.5 48.5T486-314q-33 0-58.5-20.5T390-396l-66 26q14 48 43.5 77.5T444-252v52Zm36 120q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`;
  const LINK_SVG  = `<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px"><path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/></svg>`;
  const MAP_SVG   = `<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-560q0-109-69.5-184.5T480-820q-101 0-170.5 75.5T240-560q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-560q0-150 96.5-245T480-900q127 0 223.5 95T800-560q0 112-79.5 229.5T480-80Zm0-480Z"/></svg>`;
  const NOTE_SVG  = `<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px"><path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg>`;

  el.innerHTML = items.map((item, i) => {
    if (item.done) {
      const thumb = item.photo ? resolvePhoto(item.photo) : '';
      return `
        <div class="shop-card shop-card-done" onclick="toggleShop(${i})">
          ${thumb ? `<div class="shop-thumb-sm" style="background-image:url('${thumb}')"></div>` : ''}
          <span class="shop-name-done">${esc(item.name || '品項')}</span>
          <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" style="flex-shrink:0"><path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170Z"/></svg>
        </div>`;
    }

    const photoUrl = item.photo ? resolvePhoto(item.photo) : '';
    const sym = getCurrencySymbol();

    // meta lines — only show if has value, otherwise show icon button
    const metaLines = [
      { key: 'price', svg: PRICE_SVG, format: v => `${sym} ${v}` },
      { key: 'addr',  svg: MAP_SVG,   format: v => v, link: v => `https://maps.google.com/?q=${encodeURIComponent(v)}` },
      { key: 'link',  svg: LINK_SVG,  format: () => '查看商品連結', link: v => v },
      { key: 'note',  svg: NOTE_SVG,  format: v => v },
    ];

    const metaContent = metaLines.map(f => {
      const val = item[f.key] || '';
      if (!val) return '';
      const href = f.link ? f.link(val) : null;
      const text = f.format(val);
      return `
        <div class="shop-info-line" onclick="${href ? `window.open('${href}','_blank')` : `expandShopField(${i},'${f.key}')`}">
          <span class="shop-info-icon">${f.svg}</span>
          <span class="shop-info-text ${href ? 'shop-info-link' : ''}">${esc(text)}</span>
          <button class="shop-info-clear" onclick="event.stopPropagation();clearShopField(${i},'${f.key}')">×</button>
        </div>`;
    }).join('');

    const iconBtns = metaLines
      .filter(f => !(item[f.key] || ''))
      .map(f => `<button class="shop-meta-icon-btn" onclick="expandShopField(${i},'${f.key}')">${f.svg}</button>`)
      .join('');

    return `
      <div class="shop-card">
        <div class="shop-card-body">
          <label class="shop-img-col ${photoUrl ? '' : 'shop-img-empty'}">
            ${photoUrl
              ? `<img class="shop-img" src="${photoUrl}"><button class="shop-img-del" onclick="event.preventDefault();event.stopPropagation();deleteShopPhoto(${i})">×</button>`
              : `<svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h320v80H200v560h560v-320h80v320q0 33-23.5 56.5T760-120H200Zm40-160h480L570-480 450-320l-90-120-120 160Zm440-320v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z"/></svg>`}
            <input type="file" accept="image/*" style="display:none" onchange="handleShopPhoto(this,${i})">
          </label>
          <div class="shop-card-right">
            <div class="shop-card-top-row">
              <input class="shop-name-input" placeholder="品項名稱"
                value="${esc(item.name || '')}"
                onblur="saveShopField(${i},'name',this.value)">
              <button class="shop-del-btn" onclick="deleteShopItem(${i})">${MINUS_SVG}</button>
            </div>
            <div class="shop-qty-row">
              <button class="shop-qty-btn" onclick="changeShopQty(${i},-1)">−</button>
              <span class="shop-qty">${item.qty || 1}</span>
              <button class="shop-qty-btn" onclick="changeShopQty(${i},1)">＋</button>
            </div>
            <div class="shop-info-lines">${metaContent}</div>
            <div class="shop-card-footer">
              <div class="shop-icon-btns">${iconBtns}</div>
              <button class="shop-buy-btn" onclick="toggleShop(${i})">已買</button>
            </div>
          </div>
        </div>
      </div>`;
  }).join('');
}

let _shopFieldTarget = null; // { i, key }

function expandShopField(i, key) {
  const labels = { price: '價格', link: '網頁連結', addr: '店舖地址', note: '備注' };
  const placeholders = { price: '例：¥ 2,800', link: 'https://…', addr: '例：大阪市中央区心斎橋', note: '自由備注…' };
  _shopFieldTarget = { i, key };
  document.getElementById('shop-field-title').textContent = labels[key] || key;
  const inp = document.getElementById('shop-field-input');
  inp.placeholder = placeholders[key] || '';
  inp.value = data.shopping[i][key] || '';
  inp.type = key === 'price' ? 'text' : 'text';
  document.getElementById('modal-shop-field').classList.add('open');
  setTimeout(() => inp.focus(), 340);
}

function saveShopFieldFromModal() {
  if (!_shopFieldTarget) return;
  const { i, key } = _shopFieldTarget;
  const val = document.getElementById('shop-field-input').value.trim();
  data.shopping[i][key] = val;
  _shopFieldTarget = null;
  save();
  closeModal('modal-shop-field');
  renderShopItems();
}

function collapseShopField(i) {
  delete data.shopping[i]._expand;
  renderShopItems();
}

function clearShopField(i, key) {
  data.shopping[i][key] = '';
  save(); renderShopItems();
}

function addShopItem() {
  if (!data.shopping) data.shopping = [];
  data.shopping.push({ name: '', qty: 1, photo: '', price: '', link: '', addr: '', note: '', done: false });
  save(); renderShopItems();
  setTimeout(() => {
    const inputs = document.querySelectorAll('.shop-name-input');
    if (inputs.length) inputs[inputs.length - 1].focus();
  }, 50);
}

function saveShopField(i, field, val) {
  if (!data.shopping[i]) return;
  data.shopping[i][field] = val;
  save();
}

function changeShopQty(i, delta) {
  if (!data.shopping[i]) return;
  data.shopping[i].qty = Math.max(1, (data.shopping[i].qty || 1) + delta);
  save(); renderShopItems();
}

function handleShopPhoto(input, i) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const key = `blob-key:${Date.now()}|${file.name}`;
    _blobCache.set(key, e.target.result);
    data.shopping[i].photo = key;
    save(); renderShopItems();
  };
  reader.readAsDataURL(file);
}

function deleteShopPhoto(i) {
  data.shopping[i].photo = '';
  save(); renderShopItems();
}

function toggleShop(i) {
  if (!data.shopping[i]) return;
  data.shopping[i].done = !data.shopping[i].done;
  save(); renderShopItems();
}

function deleteShopItem(i) {
  data.shopping.splice(i, 1);
  save(); renderShopItems();
}

/* ─── Tickets ─── */
function ticketDefaults() {
  return { id: Date.now(), name: '票券名稱', date: '', note: '', photo: '' };
}

function addTicketCard() {
  if (!data.tickets) data.tickets = [];
  data.tickets.push(ticketDefaults());
  save(); renderTicketCards();
}

function deleteTicketCard(id) {
  data.tickets = data.tickets.filter(t => t.id !== id);
  save(); renderTicketCards();
}

function saveTicketField(id, field, val) {
  const t = data.tickets.find(t => t.id === id);
  if (t) { t[field] = val; save(); }
}

function handleTicketPhoto(input, id) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const key = `blob-key:${Date.now()}|${file.name}`;
    _blobCache.set(key, e.target.result);
    const t = data.tickets.find(t => t.id === id);
    if (t) { t.photo = key; save(); renderTicketCards(); }
  };
  reader.readAsDataURL(file);
}

function addTicketFromPhoto(input) {
  const files = [...input.files];
  if (!data.tickets) data.tickets = [];
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const key = `blob-key:${Date.now()}-${Math.random().toString(36).slice(2)}|${file.name}`;
      _blobCache.set(key, e.target.result);
      data.tickets.push({ id: Date.now() + Math.random(), photo: key });
      save();
      renderTicketCards();
    };
    reader.readAsDataURL(file);
  });
  input.value = '';
}

function renderTicketCards() {
  const cards = data.tickets || [];
  document.getElementById('ticket-cards').innerHTML = cards.length
    ? cards.map(t => {
        const photoUrl = t.photo ? resolvePhoto(t.photo) : '';
        return `
        <div class="ticket-card">
          <div class="ticket-img-wrap">
            <img class="ticket-img" src="${photoUrl}" alt="票券">
            <button class="ticket-img-del" onclick="deleteTicketCard(${t.id})">
              <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
            </button>
          </div>
        </div>`;
      }).join('')
    : `<div class="list-empty">點右上角 ＋ 新增票券圖片</div>`;
}

function deleteTicketPhoto(id) {
  const t = data.tickets.find(t => t.id === id);
  if (t) { t.photo = ''; save(); renderTicketCards(); }
}

/* ─── Notes ─── */
function renderNotes() {
  document.getElementById('notes-content').value = data.notes || '';
}

function saveNotes() {
  data.notes = document.getElementById('notes-content').value;
  save();
}



/* ─── Flights ─── */
function flightDefaults() {
  return {
    id: Date.now(),
    airline: 'CI 838',
    fromCode: 'TPE', fromTime: '09:30', fromDate: '2025/03/15',
    toCode: 'KIX',   toTime: '13:25',   toDate: '2025/03/15',
    duration: '2h 55m', cls: 'Economy', seat: '32A', terminal: 'T2'
  };
}

function addFlightCard()      { data.flights.push(flightDefaults()); save(); renderFlightCards(); }
function deleteFlightCard(id) { data.flights = data.flights.filter(f => f.id !== id); save(); renderFlightCards(); }
function saveFlightField(id, field, val) {
  const f = data.flights.find(f => f.id === id);
  if (f) { f[field] = val; save(); }
}

function renderFlightCards() {
  document.getElementById('flight-cards').innerHTML = data.flights.map(f => `
    <div class="flight-card">
      <div class="flight-card-header">
        <div class="flight-airline">
          <input class="editable editable-muted" style="font-size:11px;letter-spacing:0.14em;width:90px"
            value="${esc(f.airline)}" onblur="saveFlightField(${f.id},'airline',this.value)">
        </div>
        <button class="flight-del-btn" onclick="deleteFlightCard(${f.id})">× 刪除</button>
      </div>
      <div class="flight-route">
        <div class="flight-city">
          <div class="flight-time">
            <input class="editable editable-dark" style="font-size:34px;font-weight:700;letter-spacing:-1px;width:90px;text-align:center"
              value="${esc(f.fromTime)}" onblur="saveFlightField(${f.id},'fromTime',this.value)">
          </div>
          <div class="flight-code">
            <input class="editable editable-muted" style="font-size:13px;letter-spacing:0.08em;width:50px;text-align:center;text-transform:uppercase"
              value="${esc(f.fromCode)}" onblur="saveFlightField(${f.id},'fromCode',this.value)">
          </div>
          <div class="flight-date-small">
            <input class="editable editable-muted" style="font-size:11px;width:84px;text-align:center"
              value="${esc(f.fromDate)}" onblur="saveFlightField(${f.id},'fromDate',this.value)">
          </div>
        </div>
        <div class="flight-mid">
          <div class="flight-duration">
            <input class="editable editable-muted" style="font-size:11px;width:60px;text-align:center"
              value="${esc(f.duration)}" onblur="saveFlightField(${f.id},'duration',this.value)">
          </div>
          <div class="flight-line-wrap">
            <div class="flight-line-dot"></div>
            <div class="flight-line"></div>
            <div class="flight-plane">✈</div>
            <div class="flight-line"></div>
            <div class="flight-line-dot"></div>
          </div>
        </div>
        <div class="flight-city">
          <div class="flight-time">
            <input class="editable editable-dark" style="font-size:34px;font-weight:700;letter-spacing:-1px;width:90px;text-align:center"
              value="${esc(f.toTime)}" onblur="saveFlightField(${f.id},'toTime',this.value)">
          </div>
          <div class="flight-code">
            <input class="editable editable-muted" style="font-size:13px;letter-spacing:0.08em;width:50px;text-align:center;text-transform:uppercase"
              value="${esc(f.toCode)}" onblur="saveFlightField(${f.id},'toCode',this.value)">
          </div>
          <div class="flight-date-small">
            <input class="editable editable-muted" style="font-size:11px;width:84px;text-align:center"
              value="${esc(f.toDate)}" onblur="saveFlightField(${f.id},'toDate',this.value)">
          </div>
        </div>
      </div>
      <div class="flight-details">
        <div class="flight-detail-item">
          <div class="flight-detail-label">艙等</div>
          <div class="flight-detail-val">
            <input class="editable editable-dark" style="font-size:13px;font-weight:600;width:72px"
              value="${esc(f.cls)}" onblur="saveFlightField(${f.id},'cls',this.value)">
          </div>
        </div>
        <div class="flight-detail-item">
          <div class="flight-detail-label">座位</div>
          <div class="flight-detail-val">
            <input class="editable editable-dark" style="font-size:13px;font-weight:600;width:40px"
              value="${esc(f.seat)}" onblur="saveFlightField(${f.id},'seat',this.value)">
          </div>
        </div>
        <div class="flight-detail-item">
          <div class="flight-detail-label">航廈</div>
          <div class="flight-detail-val">
            <input class="editable editable-dark" style="font-size:13px;font-weight:600;width:32px"
              value="${esc(f.terminal)}" onblur="saveFlightField(${f.id},'terminal',this.value)">
          </div>
        </div>
      </div>
    </div>`).join('');
}

/* ─── Hotels ─── */
/* ─── Hotel Data Model ─── */
function hotelDefaults() {
  return {
    id: Date.now(),
    name: '', addr: '', checkin: '', checkout: '',
    nights: 0, ref: '', breakfast: false, price: ''
  };
}

/* ─── Hotel Bottom Sheet ─── */
let _hotelEditId = null;
let _sheetBreakfast = false;

function openHotelSheet(editId) {
  _hotelEditId = editId || null;
  _sheetBreakfast = false;
  // clear fields
  ['hf-name','hf-checkin','hf-checkout','hf-addr','hf-ref','hf-price'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  if (editId) {
    const h = data.hotels.find(h => h.id === editId);
    if (h) {
      document.getElementById('hf-name').value     = h.name    || '';
      document.getElementById('hf-checkin').value  = h.checkin || '';
      document.getElementById('hf-checkout').value = h.checkout|| '';
      document.getElementById('hf-addr').value     = h.addr    || '';
      document.getElementById('hf-ref').value      = h.ref     || '';
      document.getElementById('hf-price').value    = h.price   || '';
      _sheetBreakfast = h.breakfast || false;
    }
  }
  const tog = document.getElementById('hf-breakfast-toggle');
  const lbl = document.getElementById('hf-breakfast-label');
  if (tog) tog.classList.toggle('on', _sheetBreakfast);
  if (lbl) lbl.textContent = _sheetBreakfast ? '含早餐' : '不含';
  document.getElementById('hotel-sheet-save-btn').textContent = editId ? '更新' : '儲存';
  updateHotelPreview();
  document.getElementById('modal-hotel-sheet').classList.add('open');
  setTimeout(() => document.getElementById('hf-name').focus(), 340);
}

function toggleSheetBreakfast() {
  _sheetBreakfast = !_sheetBreakfast;
  const tog = document.getElementById('hf-breakfast-toggle');
  const lbl = document.getElementById('hf-breakfast-label');
  if (tog) tog.classList.toggle('on', _sheetBreakfast);
  if (lbl) lbl.textContent = _sheetBreakfast ? '含早餐' : '不含';
  updateHotelPreview();
}

function fmtHotelDate(el) {
  let v = el.value.replace(/\D/g, '').slice(0, 4);
  if (v.length > 2) v = v.slice(0,2) + '/' + v.slice(2);
  el.value = v;
}

function fmtHotelPrice(el) {
  const raw = el.value.replace(/[^0-9]/g, '');
  if (raw) el.value = parseInt(raw).toLocaleString();
  else el.value = '';
}

function calcNights(checkin, checkout) {
  const parse = s => {
    const m = String(s||'').match(/(\d{1,2})\/(\d{1,2})/);
    if (!m) return null;
    return new Date(new Date().getFullYear(), parseInt(m[1])-1, parseInt(m[2]));
  };
  const a = parse(checkin), b = parse(checkout);
  if (!a || !b) return 0;
  const diff = Math.round((b - a) / 86400000);
  return diff > 0 ? diff : 0;
}

function hotelDateWithDay(str) {
  const m = String(str||'').match(/(\d{1,2})\/(\d{1,2})/);
  if (!m) return str || '';
  const dt = new Date(new Date().getFullYear(), parseInt(m[1])-1, parseInt(m[2]));
  const wd = ['日','一','二','三','四','五','六'][dt.getDay()];
  return `${m[1]}/${m[2]}（${wd}）`;
}

function updateHotelPreview() {
  const name     = document.getElementById('hf-name')?.value || '';
  const checkin  = document.getElementById('hf-checkin')?.value || '';
  const checkout = document.getElementById('hf-checkout')?.value || '';
  const addr     = document.getElementById('hf-addr')?.value || '';
  const ref      = document.getElementById('hf-ref')?.value || '';
  const price    = document.getElementById('hf-price')?.value || '';
  const nights   = calcNights(checkin, checkout);
  const sym      = getCurrencySymbol();

  const datesEl  = document.getElementById('hp-dates');
  const nightsEl = document.getElementById('hp-nights');
  const nameEl   = document.getElementById('hp-name');
  const subEl    = document.getElementById('hp-sub');
  const metaEl   = document.getElementById('hp-meta');
  if (!datesEl) return;

  const ci = hotelDateWithDay(checkin);
  const co = hotelDateWithDay(checkout);
  datesEl.textContent  = (checkin || checkout) ? `${ci} → ${co}` : 'MM/DD — MM/DD';
  nightsEl.textContent = nights > 0 ? `${nights} 晚` : '';
  nameEl.textContent   = name || '飯店名稱';
  subEl.textContent    = addr || '';

  let meta = [];
  if (_sheetBreakfast) meta.push('含早餐');
  if (ref)   meta.push(`訂房編號 ${ref}`);
  if (price) meta.push(`${sym} ${price}`);
  metaEl.innerHTML = meta.map(m => `<span class="hp-meta-tag">${esc(m)}</span>`).join('');
}

function saveHotelSheet() {
  const name     = document.getElementById('hf-name').value.trim();
  const checkin  = document.getElementById('hf-checkin').value.trim();
  const checkout = document.getElementById('hf-checkout').value.trim();
  const addr     = document.getElementById('hf-addr').value.trim();
  const ref      = document.getElementById('hf-ref').value.trim();
  const price    = document.getElementById('hf-price').value.replace(/[^0-9]/g,'');
  const nights   = calcNights(checkin, checkout);

  if (_hotelEditId) {
    const h = data.hotels.find(h => h.id === _hotelEditId);
    if (h) Object.assign(h, { name, checkin, checkout, addr, ref, price, nights, breakfast: _sheetBreakfast });
  } else {
    data.hotels.push({ id: Date.now(), name, checkin, checkout, addr, ref, price, nights, breakfast: _sheetBreakfast });
  }
  save();
  closeModal('modal-hotel-sheet');
  renderHotelCards();
}

function deleteHotelCard(id) {
  data.hotels = data.hotels.filter(h => h.id !== id);
  save(); renderHotelCards();
}

function renderHotelCards() {
  const sym = getCurrencySymbol();
  const el  = document.getElementById('hotel-cards');
  if (!data.hotels.length) {
    el.innerHTML = `<div class="list-empty">點右上角 ＋ 新增住宿</div>`;
    return;
  }
  el.innerHTML = data.hotels.map(h => {
    const ci = hotelDateWithDay(h.checkin);
    const co = hotelDateWithDay(h.checkout);
    const nights = h.nights || calcNights(h.checkin, h.checkout);
    const priceDisplay = h.price ? `${sym} ${parseInt(h.price).toLocaleString()}` : '';

    return `
    <div class="hotel-card" onclick="openHotelSheet(${h.id})">
      <div class="hotel-card-header2">
        <div class="hotel-dates-large2">${ci ? `${ci} → ${co}` : '日期未設定'}</div>
        <div class="hotel-nights-pill">${nights > 0 ? `${nights} 晚` : ''}</div>
      </div>
      <div class="hotel-name2">${esc(h.name || '未命名')}</div>
      ${h.addr ? `<div class="hotel-addr2">📍 ${esc(h.addr)}</div>` : ''}
      <div class="hotel-meta2">
        ${h.breakfast ? `<span class="hotel-meta2-tag breakfast">含早餐</span>` : ''}
        ${h.ref ? `<span class="hotel-meta2-tag">訂房 ${esc(h.ref)}</span>` : ''}
      </div>
      ${priceDisplay ? `<div class="hotel-price2">
        <span class="hotel-price2-label">總價</span>
        <span class="hotel-price2-val">${priceDisplay}</span>
        <button class="hotel-del-fab" onclick="event.stopPropagation();deleteHotelCard(${h.id})">${DEL_SVG}</button>
      </div>` : `<div style="text-align:right;padding-top:8px">
        <button class="hotel-del-fab" onclick="event.stopPropagation();deleteHotelCard(${h.id})">${DEL_SVG}</button>
      </div>`}
    </div>`;
  }).join('');
}


/* ═══════════════════════════════════════
   MODAL HELPERS
═══════════════════════════════════════ */
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

document.querySelectorAll('.modal-overlay').forEach(o => {
  o.addEventListener('click', e => {
    if (e.target === o) o.classList.remove('open');
  });
});

/* ═══════════════════════════════════════
   SETTINGS
═══════════════════════════════════════ */
const CURRENCIES = [
  { code: 'TWD', symbol: 'NT$', label: '新台幣' },
  { code: 'JPY', symbol: '¥',   label: '日圓'   },
  { code: 'CNY', symbol: 'CN¥', label: '人民幣' },
  { code: 'USD', symbol: '$',   label: '美金'   },
];

function renderSettings() {
  const s = data.settings;
  document.getElementById('set-trip-name').value = s.tripName || '';

  // currency grid
  const grid = document.getElementById('currency-grid');
  grid.innerHTML = CURRENCIES.map(c => `
    <button class="currency-btn${s.currency === c.code ? ' active' : ''}"
      onclick="setCurrency('${c.code}')">
      <span class="currency-symbol">${c.symbol}</span>
      <span class="currency-label">${c.label}</span>
    </button>`).join('');

  // theme
  document.getElementById('theme-light').classList.toggle('active', s.theme !== 'dark');
  document.getElementById('theme-dark').classList.toggle('active',  s.theme === 'dark');
  applyTheme(s.theme);
}

function saveSettings() {
  data.settings.tripName = document.getElementById('set-trip-name').value.trim();
  save();
  renderBanner();
}

function setCurrency(code) {
  data.settings.currency = code;
  save();
  renderSettings();
  renderExpenseList();
}

function setTheme(mode) {
  data.settings.theme = mode;
  save();
  applyTheme(mode);
  renderSettings();
}

function applyTheme(mode) {
  document.documentElement.setAttribute('data-theme', mode);
}

function getCurrencySymbol() {
  const c = CURRENCIES.find(c => c.code === (data.settings?.currency || 'TWD'));
  return c ? c.symbol : 'NT$';
}

function exportJSON() {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `travel-journal-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('已匯出 JSON');
}

function importJSON(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      if (!imported.days) throw new Error('格式錯誤');
      showConfirm('匯入資料', '現有資料將被覆蓋，確定繼續？', () => {
        data = imported;
        if (!data.settings) data.settings = { tripName: '', budget: 0, currency: 'TWD', theme: 'light' };
        save();
        renderItinerary();
        renderExpense();
        renderSettings();
        showToast('匯入成功');
      });
    } catch {
      showToast('檔案格式錯誤');
    }
  };
  reader.readAsText(file);
  input.value = '';
}

function clearAllData() {
  showConfirm('清除所有資料', '所有行程、帳單、資訊將永久刪除。', () => {
    data = {
      days: [{ banner: { date: '', subtitle: '', photos: [] }, events: [] }],
      expenses: [[]],
      flights: [],
      hotels: [],
      settings: { tripName: '', budget: 0, currency: 'TWD', theme: 'light' }
    };
    currentDay  = 0;
    expenseDay  = 0;
    save();
    renderItinerary();
    renderExpense();
    renderSettings();
    switchTab('itinerary');
    showToast('已清除所有資料');
  });
}


load();
applyTheme(data.settings?.theme || 'light');
renderItinerary();
renderExpense();
