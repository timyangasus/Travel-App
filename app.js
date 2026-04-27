/* ═══════════════════════════════════════
   旅遊誌 — Application Logic
   app.js
═══════════════════════════════════════ */

/* ─── SVG Icon Strings ─── */
const EDIT_SVG  = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>`;
const DEL_SVG   = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;
const MINUS_SVG = `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93ZM280-440h400v-80H280v80Z"/></svg>`;

const EXPENSE_CATS = [
  { label: "餐飲", color: "#C99A6A", svg: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#C99A6A"><path d="M240-80v-366q-54-14-87-57t-33-97v-280h80v240h40v-240h80v240h40v-240h80v280q0 54-33 97t-87 57v366h-80Zm400 0v-381q-54-18-87-75.5T520-667q0-89 47-151t113-62q66 0 113 62.5T840-666q0 73-33 130t-87 75v381h-80Z"/></svg>` },
  { label: "交通", color: "#74ADB1", svg: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#74ADB1"><path d="M160-340v-380q0-53 27.5-84.5t72.5-48q45-16.5 102.5-22T480-880q66 0 124.5 5.5t102 22q43.5 16.5 68.5 48t25 84.5v380q0 59-40.5 99.5T660-200l60 60v20h-80l-80-80H400l-80 80h-80v-20l60-60q-59 0-99.5-40.5T160-340Zm320-460q-106 0-155 12.5T258-760h448q-15-17-64.5-28.5T480-800ZM240-560h200v-120H240v120Zm420 80H240h480-60Zm-140-80h200v-120H520v120ZM383-337q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm280 0q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm-363 57h360q26 0 43-17t17-43v-140H240v140q0 26 17 43t43 17Zm180-480h226-448 222Z"/></svg>` },
  { label: "購物", color: "#B77976", svg: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#B77976"><path d="m240-522-40 22q-14 8-30 4t-24-18L66-654q-8-14-4-30t18-24l230-132h70q9 0 14.5 5.5T400-820v20q0 33 23.5 56.5T480-720q33 0 56.5-23.5T560-800v-20q0-9 5.5-14.5T580-840h70l230 132q14 8 18 24t-4 30l-80 140q-8 14-23.5 17.5T760-501l-40-20v361q0 17-11.5 28.5T680-120H280q-17 0-28.5-11.5T240-160v-362Zm80-134v456h320v-456l124 68 42-70-172-100q-15 51-56.5 84.5T480-640q-56 0-97.5-33.5T326-758L154-658l42 70 124-68Zm160 177Z"/></svg>` },
  { label: "住宿", color: "#72A275", svg: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#72A275"><path d="M40-200v-600h80v400h320v-320h320q66 0 113 47t47 113v360h-80v-120H120v120H40Zm155-275q-35-35-35-85t35-85q35-35 85-35t85 35q35 35 35 85t-35 85q-35 35-85 35t-85-35Zm325 75h320v-160q0-33-23.5-56.5T760-640H520v240ZM308.5-531.5Q320-543 320-560t-11.5-28.5Q297-600 280-600t-28.5 11.5Q240-577 240-560t11.5 28.5Q263-520 280-520t28.5-11.5ZM280-560Zm240-80v240-240Z"/></svg>` },
  { label: "票券", color: "#6B9BCE", svg: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#6B9BCE"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm0-160q17 0 28.5-11.5T520-480q0-17-11.5-28.5T480-520q-17 0-28.5 11.5T440-480q0 17 11.5 28.5T480-440Zm0-160q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm320 440H160q-33 0-56.5-23.5T80-240v-160q33 0 56.5-23.5T160-480q0-33-23.5-56.5T80-560v-160q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v160q-33 0-56.5 23.5T800-480q0 33 23.5 56.5T880-400v160q0 33-23.5 56.5T800-160Zm0-80v-102q-37-22-58.5-58.5T720-480q0-43 21.5-79.5T800-618v-102H160v102q37 22 58.5 58.5T240-480q0 43-21.5 79.5T160-342v102h640ZM480-480Z"/></svg>` },
  { label: "其他", color: "#A1A75E", svg: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#A1A75E"><path d="M880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720Zm-720 80h640v-80H160v80Zm0 160v240h640v-240H160Zm0 240v-480 480Z"/></svg>` },
];


/* ═══════════════════════════════════════
   DATA LAYER
═══════════════════════════════════════ */
const IMGBB_API_KEY = 'cfd268943c3eb02881f5526f3ddf3431';

async function uploadToImgBB(file) {
  const form = new FormData();
  form.append('image', file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    method: 'POST', body: form
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error?.message || 'Upload failed');
  return json.data.url;
}

function showUploadStatus(msg) {
  let el = document.getElementById('_upload-status');
  if (!el) {
    el = document.createElement('div');
    el.id = '_upload-status';
    el.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.78);color:#fff;padding:8px 20px;border-radius:20px;font-size:13px;z-index:9999;pointer-events:none;transition:opacity 0.3s';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.opacity = msg ? '1' : '0';
}

/* ═══════════════════════════════════════
   MULTI-TRIP DATA LAYER
═══════════════════════════════════════ */
const META_KEY    = 'travel_trace_meta';
const OLD_KEY     = 'travel_journal_v4';
const TRIP_PREFIX = 'travel_trace_trip_';

/* meta: { trips: [ { id, name, startDate, endDate, currency, coverImg } ] } */
let meta = { trips: [] };

/* currently active trip data (same shape as before) */
let data = null;
let currentTripId = null;
let currentDay = 0;
let editingEventId = null;
let _slideshowTimer = null;
const _blobCache = new Map();

function genId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

/* ─── Load meta list ─── */
function loadMeta() {
  try {
    const s = localStorage.getItem(META_KEY);
    if (s) meta = JSON.parse(s);
    if (!meta.trips) meta.trips = [];
  } catch(e) { meta = { trips: [] }; }

  // migrate old single trip
  migrateOldTrip();
}

function saveMeta() {
  try { localStorage.setItem(META_KEY, JSON.stringify(meta)); } catch(e) {}
}

function migrateOldTrip() {
  const old = localStorage.getItem(OLD_KEY);
  if (!old) return;
  // already migrated?
  const alreadyMigrated = meta.trips.some(t => t.id === 'migrated_v4');
  if (alreadyMigrated) return;
  try {
    const oldData = JSON.parse(old);
    const id = 'migrated_v4';
    const tripName = oldData.settings?.tripName || 'USJ大阪の旅';
    const tripDates = oldData.settings?.tripDates || '';
    const { startDate, endDate } = parseTripDates(tripDates);
    const coverImg = oldData.days?.[0]?.banner?.photos?.[0] || '';
    // push to meta
    meta.trips.unshift({
      id, name: tripName,
      startDate, endDate,
      currency: oldData.settings?.currency || 'TWD',
      coverImg
    });
    saveMeta();
    // save trip data under new key
    localStorage.setItem(TRIP_PREFIX + id, old);
  } catch(e) {}
}

/* ─── Load a specific trip ─── */
function loadTrip(id) {
  currentTripId = id;
  currentDay    = 0;
  try {
    const s = localStorage.getItem(TRIP_PREFIX + id);
    if (s) {
      data = JSON.parse(s);
    } else {
      data = freshTripData();
    }
    // Ensure all fields exist
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
  } catch(e) {
    data = freshTripData();
  }
}

function freshTripData() {
  return {
    days: [{ banner: { date: '', subtitle: '', photos: [] }, events: [] }],
    expenses: [[]],
    flights: [], hotels: [], tickets: [], checklist: [], shopping: [],
    notes: '',
    settings: { tripName: '', budget: 0, currency: 'TWD', theme: 'light' }
  };
}

function save() {
  if (!currentTripId) return;
  try { localStorage.setItem(TRIP_PREFIX + currentTripId, JSON.stringify(data)); } catch(e) {}
  // sync meta from current trip settings
  const trip = meta.trips.find(t => t.id === currentTripId);
  if (trip) {
    const firstPhoto = data.days?.[0]?.banner?.photos?.[0] || '';
    if (firstPhoto) trip.coverImg = firstPhoto;
    if (data.settings?.tripName) trip.name = data.settings.tripName;
    if (data.settings?.tripDates) {
      const { startDate, endDate } = _parseTripSheetDates(data.settings.tripDates);
      if (startDate) trip.startDate = _cleanDate(startDate);
      if (endDate)   trip.endDate   = _cleanDate(endDate);
    }
    if (data.settings?.currency) trip.currency = data.settings.currency;
  }
  saveMeta();
}

// legacy shim for old load() call at bottom of file
function load() { /* no-op: replaced by loadMeta()+loadTrip() */ }

/* ─── Parse "MM/DD-MM/DD" or "YYYY/MM/DD-YYYY/MM/DD" from settings ─── */
function parseTripDates(str) {
  if (!str) return { startDate: '', endDate: '' };
  const parts = str.split('-');
  return { startDate: parts[0]?.trim() || '', endDate: parts[1]?.trim() || '' };
}

/* ─── Date for Home list display: "MM/DD–MM/DD" ─── */
function tripDateDisplay(trip) {
  let s = trip.startDate || '';
  let e = trip.endDate || '';

  const mmdd = d => {
    if (!d) return '';
    d = d.replace(/[（(][^）)]*[）)]/g, '').trim();
    const m4 = d.match(/\d{4}\/(\d{2})\/(\d{2})/);
    if (m4) return m4[1] + '/' + m4[2];
    const m2 = d.match(/(\d{2})\/(\d{2})/);
    if (m2) return m2[1] + '/' + m2[2];
    return '';
  };

  // If missing endDate, try to get from trip data
  if (s && !e) {
    try {
      const raw = localStorage.getItem(TRIP_PREFIX + trip.id);
      if (raw) {
        const td = JSON.parse(raw);
        const tripDates = td.settings?.tripDates || '';
        if (tripDates) {
          const parts = tripDates.split('–');
          if (parts[1]) e = parts[1].trim();
        }
        if (!e) {
          const dLast = td.days?.[td.days.length - 1]?.banner?.date || '';
          if (dLast) e = dLast;
        }
      }
    } catch(err) {}
  }

  if (s || e) {
    const ms = mmdd(s), me = mmdd(e);
    if (ms && me && ms !== me) return ms + '–' + me;
    return ms || me;
  }

  // Full fallback
  try {
    const raw = localStorage.getItem(TRIP_PREFIX + trip.id);
    if (raw) {
      const td = JSON.parse(raw);
      const tripDates = td.settings?.tripDates || '';
      if (tripDates) {
        const parts = tripDates.split('–');
        return parts.map(p => mmdd(p.trim())).filter(Boolean).join('–');
      }
      const d0 = td.days?.[0]?.banner?.date || '';
      const dLast = td.days?.[td.days.length - 1]?.banner?.date || '';
      const fmt = d => { const m = d.match(/\d{4}\/(\d{2})\/(\d{2})/); return m ? m[1] + '/' + m[2] : ''; };
      if (d0) return fmt(d0) + (dLast && dLast !== d0 ? '–' + fmt(dLast) : '');
    }
  } catch(err) {}
  return '';
}


/* ─── Extract year from trip for year-tab grouping ─── */

/* ─── Extract year from date string ─── */
function tripYear(trip) {
  const d = trip.startDate || trip.endDate || '';
  // Match 4-digit year
  const m = d.match(/(\d{4})/);
  if (m) return parseInt(m[1]);
  // Fallback: check if trip has stored tripDates with banner dates (migrated data)
  // Try to read from trip data
  try {
    const raw = localStorage.getItem(TRIP_PREFIX + trip.id);
    if (raw) {
      const td = JSON.parse(raw);
      // check banner date of day 0 for year
      const bannerDate = td.days?.[0]?.banner?.date || '';
      const bm = bannerDate.match(/(\d{4})/);
      if (bm) return parseInt(bm[1]);
    }
  } catch(e) {}
  return new Date().getFullYear();
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
  document.querySelectorAll('.page').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab-item').forEach(b => b.classList.remove('active'));
  document.getElementById('screen-' + tab).classList.add('active');
  document.getElementById('tab-' + tab).classList.add('active');
  // Hide tab bar on Home, show on all other screens
  const tabBar = document.querySelector('.tab-bar');
  if (tabBar) tabBar.style.display = tab === 'home' ? 'none' : '';
  if (tab === 'home')     renderHome();
  if (tab === 'expense')  renderExpense();
  if (tab === 'info')     renderInfo();
  if (tab === 'settings') renderSettings();
}

/* ═══════════════════════════════════════
   HOME SYNC: pull meta from each trip's settings
═══════════════════════════════════════ */
function syncMetaFromTrips() {
  let changed = false;
  (meta.trips || []).forEach(trip => {
    try {
      const raw = localStorage.getItem(TRIP_PREFIX + trip.id);
      if (!raw) return;
      const td = JSON.parse(raw);
      const s = td.settings || {};

      // Sync name
      if (s.tripName && s.tripName !== trip.name) {
        trip.name = s.tripName;
        changed = true;
      }

      // Sync dates from settings.tripDates (YYYY/MM/DD–MM/DD)
      if (s.tripDates) {
        const { startDate, endDate } = _parseTripSheetDates(s.tripDates);
        if (startDate && startDate !== trip.startDate) { trip.startDate = startDate; changed = true; }
        if (endDate   && endDate   !== trip.endDate)   { trip.endDate   = endDate;   changed = true; }
      }

      // Sync currency
      if (s.currency && s.currency !== trip.currency) {
        trip.currency = s.currency;
        changed = true;
      }

      // Sync cover from first day photo
      const firstPhoto = td.days?.[0]?.banner?.photos?.[0];
      if (firstPhoto && firstPhoto !== trip.coverImg) {
        trip.coverImg = firstPhoto;
        changed = true;
      }
    } catch(e) {}
  });

  if (changed) saveMeta();
  return changed;
}

/* ─── Pull-to-refresh ─── */
function initHomePullToRefresh() {
  const screen = document.getElementById('screen-home');
  const indicator = document.getElementById('home-pull-indicator');
  const icon = document.getElementById('home-pull-icon');
  if (!screen || !indicator) return;

  let startY = 0, pulling = false, triggered = false;
  const THRESHOLD = 70;

  screen.addEventListener('touchstart', e => {
    if (screen.scrollTop === 0) {
      startY = e.touches[0].clientY;
      pulling = true;
      triggered = false;
    }
  }, { passive: true });

  screen.addEventListener('touchmove', e => {
    if (!pulling) return;
    const dy = e.touches[0].clientY - startY;
    if (dy <= 0) { pulling = false; return; }
    const clamped = Math.min(dy, THRESHOLD * 1.5);
    indicator.style.height = Math.min(clamped * 0.6, 44) + 'px';
    indicator.style.opacity = Math.min(dy / THRESHOLD, 1);
    icon.style.transform = `rotate(${Math.min(dy / THRESHOLD, 1) * 360}deg)`;
    if (dy >= THRESHOLD && !triggered) triggered = true;
  }, { passive: true });

  screen.addEventListener('touchend', () => {
    if (!pulling) return;
    pulling = false;
    indicator.style.height = '0';
    indicator.style.opacity = '0.5';
    icon.style.transform = 'rotate(0deg)';
    if (triggered) {
      syncMetaFromTrips();
      renderHome();
      showToast('已同步更新');
    }
  });
}


let _homeYear = null; // currently selected year tab
let _tripSheetCurrency = 'TWD';

function renderHome() {
  // Init pull-to-refresh once
  if (!renderHome._ptr) { renderHome._ptr = true; initHomePullToRefresh(); }
  const trips = meta.trips || [];

  // Collect years that have trips
  const years = [...new Set(trips.map(tripYear))].sort((a, b) => a - b);
  const now = new Date().getFullYear();
  // Default to nearest future year, or last year if none future
  if (_homeYear === null || !years.includes(_homeYear)) {
    _homeYear = years.find(y => y >= now) || years[years.length - 1] || now;
  }

  // Render year tabs
  const yearTabsEl = document.getElementById('home-year-tabs');
  if (yearTabsEl) {
    yearTabsEl.innerHTML = years.map(y =>
      `<button class="home-year-tab${y === _homeYear ? ' active' : ''}" onclick="selectHomeYear(${y})">${y}</button>`
    ).join('');
  }

  // Render trip list for selected year
  renderHomeTripList();
}

function selectHomeYear(y) {
  _homeYear = y;
  renderHome();
}

function renderHomeTripList() {
  const el = document.getElementById('home-trip-list');
  if (!el) return;
  const trips = (meta.trips || [])
    .filter(t => tripYear(t) === _homeYear)
    .sort((a, b) => {
      const da = (a.startDate || '').replace(/[（(][^）)]*[）)]/g, '').trim();
      const db = (b.startDate || '').replace(/[（(][^）)]*[）)]/g, '').trim();
      return da.localeCompare(db);
    });

  if (!trips.length) {
    el.innerHTML = `<div class="home-empty">點右上角 ＋ 新增行程</div>`;
    return;
  }

  el.innerHTML = '<div class="home-trip-list-topline"></div>' + trips.map(trip => {
    const dateStr = tripDateDisplay(trip) || '';
    const hasImg = !!trip.coverImg;
    const coverBg = hasImg
      ? `background-image:url('${esc(trip.coverImg)}');background-size:cover;background-position:center`
      : `background:#C9A84C`;
    return `
      <div class="home-trip-swipe-wrap" data-id="${trip.id}">
        <div class="home-trip-delete-bg"><span>刪除</span></div>
        <div class="home-trip-row">
          <div class="home-trip-row-inner" onclick="openTrip('${trip.id}')">
            <div class="home-trip-cover" style="${coverBg}" onclick="event.stopPropagation();openTripCoverPicker('${trip.id}')"></div>
            <div class="home-trip-body">
              <div class="home-trip-date">${esc(dateStr)}</div>
              <div class="home-trip-name">${esc(trip.name || '未命名行程')}</div>
            </div>
          </div>
          <div class="home-trip-row-bottom-line"></div>
        </div>
      </div>`;
  }).join('');

  // Bind swipe-to-delete
  el.querySelectorAll('.home-trip-swipe-wrap').forEach(wrap => {
    let startX = 0, curX = 0, swiping = false;
    const row = wrap.querySelector('.home-trip-row');
    const THRESHOLD = 80;

    const onStart = e => {
      startX = (e.touches ? e.touches[0].clientX : e.clientX);
      swiping = true; curX = 0;
      row.style.transition = 'none';
    };
    const onMove = e => {
      if (!swiping) return;
      const dx = (e.touches ? e.touches[0].clientX : e.clientX) - startX;
      if (dx > 0) return; // only left swipe
      curX = dx;
      row.style.transform = `translateX(${Math.max(dx, -120)}px)`;
    };
    const onEnd = () => {
      if (!swiping) return;
      swiping = false;
      row.style.transition = 'transform 0.25s ease';
      if (curX < -THRESHOLD) {
        row.style.transform = 'translateX(-100px)';
        wrap.querySelector('.home-trip-delete-bg').style.opacity = '1';
        // confirm delete
        const id = wrap.dataset.id;
        const trip = meta.trips.find(t => t.id === id);
        showConfirm('刪除行程', `確定刪除「${trip?.name || '此行程'}」？此操作無法復原。`, () => {
          deleteTrip(id);
        }, () => {
          row.style.transform = 'translateX(0)';
          wrap.querySelector('.home-trip-delete-bg').style.opacity = '0';
        });
      } else {
        row.style.transform = 'translateX(0)';
      }
    };
    wrap.addEventListener('touchstart', onStart, { passive: true });
    wrap.addEventListener('touchmove', onMove, { passive: true });
    wrap.addEventListener('touchend', onEnd);
  });
}

function deleteTrip(id) {
  meta.trips = meta.trips.filter(t => t.id !== id);
  saveMeta();
  try { localStorage.removeItem(TRIP_PREFIX + id); } catch(e) {}
  if (currentTripId === id) { data = null; currentTripId = null; }
  renderHome();
}

function openTrip(id) {
  loadTrip(id);
  // sync currency from meta to data.settings
  const trip = meta.trips.find(t => t.id === id);
  if (trip && data.settings) {
    data.settings.currency = trip.currency || 'TWD';
    data.settings.tripName = trip.name || '';
  }
  // Auto-jump to today
  const today = new Date(); today.setHours(0,0,0,0);
  let matched = false;
  for (let i = 0; i < data.days.length; i++) {
    const d = parseBannerDate(data.days[i].banner.date);
    if (d) { d.setHours(0,0,0,0); if (d.getTime() === today.getTime()) { currentDay = i; matched = true; break; } }
  }
  if (!matched) currentDay = 0;

  renderItinerary();
  renderExpense();
  renderSettings();
  switchTab('itinerary');
}

/* ─── Trip Cover Picker ─── */
function openTripCoverPicker(id) {
  const inp = document.createElement('input');
  inp.type = 'file'; inp.accept = 'image/*';
  inp.onchange = async () => {
    const file = inp.files[0]; if (!file) return;
    showUploadStatus('上傳中...');
    try {
      const url = await uploadToImgBB(file);
      const trip = meta.trips.find(t => t.id === id);
      if (trip) { trip.coverImg = url; saveMeta(); }
      // also update trip data day 0 photos if this is current trip
      if (currentTripId === id && data) {
        if (!data.days[0].banner.photos) data.days[0].banner.photos = [];
        if (!data.days[0].banner.photos.includes(url)) data.days[0].banner.photos.unshift(url);
        save();
      }
      renderHome();
    } catch(err) { alert('上傳失敗：' + err.message); }
    finally { showUploadStatus(''); }
  };
  inp.click();
}

/* ─── Trip Sheet ─── */
let _tfCurrencyCode = 'TWD';

function openTripSheet() {
  _tfCurrencyCode = 'TWD';
  document.getElementById('tf-name').value = '';
  document.getElementById('tf-dates').value = '';
  document.getElementById('tf-currency-display').textContent = 'NT$ 新台幣';
  document.getElementById('modal-trip-sheet').classList.add('open');
  setTimeout(() => document.getElementById('tf-name').focus(), 340);
}

function openTripCurrencySheet() {
  document.getElementById('modal-trip-currency').classList.add('open');
}

function setTripCurrencySheet(code, symbol, label) {
  _tfCurrencyCode = code;
  document.getElementById('tf-currency-display').textContent = symbol + ' ' + label;
  closeModal('modal-trip-currency');
}

function setTripCurrency(code, symbol, label) {
  _tfCurrencyCode = code;
  document.getElementById('tf-currency-display').textContent = symbol + ' ' + label;
  document.getElementById('tf-currency-dropdown')?.classList.remove('open');
}

function fmtTripSheetDates(el) {
  // Format: YYYY/MM/DD–MM/DD
  // Input digits only, auto insert slashes and dash
  const raw = el.value;
  const digits = raw.replace(/\D/g, '').slice(0, 12);
  let result = '';
  if (digits.length <= 4) {
    result = digits; // YYYY
  } else if (digits.length <= 6) {
    result = digits.slice(0,4) + '/' + digits.slice(4); // YYYY/MM
  } else if (digits.length <= 8) {
    result = digits.slice(0,4) + '/' + digits.slice(4,6) + '/' + digits.slice(6); // YYYY/MM/DD
  } else if (digits.length <= 10) {
    result = digits.slice(0,4) + '/' + digits.slice(4,6) + '/' + digits.slice(6,8) + '–' + digits.slice(8); // YYYY/MM/DD–MM
  } else {
    result = digits.slice(0,4) + '/' + digits.slice(4,6) + '/' + digits.slice(6,8) + '–' + digits.slice(8,10) + '/' + digits.slice(10,12); // YYYY/MM/DD–MM/DD
  }
  el.value = result;
}

function _cleanDate(d) {
  if (!d) return '';
  d = d.replace(/[（(][^）)]*[）)]/g, '').trim();
  const m = d.match(/(\d{4}\/\d{2}\/\d{2})/);
  return m ? m[1] : d;
}

function _parseTripSheetDates(raw) {
  // Parse "YYYY/MM/DD–MM/DD" → { startDate, endDate, days }
  const parts = raw.split('–');
  const startStr = parts[0]?.trim() || '';
  const endStr   = parts[1]?.trim() || '';
  if (!startStr) return { startDate: '', endDate: '', days: 1 };

  // Parse start: YYYY/MM/DD
  const sm = startStr.match(/(\d{4})\/(\d{2})\/(\d{2})/);
  if (!sm) return { startDate: startStr, endDate: endStr, days: 1 };
  const startDate = new Date(parseInt(sm[1]), parseInt(sm[2])-1, parseInt(sm[3]));

  if (!endStr) return { startDate: startStr, endDate: '', days: 1 };

  // Parse end: MM/DD (same year)
  const em = endStr.match(/(\d{2})\/(\d{2})/);
  if (!em) return { startDate: startStr, endDate: endStr, days: 1 };
  const endDate = new Date(parseInt(sm[1]), parseInt(em[1])-1, parseInt(em[2]));

  // If end month < start month, assume next year
  if (endDate < startDate) endDate.setFullYear(endDate.getFullYear() + 1);

  const diffMs = endDate - startDate;
  const days = Math.max(1, Math.round(diffMs / 86400000) + 1);

  const fmt = d => `${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}`;
  return { startDate: fmt(startDate), endDate: fmt(endDate), days };
}

function saveTripSheet() {
  const name = document.getElementById('tf-name').value.trim();
  const datesRaw = document.getElementById('tf-dates').value.trim();
  if (!name) { document.getElementById('tf-name').focus(); return; }

  const { startDate, endDate, days } = _parseTripSheetDates(datesRaw);

  const id = genId();
  const newTrip = { id, name, startDate, endDate, currency: _tfCurrencyCode, coverImg: '' };
  meta.trips.push(newTrip);
  saveMeta();

  // Create trip data with correct number of days
  const tripData = freshTripData();
  tripData.settings.tripName  = name;
  tripData.settings.currency  = _tfCurrencyCode;
  tripData.settings.tripDates = datesRaw;

  // Generate day entries based on date range
  tripData.days = [];
  tripData.expenses = [];
  const start = startDate ? new Date(startDate.replace(/\//g, '-')) : null;
  for (let i = 0; i < days; i++) {
    let dateStr = '';
    if (start) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      const wd = ['日','一','二','三','四','五','六'][d.getDay()];
      dateStr = `${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}（${wd}）`;
    }
    tripData.days.push({ banner: { date: dateStr, subtitle: '', photos: [] }, events: [] });
    tripData.expenses.push([]);
  }

  localStorage.setItem(TRIP_PREFIX + id, JSON.stringify(tripData));
  closeModal('modal-trip-sheet');
  openTrip(id);
  showToast(`行程已建立，共 ${days} 天`);
}

/* ═══════════════════════════════════════
   INFO MODULES CUSTOMIZATION
═══════════════════════════════════════ */
const INFO_MODULE_DEFS = [
  { id: 'flight',   label: 'Flight ticket' },
  { id: 'hotel',    label: 'Hotel' },
  { id: 'shopping', label: 'Shopping list' },
  { id: 'ticket',   label: 'Tickets' },
  { id: 'checklist',label: 'Checklist' },
  { id: 'notes',    label: 'Notes' },
  { id: 'map',      label: 'Map' },
];

const DEFAULT_MODULES = ['flight','hotel','shopping','ticket','checklist','notes'];

function getInfoModules() {
  if (!data) return DEFAULT_MODULES;
  if (!data.settings.infoModules) data.settings.infoModules = [...DEFAULT_MODULES];
  return data.settings.infoModules;
}

function renderInfoGrid() {
  if (!data) return;
  const modules = getInfoModules();
  INFO_MODULE_DEFS.forEach(m => {
    const btn = document.getElementById('info-btn-' + m.id);
    if (btn) btn.style.display = modules.includes(m.id) ? '' : 'none';
  });
}

function openInfoCustomSheet() {
  const modules = getInfoModules();
  const list = document.getElementById('info-custom-list');

  if (!list.dataset.built) {
    list.dataset.built = '1';
    list.innerHTML = INFO_MODULE_DEFS.map(m => {
      const checked = modules.includes(m.id);
      return `<div class="fsheet-row" onclick="toggleInfoModule('${m.id}')" style="cursor:pointer">` +
        `<span class="fsheet-label" style="font-size:18px;white-space:nowrap;font-weight:700;color:#1A1A1A">${m.label}</span>` +
        `<span id="info-mod-check-${m.id}" class="info-mod-cb${checked ? ' checked' : ''}">` +
          `<svg viewBox="0 0 10 10" width="10" height="10" style="visibility:${checked ? 'visible' : 'hidden'};display:block">` +
            `<polyline points="1.5,5 4,8 8.5,2" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>` +
          `</svg>` +
        `</span>` +
        `</div>`;
    }).join('');
  }

  // Always sync visual state (handles switching trips)
  INFO_MODULE_DEFS.forEach(m => {
    const el = document.getElementById('info-mod-check-' + m.id);
    if (!el) return;
    const checked = modules.includes(m.id);
    el.classList.toggle('checked', checked);
    const svg = el.querySelector('svg');
    if (svg) svg.style.visibility = checked ? 'visible' : 'hidden';
  });

  const modal = document.getElementById('modal-info-custom');
  if (!modal.classList.contains('open')) modal.classList.add('open');
}


function toggleInfoModule(id) {
  const modules = getInfoModules();
  const idx = modules.indexOf(id);
  if (idx > -1) {
    if (modules.length <= 1) { showToast('至少保留一個項目'); return; }
    modules.splice(idx, 1);
  } else {
    modules.push(id);
  }
  data.settings.infoModules = modules;
  const checked = modules.includes(id);
  const el = document.getElementById('info-mod-check-' + id);
  if (el) {
    el.dataset.checked = checked;
    el.classList.toggle('checked', checked);
    const svg = el.querySelector('svg');
    if (svg) svg.style.visibility = checked ? 'visible' : 'hidden';
  }
}


function saveInfoModules() {
  save();
  renderInfoGrid();
  closeModal('modal-info-custom');
  showToast('已更新');
}


function renderItinerary() {
  if (!data) return;
  renderDayTabs();
  renderBanner();
  renderTimeline();
}

/* ─── Custom Confirm Dialog ─── */
function showConfirm(title, msg, onOk, onCancel) {
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
  cancel.onclick = () => { close(); onCancel && onCancel(); };
  el.onclick     = (e) => { if (e.target === el) { close(); onCancel && onCancel(); } };
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

/* Day 預設背景圖（對應 image/ 資料夾） */
const DAY_DEFAULT_PHOTOS = [
  'image/day1.jpg',
  'image/day2.jpg',
  'image/day3.jpg',
  'image/day4.jpg',
  'image/day5.jpg',
];

function renderBanner() {
  const area  = document.getElementById('banner-area');
  const b     = data.days[currentDay].banner;
  const userPhotos = b.photos || [];

  // 若使用者沒有上傳照片，使用預設圖
  const defaultPhoto = DAY_DEFAULT_PHOTOS[currentDay] || DAY_DEFAULT_PHOTOS[DAY_DEFAULT_PHOTOS.length - 1];
  const photos = userPhotos.length > 0 ? userPhotos : [defaultPhoto];

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
    <!-- Topbar above banner -->
    <div class="banner-topbar-outer">
      <span class="banner-brand">Travel Trace</span>
      <div class="banner-topbar-line"></div>
      <span class="banner-lon">${esc(data.settings?.tripName || '')}</span>
    </div>
    <div class="banner-more-wrap">
      <button class="banner-more-btn" onclick="openBannerActionSheet(event)" title="更多選項">
        <span class="banner-more-dot"></span>
        <span class="banner-more-dot"></span>
        <span class="banner-more-dot"></span>
      </button>
    </div>
    <div class="day-banner" onclick="openBannerModal(event)">
      ${bg}
      <div class="banner-gradient"></div>
      <!-- Right side: weather -->
      <div class="banner-lat-block">
        <span class="banner-lat-text" id="banner-weather-temp"></span>
      </div>
      <!-- Bottom left: date + subtitle -->
      <div class="banner-text-area">

        <div class="banner-date-display" onclick="event.stopPropagation();document.getElementById('banner-date-live').focus()" id="banner-date-display">${formatBannerDate(b.date)}</div>
        <input class="banner-date-input banner-date-hidden" id="banner-date-live"
          data-day="${currentDay}"
          value="${esc(b.date)}"
          placeholder="YYYY/MM/DD（一）"
          onclick="event.stopPropagation()"
          oninput="fmtDate(this);updateBannerDateDisplay(this.value)"
          onblur="saveBannerText()">
        <input class="banner-subtitle-input" id="banner-sub-live"
          data-day="${currentDay}"
          value="${esc(b.subtitle)}"
          placeholder="行程說明…"
          onclick="event.stopPropagation()"
          onblur="saveBannerText()">
      </div>
      ${dots}
    </div>`;

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
  // 重繪後補回天氣溫度
  setTimeout(() => { if (typeof applyWeatherToDOM === 'function') applyWeatherToDOM(); }, 0);
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
    list.innerHTML = `<div class="timeline-empty">點右下角 ＋ 新增行程</div>`;
    return;
  }
  list.innerHTML = evs.map((ev, i) => `
    <div class="timeline-item" style="animation-delay:${i * 0.05}s">
      <div class="timeline-left">
        <div class="timeline-dot"></div>
        <div class="timeline-line"></div>
      </div>
      <div class="timeline-right">
        <div class="timeline-time-row">
          <span class="timeline-time">${ev.time}</span>
          <button class="t-del-btn" onclick="deleteEvent(${ev.id})">×</button>
        </div>
        <div class="timeline-title" onclick="editEvent(${ev.id})">${esc(ev.title)}</div>
        ${ev.note ? `<div class="timeline-note">${esc(ev.note)}</div>` : ''}
      </div>
    </div>`).join('');
}

function formatBannerDate(str) {
  if (!str) return '<span class="banner-date-placeholder">YYYY/<br>MM/DD（一）</span>';
  // str = "YYYY/MM/DD（wd）"
  const m = str.match(/^(\d{4})\/(.*)/);
  if (m) return `${m[1]}/<br>${m[2]}`;
  return str;
}

function updateBannerDateDisplay(val) {
  const el = document.getElementById('banner-date-display');
  if (el) el.innerHTML = formatBannerDate(val);
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
  return val; // ImgBB URL, persisted in data/localStorage
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
function fmtEventTime(el) {
  const digits = el.value.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) {
    el.value = digits.slice(0,2) + ':' + digits.slice(2,4);
  } else {
    el.value = digits;
  }
}

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
  setTimeout(() => document.getElementById('ev-time').focus(), 340);
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

function bannerActionAddEvent() {
  closeActionSheet('action-sheet-banner');
  setTimeout(() => openEventModal(), 350);
}

function bannerActionAddDay() {
  closeActionSheet('action-sheet-banner');
  setTimeout(() => addDay(), 350);
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
    const remaining = 5 - photos.length;
    const add = document.createElement('div');
    add.className = 'photo-cell photo-cell-add';
    add.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px"><path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
      <span>新增照片</span>`;
    // hidden input — no capture attr → iOS shows Photos only option first
    const inp = document.createElement('input');
    inp.type = 'file';
    inp.accept = 'image/*';
    inp.multiple = true;
    inp.style.display = 'none';
    inp.addEventListener('change', () => handleGridUpload(inp));
    add.addEventListener('click', () => inp.click());
    add.appendChild(inp);
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
  files.slice(0, remaining).forEach(async file => {
    showUploadStatus('上傳中...');
    try {
      const url = await uploadToImgBB(file);
      data.days[currentDay].banner.photos.push(url);
      save();
      renderPhotoGrid();
    } catch(err) {
      alert('上傳失敗：' + err.message);
    } finally {
      showUploadStatus('');
    }
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
  const labelEl = document.getElementById('exp-cat-label');
  if (labelEl) labelEl.textContent = label;
  document.getElementById('exp-cat-dropdown')?.classList.remove('open');
}

function openExpenseSheet() {
  window._expEditId = null;
  initCatDropdown();
  _selectedCat = '餐飲';
  const labelEl = document.getElementById('exp-cat-label');
  if (labelEl) labelEl.textContent = '餐飲';
  const amt = document.getElementById('exp-amount');
  const nm  = document.getElementById('exp-name');
  if (amt) amt.value = '';
  if (nm)  nm.value  = '';
  document.getElementById('modal-expense-sheet').classList.add('open');
  setTimeout(() => document.getElementById('exp-amount')?.focus(), 340);
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
  if (!data) return;
  expenseDay = Math.min(expenseDay, data.days.length - 1);
  renderExpenseDayTabs();
  renderExpenseList();
}

function renderExpenseDayTabs() {
  const t = document.getElementById('expense-day-tabs');
  if (!t) return;
  t.innerHTML = data.days.map((_, i) =>
    `<button class="day-tab${i === expenseDay ? ' active' : ''}" onclick="switchExpDay(${i})">${i + 1}</button>`
  ).join('');
}

function switchExpDay(i) { expenseDay = i; renderExpenseDayTabs(); renderExpenseList(); }

function renderExpenseList() {
  const list  = document.getElementById('expense-list');
  const items = data.expenses[expenseDay] || [];
  const sym   = getCurrencySymbol();
  const total = items.reduce((s, i) => s + parseFloat(i.amount || 0), 0);
  document.getElementById('expense-total').textContent = `${sym} ${total.toLocaleString()}`;
  document.getElementById('expense-count').textContent = `${items.length} 筆記錄`;

  const allTotal = data.expenses.reduce((s, day) =>
    s + day.reduce((ds, i) => ds + parseFloat(i.amount || 0), 0), 0);
  const tripEl = document.getElementById('expense-trip-total');
  if (tripEl) tripEl.textContent = `${sym} ${allTotal.toLocaleString()}`;

  if (!items.length) {
    list.innerHTML = `<div style="text-align:center;padding:40px 0;color:var(--text-tertiary);font-size:13px;font-family:var(--mono)">尚無記錄</div>`;
    return;
  }
  list.innerHTML = [...items].reverse().map((item, ri) => {
    const catObj = (typeof EXPENSE_CATS !== 'undefined') ? EXPENSE_CATS.find(c => c.label === item.cat) : null;
    const color  = catObj ? catObj.color : '#D1D5DB';
    const iconSvg = catObj ? catObj.svg.replace(/height="\d+px"/, 'height="22px"').replace(/width="\d+px"/, 'width="22px"') : '';
    const label  = item.name || item.cat || '其他';
    return `
      <div class="exp-row" onclick="openExpenseSheetForEdit(${item.id})">
        <div class="exp-row-icon">${iconSvg}</div>
        <div class="exp-row-label">${esc(label)}</div>
        <div class="exp-row-amt">${sym}&nbsp;${parseFloat(item.amount).toLocaleString()}</div>
        <button class="exp-row-del" onclick="event.stopPropagation();deleteExpense(${item.id})">×</button>
      </div>`;
  }).join('');
}

function addExpense() {
  const name   = document.getElementById('exp-name').value.trim();
  const amount = document.getElementById('exp-amount').value;
  const cat    = _selectedCat || '其他';
  if (!amount) return;
  if (window._expEditId) {
    // 編輯模式：取代原有記錄
    const idx = data.expenses[expenseDay].findIndex(i => i.id === window._expEditId);
    if (idx !== -1) data.expenses[expenseDay][idx] = { id: window._expEditId, name, amount: parseFloat(amount), cat };
    window._expEditId = null;
  } else {
    data.expenses[expenseDay].push({ id: Date.now(), name, amount: parseFloat(amount), cat });
  }
  save();
  closeModal('modal-expense-sheet');
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
  renderInfoGrid();
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
  { g: '證件/文具', items: ['護照','眼鏡','筆記本','筆','購物袋','紙膠帶','口紅膠','小剪刀','分裝袋'] },
  { g: '電子/充電', items: ['手錶充電 x1','充電器 Type-C x2','Sony 充電器 x1','行動電源＋充電線 x1'] },
  { g: '攝影',      items: ['快門線','相機電池','底片','底片相機電池','拭鏡布'] },
  { g: '盥洗/保養', items: ['盥洗用具','毛巾','刮鬍刀','護唇膏','乳液','護手霜'] },
  { g: '藥品/衛生', items: ['止痛藥','胃藥','感冒藥','溫度計','OK繃','衛生紙','口罩','落健'] },
  { g: '衣物/日用', items: ['帽子','短袖上衣','長褲','短褲','內衣褲','襪子','布鞋','夾腳拖或涼鞋','薄外套','雨傘','黃色雨衣','寶特瓶','帆布包','筷子叉子'] },
];

function initChecklist() {
  if (!data.checklist || data.checklist.length === 0) {
    data.checklist = CHECKLIST_DEFAULTS.flatMap(g =>
      g.items.map(text => ({ text, done: false, group: g.g }))
    );
    save();
  }
}

function stripEmoji(str) {
  return (str || '').replace(/[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD00-\uDFFF]|[📄🔌📷🧴💊👗]\s*/gu, '').trim();
}

function resetChecklist() {
  if (!data.checklist) return;
  data.checklist.forEach(item => item.done = false);
  save();
  renderCheckItems();
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

  document.getElementById('checklist-items').innerHTML = groupOrder.map(g => {
    const list = groups[g];
    return `
      <div class="cl-group">
        <div class="cl-group-header">
          <span class="cl-group-title">${esc(stripEmoji(g))}</span>
          <button class="cl-group-add" onclick="openChecklistModal('${esc(g)}')">＋</button>
        </div>
        ${list.map(item => `
          <div class="cl-row ${item.done ? 'cl-done' : ''}" onclick="toggleCheck(${item.idx})">
            <div class="cl-circle ${item.done ? 'cl-checked' : ''}">
              ${item.done ? `<svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#fff"><path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170Z"/></svg>` : ''}
            </div>
            <span class="cl-text">${esc(item.text)}</span>
            <button class="cl-del" onclick="event.stopPropagation();deleteCheckItem(${item.idx})">×</button>
          </div>`).join('')}
      </div>`;
  }).join('');
}

function openChecklistModal(group) {
  initChecklist();
  document.getElementById('modal-checklist-add').classList.add('open');
  document.getElementById('modal-checklist-add').dataset.group = group || '其他';
  // populate group dropdown
  const groups = [...new Set(data.checklist.map(i => i.group || '其他'))];
  const sel = document.getElementById('checklist-add-group');
  if (sel) {
    sel.innerHTML = groups.map(g => `<option value="${esc(g)}" ${g===group?'selected':''}>${esc(g)}</option>`).join('');
  }
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

  el.innerHTML = items.map((item, i) => {
    const photoUrl = item.photo ? resolvePhoto(item.photo) : '';
    const done = item.done;

    if (done) {
      // 完成態：只保留圖片 + 名稱 + check
      return `
      <div class="sl-card sl-done" style="min-height:72px">
        <div class="sl-img-col" style="width:72px;min-height:72px;flex-shrink:0">
          ${photoUrl ? `<img class="sl-img" src="${photoUrl}">` : `<div class="sl-img-empty" style="min-height:72px"></div>`}
        </div>
        <div class="sl-content" style="flex-direction:row;align-items:center;padding:0 16px;gap:0">
          <span class="sl-name" style="flex:1;padding-right:12px">${esc(item.name || '')}</span>
          <button class="sl-check sl-checked" onclick="event.stopPropagation();toggleShop(${i})">
            <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px"><path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170Zm56 232q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
          </button>
        </div>
      </div>`;
    }

    const nameHtml   = `<div class="sl-name">${esc(item.name || '')}</div>` +
      (item.subname ? `<div class="sl-subname">${esc(item.subname)}</div>` : '');
    const addrHtml   = item.addr  ? `<div class="sl-meta sl-addr" onclick="event.stopPropagation();window.open('https://maps.google.com/?q=${encodeURIComponent(item.addr)}','_blank')">${esc(item.addr)}</div>` : '';
    const hoursHtml  = item.hours ? `<div class="sl-hours">${esc(item.hours)}</div>` : '';
    const linkHtml   = item.link  ? `<div class="sl-link" onclick="event.stopPropagation();window.open('${esc(item.link)}','_blank')">${esc(item.link)}</div>` : '';

    return `
    <div class="sl-card" onclick="openShopSheet(${i})">
      <div class="sl-img-col">
        ${photoUrl ? `<img class="sl-img" src="${photoUrl}">` : `<div class="sl-img-empty"></div>`}
      </div>
      <div class="sl-content">
        <button class="sl-del" onclick="event.stopPropagation();deleteShopItem(${i})">×</button>
        ${nameHtml}
        ${addrHtml}
        ${hoursHtml}
        ${linkHtml}
        <div class="sl-bottom">
          <div class="sl-qty-row">
            <button class="sl-qty-btn" onclick="event.stopPropagation();changeShopQty(${i},-1)">−</button>
            <span class="sl-qty">${item.qty || 1}</span>
            <button class="sl-qty-btn" onclick="event.stopPropagation();changeShopQty(${i},1)">＋</button>
          </div>
          <button class="sl-check" onclick="event.stopPropagation();toggleShop(${i})">
            <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px"><path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170Zm56 232q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
          </button>
        </div>
      </div>
    </div>`;
  }).join('');
}

let _shopEditIdx = null;

function openShopSheet(idx) {
  _shopEditIdx = (idx !== undefined && idx !== null) ? idx : null;
  const isNew = _shopEditIdx === null;
  const item = isNew ? {} : (data.shopping[_shopEditIdx] || {});

  const fields = ['name','addr','hours','link','qty'];
  fields.forEach(k => {
    const el = document.getElementById('sf-' + k);
    if (el) el.value = (k === 'qty') ? (item.qty || 1) : (item[k] || '');
  });

  // photo
  const photoUrl = item.photo ? resolvePhoto(item.photo) : '';
  const photoEl  = document.getElementById('sf-photo-preview');
  if (photoEl) {
    photoEl.style.backgroundImage = photoUrl ? `url('${photoUrl}')` : '';
    photoEl.classList.toggle('has-photo', !!photoUrl);
  }

  document.getElementById('shop-sheet-title').textContent = isNew ? '新增品項' : '編輯品項';
  document.getElementById('modal-shop-sheet').classList.add('open');
  setTimeout(() => document.getElementById('sf-name')?.focus(), 340);
}

function saveShopSheet() {
  const get = id => document.getElementById(id)?.value.trim() || '';
  const vals = {
    name:    get('sf-name'),
    addr:    get('sf-addr'),
    hours:   get('sf-hours'),
    link:    get('sf-link'),
    qty:     Math.max(1, parseInt(document.getElementById('sf-qty')?.value) || 1),
    done:    false,
  };
  if (_shopEditIdx !== null) {
    Object.assign(data.shopping[_shopEditIdx], vals);
  } else {
    if (!data.shopping) data.shopping = [];
    data.shopping.push({ photo: '', ...vals });
  }
  save();
  closeModal('modal-shop-sheet');
  renderShopItems();
}

async function handleShopPhotoSheet(input) {
  const file = input.files[0];
  if (!file) return;
  showUploadStatus('上傳中...');
  try {
    const url = await uploadToImgBB(file);
    if (_shopEditIdx !== null && data.shopping[_shopEditIdx]) {
      data.shopping[_shopEditIdx].photo = url;
      save();
    }
    const photoEl = document.getElementById('sf-photo-preview');
    if (photoEl) {
      photoEl.style.backgroundImage = `url('${url}')`;
      photoEl.classList.add('has-photo');
    }
  } catch(err) {
    alert('上傳失敗：' + err.message);
  } finally {
    showUploadStatus('');
  }
}

function addShopItem() { openShopSheet(null); }

function saveShopField(i, field, val) {
  if (!data.shopping[i]) return;
  data.shopping[i][field] = val; save();
}

function changeShopQty(i, delta) {
  if (!data.shopping[i]) return;
  data.shopping[i].qty = Math.max(1, (data.shopping[i].qty || 1) + delta);
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

async function handleTicketPhoto(input, id) {
  const file = input.files[0];
  if (!file) return;
  showUploadStatus('上傳中...');
  try {
    const url = await uploadToImgBB(file);
    const t = data.tickets.find(t => t.id === id);
    if (t) { t.photo = url; save(); renderTicketCards(); }
  } catch(err) {
    alert('上傳失敗：' + err.message);
  } finally {
    showUploadStatus('');
  }
}

function addTicketFromPhoto(input) {
  const files = [...input.files];
  if (!data.tickets) data.tickets = [];
  files.forEach(async file => {
    showUploadStatus('上傳中...');
    try {
      const url = await uploadToImgBB(file);
      data.tickets.push({ id: Date.now() + Math.random(), photo: url });
      save();
      renderTicketCards();
    } catch(err) {
      alert('上傳失敗：' + err.message);
    } finally {
      showUploadStatus('');
    }
  });
  input.value = '';
}


function openTicketLightbox(url) {
  let lb = document.getElementById('ticket-lightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'ticket-lightbox';
    lb.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;';
    lb.innerHTML = '<img id="ticket-lightbox-img" style="max-width:95vw;max-height:92vh;object-fit:contain;border-radius:8px;">';
    lb.addEventListener('click', () => lb.style.display = 'none');
    document.body.appendChild(lb);
  }
  document.getElementById('ticket-lightbox-img').src = url;
  lb.style.display = 'flex';
}


function openExpenseSheetForEdit(id) {
  const item = (data.expenses[expenseDay] || []).find(i => i.id === id);
  if (!item) return;
  window._expEditId = id;
  initCatDropdown();
  _selectedCat = item.cat || '其他';
  const labelEl = document.getElementById('exp-cat-label');
  if (labelEl) labelEl.textContent = _selectedCat;
  const nameEl = document.getElementById('exp-name');
  const amtEl  = document.getElementById('exp-amount');
  if (nameEl) nameEl.value = item.name || '';
  if (amtEl)  amtEl.value  = item.amount || '';
  document.getElementById('modal-expense-sheet').classList.add('open');
  setTimeout(() => document.getElementById('exp-amount')?.focus(), 340);
}

function renderTicketCards() {
  const cards = data.tickets || [];
  document.getElementById('ticket-cards').innerHTML = cards.length
    ? cards.map(t => {
        const photoUrl = t.photo ? resolvePhoto(t.photo) : '';
        return `
        <div class="ticket-card">
          <div class="ticket-img-wrap">
            <img class="ticket-img" src="${photoUrl}" alt="票券" onclick="openTicketLightbox('${photoUrl}')">
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
    airline: '', flightNo: '',
    fromDate: '', fromTime: '', fromCode: '', fromName: '', fromTerminal: '',
    toDate: '',   toTime: '',   toCode: '',   toName: '',   toTerminal: '',
    duration: '', baggage: '', seat: ''
  };
}

let _flightEditId = null;

function openFlightSheet(editId) {
  _flightEditId = editId || null;
  const fields = ['airline','flightNo','fromCode','fromName','fromTerminal','toCode','toName','toTerminal','times','baggage','seat'];
  fields.forEach(k => { const el = document.getElementById('ff-'+k); if (el) el.value = ''; });
  if (editId) {
    const f = data.flights.find(f => f.id === editId);
    if (f) {
      fields.forEach(k => { const el = document.getElementById('ff-'+k); if (el) el.value = f[k]||''; });
    }
  } else if (data.flights && data.flights.length > 0 && data.flights.length % 2 === 1) {
    // Odd count = adding an even-numbered flight (2nd, 4th...) → swap last flight's from/to
    const last = data.flights[data.flights.length - 1];
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
    set('ff-airline',      last.airline);
    set('ff-fromCode',     last.toCode);
    set('ff-fromName',     last.toName);
    set('ff-fromTerminal', last.toTerminal);
    set('ff-toCode',       last.fromCode);
    set('ff-toName',       last.fromName);
    set('ff-toTerminal',   last.fromTerminal);
    // baggage, flightNo, times, seat left blank
  }
  const title = document.getElementById('flight-sheet-title');
  if (title) title.textContent = editId ? '編輯機票' : '新增機票';
  document.getElementById('modal-flight-sheet').classList.add('open');
  setTimeout(() => document.getElementById('ff-airline')?.focus(), 340);
}

function fmtFlightTimes(el) {
  // 收集純數字
  const digits = el.value.replace(/\D/g, '');
  if (digits.length <= 4) {
    // 只有出發時間
    if (digits.length === 4) {
      el.value = digits.slice(0,2) + ':' + digits.slice(2,4);
    }
  } else {
    // 有抵達時間
    const dep = digits.slice(0,4);
    const arr = digits.slice(4,8);
    let out = dep.slice(0,2) + ':' + dep.slice(2,4);
    if (arr.length >= 4) {
      out += ' — ' + arr.slice(0,2) + ':' + arr.slice(2,4);
    } else if (arr.length > 0) {
      out += ' — ' + arr;
    }
    el.value = out;
  }
}


function saveFlightSheet() {
  const get = id => document.getElementById(id)?.value.trim() || '';
  const vals = {
    airline:       get('ff-airline'),
    flightNo:      get('ff-flightNo'),
    fromCode:      get('ff-fromCode').toUpperCase(),
    fromName:      get('ff-fromName'),
    fromTerminal:  get('ff-fromTerminal'),
    toCode:        get('ff-toCode').toUpperCase(),
    toName:        get('ff-toName'),
    toTerminal:    get('ff-toTerminal'),
    times:         get('ff-times'),
    baggage:       get('ff-baggage'),
    seat:          get('ff-seat'),
  };
  if (_flightEditId) {
    const f = data.flights.find(f => f.id === _flightEditId);
    if (f) Object.assign(f, vals);
  } else {
    data.flights.push({ id: Date.now(), ...vals });
  }
  save();
  closeModal('modal-flight-sheet');
  renderFlightCards();
}

function deleteFlightCard(id) {
  data.flights = data.flights.filter(f => f.id !== id);
  save(); renderFlightCards();
}

function renderFlightCards() {
  const el = document.getElementById('flight-cards');
  if (!data.flights.length) {
    el.innerHTML = `<div class="list-empty" style="padding:40px 16px">點右上角 ＋ 新增機票</div>`;
    return;
  }
  // Parse times field "hh:mm — hh:mm"
  const parseTimes = (str) => {
    const m = (str||'').match(/(\d{1,2}:\d{2})\s*[—–-]+\s*(\d{1,2}:\d{2})/);
    return m ? [m[1], m[2]] : [str||'', ''];
  };
  el.innerHTML = data.flights.map(f => {
    const [fromTime, toTime] = parseTimes(f.times);
    return `
    <div class="fc" onclick="openFlightSheet(${f.id})">
      <div class="fc-top">
        <div class="fc-airline">${esc(f.airline || '')}</div>
        <div class="fc-no">${esc(f.flightNo || '')}</div>
        <button class="fc-del" onclick="event.stopPropagation();deleteFlightCard(${f.id})">×</button>
      </div>
      <div class="fc-divider"></div>
      <div class="fc-route">
        <div class="fc-city-time">${esc(fromTime)}</div>
        <div class="fc-mid">
          <div class="fc-line">
            <div class="fc-line-bar"></div>
            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="var(--accent)"><path d="M280-80v-100l120-84v-144L80-280v-120l320-224v-176q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800v176l320 224v120L560-408v144l120 84v100l-200-60-200 60Z"/></svg>
            <div class="fc-line-bar"></div>
          </div>
        </div>
        <div class="fc-city-time fc-right">${esc(toTime)}</div>
      </div>
      <div class="fc-airports">
        <div class="fc-airport-wrap">
          ${f.fromCode ? `<span class="fc-code">${esc(f.fromCode)}</span>` : ''}
          <span class="fc-aname">${esc(f.fromName||'')}</span>
          ${f.fromTerminal ? `<span class="fc-terminal">Terminal ${esc(f.fromTerminal)}</span>` : ''}
        </div>
        <div class="fc-airport-wrap fc-airport-right">
          ${f.toCode ? `<span class="fc-code">${esc(f.toCode)}</span>` : ''}
          <span class="fc-aname fc-aname-right">${esc(f.toName||'')}</span>
          ${f.toTerminal ? `<span class="fc-terminal fc-aname-right">Terminal ${esc(f.toTerminal)}</span>` : ''}
        </div>
      </div>
      ${(f.baggage||f.seat) ? `
      <div class="fc-divider"></div>
      <div class="fc-bottom">
        ${f.baggage ? `<div class="fc-detail"><span class="fc-detail-label">Baggage weight</span><span class="fc-detail-val">${esc(f.baggage)} Kg</span></div>` : ''}
        ${f.seat    ? `<div class="fc-detail"><span class="fc-detail-label">Seat</span><span class="fc-detail-val">${esc(f.seat)}</span></div>` : ''}
      </div>` : ''}
    </div>`;
  }).join('');
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

function fmtHotelPrice(el) {
  const raw = el.value.replace(/[^0-9]/g, '');
  if (raw) el.value = parseInt(raw).toLocaleString();
  else el.value = '';
}

function fmtShopHours(el) {
  // 輸入 09001200 → 09:00-12:00
  const digits = el.value.replace(/\D/g, '').slice(0, 8);
  const fmtTime = (d4) => {
    if (d4.length <= 2) return d4;
    return d4.slice(0,2) + ':' + d4.slice(2,4);
  };
  if (digits.length <= 4) {
    el.value = fmtTime(digits);
  } else {
    el.value = fmtTime(digits.slice(0,4)) + '-' + fmtTime(digits.slice(4,8));
  }
}


function fmtHotelDates(el) {
  const raw    = el.value;
  const digits = raw.replace(/\D/g, '').slice(0, 8);
  const fmt = (d4) => {
    if (d4.length < 4) return d4.slice(0,2) + (d4.length > 2 ? '/' + d4.slice(2) : '');
    const mo = d4.slice(0,2), dy = d4.slice(2,4);
    const dt = new Date(new Date().getFullYear(), parseInt(mo)-1, parseInt(dy));
    const wd = ['日','一','二','三','四','五','六'][dt.getDay()];
    return mo + '/' + dy + '（' + wd + '）';
  };
  if (digits.length <= 4) {
    el.value = fmt(digits);
  } else {
    el.value = fmt(digits.slice(0,4)) + '-' + fmt(digits.slice(4,8));
  }
}

function openHotelSheet(editId) {
  _hotelEditId = editId || null;
  _sheetBreakfast = false;
  ['hf-name','hf-dates','hf-ref','hf-addr','hf-price'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  if (editId) {
    const h = data.hotels.find(h => h.id === editId);
    if (h) {
      const set = (id, v) => { const el = document.getElementById(id); if (el) el.value = v || ''; };
      set('hf-name',  h.name);
      set('hf-dates', h.dates || '');
      set('hf-ref',   h.ref);
      set('hf-addr',  h.addr);
      if (document.getElementById('hf-price'))
        document.getElementById('hf-price').value = h.price ? parseInt(h.price).toLocaleString() : '';
      _sheetBreakfast = h.breakfast || false;
    }
  }
  const tog = document.getElementById('hf-breakfast-toggle');
  const lbl = document.getElementById('hf-breakfast-label');
  if (tog) tog.classList.toggle('on', _sheetBreakfast);
  if (lbl) lbl.textContent = _sheetBreakfast ? '含早餐' : '不含';
  const title = document.getElementById('hotel-sheet-title');
  if (title) title.textContent = editId ? '編輯住宿' : '新增住宿';
  const saveBtn = document.getElementById('hotel-sheet-save-btn');
  if (saveBtn) saveBtn.textContent = editId ? '更新' : '儲存';
  document.getElementById('modal-hotel-sheet').classList.add('open');
  setTimeout(() => document.getElementById('hf-name')?.focus(), 340);
}

function saveHotelSheet() {
  const get = id => document.getElementById(id)?.value.trim() || '';
  const dates = get('hf-dates');
  const price = get('hf-price').replace(/[^0-9]/g,'');
  const parts = dates.split('-');
  const nights = calcNights(parts[0]?.trim(), parts[1]?.trim());
  const vals = { name: get('hf-name'), dates, ref: get('hf-ref'), addr: get('hf-addr'), price, nights, breakfast: _sheetBreakfast };
  if (_hotelEditId) {
    const h = data.hotels.find(h => h.id === _hotelEditId);
    if (h) Object.assign(h, vals);
  } else {
    data.hotels.push({ id: Date.now(), ...vals });
  }
  save(); closeModal('modal-hotel-sheet'); renderHotelCards();
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
    const nights = h.nights || 0;
    const priceDisplay = h.price ? `${sym} ${parseInt(h.price).toLocaleString()}` : '';
    return `
    <div class="hotel-card2" onclick="openHotelSheet(${h.id})">
      <div class="hotel2-header">
        <div class="hotel2-dates">${esc(h.dates || '日期未設定')}</div>
        <div class="hotel2-right">
          ${nights > 0 ? `<span class="hotel2-nights">${nights} 晚</span>` : ''}
          <button class="hotel2-del" onclick="event.stopPropagation();deleteHotelCard(${h.id})">
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
          </button>
        </div>
      </div>
      <div class="hotel2-name">${esc(h.name || '未命名')}</div>
      ${h.ref ? `<div class="hotel2-ref"><span class="hotel2-ref-label">訂單編號</span><span class="hotel2-ref-val">${esc(h.ref)}</span></div>` : ''}
      ${h.addr ? `<div class="hotel2-addr" onclick="event.stopPropagation();window.open('https://maps.google.com/?q=${encodeURIComponent(h.addr)}','_blank')">
        <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-560q0-109-69.5-184.5T480-820q-101 0-170.5 75.5T240-560q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-560q0-150 96.5-245T480-900q127 0 223.5 95T800-560q0 112-79.5 229.5T480-80Zm0-480Z"/></svg>
        ${esc(h.addr)}</div>` : ''}
      ${h.breakfast ? `<div class="hotel2-tags"><span class="hotel2-tag-breakfast">含早餐</span></div>` : ''}
      ${priceDisplay ? `<div class="hotel2-price-row">
        <span class="hotel2-price-label">總價</span>
        <span class="hotel2-price-val">${priceDisplay}</span>
      </div>` : ''}
    </div>`;
  }).join('');
}


/* ═══════════════════════════════════════
   MODAL HELPERS
═══════════════════════════════════════ */
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  // Reset info-custom-list built flag so it rebuilds fresh next open (different trip may have different modules)
  if (id === 'modal-info-custom') {
    const list = document.getElementById('info-custom-list');
    if (list) delete list.dataset.built;
  }
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
  { code: 'TWD', symbol: 'NT$',  label: '新台幣' },
  { code: 'JPY', symbol: '¥',    label: '日圓'   },
  { code: 'CNY', symbol: 'CN¥',  label: '人民幣' },
  { code: 'HKD', symbol: 'HK$',  label: '港幣'   },
  { code: 'USD', symbol: '$',    label: '美金'   },
  { code: 'EUR', symbol: '€',    label: '歐元'   },
  { code: 'THB', symbol: '฿',    label: '泰銖'   },
];

function renderSettings() {
  if (!data) return;
  const s = data.settings;
  const nameEl = document.getElementById('set-trip-name');
  if (nameEl) nameEl.value = s.tripName || '';
  const datesEl = document.getElementById('set-trip-dates');
  if (datesEl) datesEl.value = s.tripDates || '';
  // Geo text
  const lonEl = document.getElementById('set-lon-text');
  if (lonEl) lonEl.value = s.lonText || "135°25'59″E";
  const latEl = document.getElementById('set-lat-text');
  if (latEl) latEl.value = s.latText || "34°\n39'\n53″\nN";
  // Currency display
  const c = CURRENCIES.find(c => c.code === (s.currency || 'TWD'));
  const disp = document.getElementById('set-currency-display');
  if (disp) disp.textContent = c ? c.symbol + ' ' + c.label : 'NT$ 新台幣';
  const sel = document.getElementById('set-currency');
  if (sel) sel.value = s.currency || 'TWD';
  // Tags
  renderSettingsTags();
  applyTheme(s.theme);
}

function saveGeoText() {
  const lonEl = document.getElementById('set-lon-text');
  const latEl = document.getElementById('set-lat-text');
  if (lonEl) data.settings.lonText = lonEl.value;
  if (latEl) data.settings.latText = latEl.value;
  save();
  renderBanner();
}

function toggleCurrencyDropdown() {
  const dd = document.getElementById('set-currency-dropdown');
  if (dd) dd.classList.toggle('open');
}

function setCurrencyBtn(code, symbol, label) {
  data.settings.currency = code;
  save();
  const disp = document.getElementById('set-currency-display');
  if (disp) disp.textContent = symbol + ' ' + label;
  document.getElementById('set-currency-dropdown')?.classList.remove('open');
  renderExpenseList();
}

function setCurrencyFromSelect() {
  const sel = document.getElementById('set-currency');
  if (!sel) return;
  data.settings.currency = sel.value;
  save();
  const c = CURRENCIES.find(c => c.code === sel.value);
  const disp = document.getElementById('set-currency-display');
  if (disp && c) disp.textContent = c.symbol + ' ' + c.label;
  document.getElementById('set-currency-dropdown')?.classList.remove('open');
  renderExpenseList();
}

function renderSettingsTags() {
  const cloud = document.getElementById('set-tags-cloud');
  if (!cloud) return;
  const tags = data.settings.tags || [];
  cloud.innerHTML = tags.map((t, i) =>
    `<span class="set-tag-chip ${t.active?'active':''}" onclick="toggleSettingsTag(${i})">${esc(t.text)}</span>`
  ).join('');
  const disp = document.getElementById('set-tags-display');
  if (disp) {
    const active = tags.filter(t => t.active).map(t => t.text);
    disp.textContent = active.length ? active.join('，') : '加入標籤';
  }
}

function openTagSheet() {
  if (!data.settings.tags) data.settings.tags = [];
  renderSettingsTags();
  document.getElementById('modal-tag-sheet').classList.add('open');
  setTimeout(() => document.getElementById('set-tag-input')?.focus(), 340);
}

function addSettingsTag() {
  const inp = document.getElementById('set-tag-input');
  const text = inp?.value.trim();
  if (!text) return;
  if (!data.settings.tags) data.settings.tags = [];
  data.settings.tags.push({ text, active: true });
  save();
  inp.value = '';
  renderSettingsTags();
}

function toggleSettingsTag(idx) {
  if (!data.settings.tags) return;
  data.settings.tags[idx].active = !data.settings.tags[idx].active;
  save();
  renderSettingsTags();
}

// Close currency dropdown on outside click
document.addEventListener('click', (e) => {
  if (!e.target.closest('.set-field-select')) {
    document.getElementById('set-currency-dropdown')?.classList.remove('open');
  }
});

function fmtTripDates(el) {
  // Format: YYYY/MM/DD–MM/DD (same as trip sheet)
  const digits = el.value.replace(/\D/g, '').slice(0, 12);
  let result = '';
  if (digits.length <= 4) {
    result = digits;
  } else if (digits.length <= 6) {
    result = digits.slice(0,4) + '/' + digits.slice(4);
  } else if (digits.length <= 8) {
    result = digits.slice(0,4) + '/' + digits.slice(4,6) + '/' + digits.slice(6);
  } else if (digits.length <= 10) {
    result = digits.slice(0,4) + '/' + digits.slice(4,6) + '/' + digits.slice(6,8) + '–' + digits.slice(8);
  } else {
    result = digits.slice(0,4) + '/' + digits.slice(4,6) + '/' + digits.slice(6,8) + '–' + digits.slice(8,10) + '/' + digits.slice(10,12);
  }
  el.value = result;
}

function saveSettings() {
  if (!data) return;
  data.settings.tripName  = document.getElementById('set-trip-name')?.value.trim() || '';
  data.settings.tripDates = document.getElementById('set-trip-dates')?.value.trim() || '';
  // sync back to meta
  const trip = meta.trips.find(t => t.id === currentTripId);
  if (trip) trip.name = data.settings.tripName;
  saveMeta();
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
  // Pack meta + all trip data into one export
  const allTrips = {};
  (meta.trips || []).forEach(trip => {
    try {
      const raw = localStorage.getItem(TRIP_PREFIX + trip.id);
      if (raw) allTrips[trip.id] = JSON.parse(raw);
    } catch(e) {}
  });

  const exportData = {
    _version: 2,
    meta: meta,
    trips: allTrips,
    // Also include current trip data for backwards compat
    currentTripId: currentTripId,
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `travel-trace-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast(`已匯出 ${(meta.trips||[]).length} 筆行程`);
}

function importJSON(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);

      // v2 format: has meta + trips
      if (imported._version === 2 && imported.meta) {
        showConfirm('匯入資料', `將匯入 ${(imported.meta.trips||[]).length} 筆行程，現有資料將被覆蓋，確定繼續？`, () => {
          // Restore meta
          meta = imported.meta;
          if (!meta.trips) meta.trips = [];
          saveMeta();

          // Restore each trip
          Object.entries(imported.trips || {}).forEach(([id, tripData]) => {
            localStorage.setItem(TRIP_PREFIX + id, JSON.stringify(tripData));
          });

          // Load first trip or last active
          const firstId = imported.currentTripId || meta.trips[0]?.id;
          if (firstId) {
            loadTrip(firstId);
            renderItinerary();
            renderExpense();
            renderSettings();
          }
          switchTab('home');
          showToast('匯入成功');
        });
        return;
      }

      // v1 legacy format: single trip (has days)
      if (imported.days) {
        showConfirm('匯入資料', '現有資料將被覆蓋，確定繼續？', () => {
          data = imported;
          if (!data.settings) data.settings = { tripName: '', budget: 0, currency: 'TWD', theme: 'light' };
          data.days.forEach(d => {
            if (!d.banner) d.banner = { date: '', subtitle: '', photos: [] };
            if (!d.banner.photos) d.banner.photos = [];
            d.banner.photos = d.banner.photos.filter(p => p && !p.startsWith('blob-key:'));
          });
          save();
          renderItinerary();
          renderExpense();
          renderSettings();
          showToast('匯入成功');
        });
        return;
      }

      showToast('檔案格式錯誤');
    } catch(err) {
      showToast('檔案格式錯誤');
    }
  };
  reader.readAsText(file);
  input.value = '';
}

function clearAllData() {
  showConfirm('清除此行程資料', '此行程所有行程、帳單、資訊將永久刪除。', () => {
    if (!currentTripId) return;
    data = freshTripData();
    const trip = meta.trips.find(t => t.id === currentTripId);
    if (trip) { data.settings.tripName = trip.name; data.settings.currency = trip.currency || 'TWD'; }
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


/* ─── Itinerary Swipe Gesture ─── */
(function() {
  let startX = 0, startY = 0, isDragging = false;
  const THRESHOLD = 50;   // px 最小滑動距離
  const ANGLE = 35;       // 允許的角度偏差

  function onTouchStart(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isDragging = true;
  }

  function onTouchEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    // 確認是水平滑動（角度夠小）
    if (Math.abs(dx) < THRESHOLD) return;
    if (Math.abs(dy) / Math.abs(dx) > Math.tan(ANGLE * Math.PI / 180)) return;

    // 循環：左滑→下一天，右滑→上一天，頭尾相連
    if (Math.abs(dx) >= THRESHOLD) {
      currentDay = (currentDay + (dx < 0 ? 1 : -1) + data.days.length) % data.days.length;
      renderItinerary();
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('screen-itinerary');
    if (!el) return;
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
  });
})();

/* ─── Info Sub-Screen Swipe Gesture ─── */
(function() {
  const INFO_SUBS = ['flight', 'hotel', 'checklist', 'shopping', 'ticket', 'notes'];
  let _currentInfoSub = null;
  let _startX = 0, _startY = 0;
  const THRESHOLD = 50;
  const ANGLE = 35;

  // 記錄目前開啟的 sub
  const _origOpenInfoSub = openInfoSub;
  window.openInfoSub = function(name) {
    _currentInfoSub = name;
    _origOpenInfoSub(name);
  };

  function swipeInfoSub(dir) {
    if (!_currentInfoSub) return;
    const idx = INFO_SUBS.indexOf(_currentInfoSub);
    if (idx === -1) return;
    const nextIdx = (idx + dir + INFO_SUBS.length) % INFO_SUBS.length;
    const nextName = INFO_SUBS[nextIdx];
    // 關掉目前的
    document.getElementById('screen-info-' + _currentInfoSub)?.classList.remove('active');
    // 開啟下一個
    _currentInfoSub = nextName;
    _origOpenInfoSub(nextName);
  }

  function onTouchStart(e) {
    _startX = e.touches[0].clientX;
    _startY = e.touches[0].clientY;
  }

  function onTouchEnd(e) {
    const dx = e.changedTouches[0].clientX - _startX;
    const dy = e.changedTouches[0].clientY - _startY;
    if (Math.abs(dx) < THRESHOLD) return;
    if (Math.abs(dy) / Math.abs(dx) > Math.tan(ANGLE * Math.PI / 180)) return;
    swipeInfoSub(dx < 0 ? 1 : -1);
  }

  // 對所有 sub-screen 加 swipe
  document.addEventListener('DOMContentLoaded', () => {
    INFO_SUBS.forEach(name => {
      const el = document.getElementById('screen-info-' + name);
      if (!el) return;
      el.addEventListener('touchstart', onTouchStart, { passive: true });
      el.addEventListener('touchend', onTouchEnd, { passive: true });
    });
  });
})();


/* ─── Weather Fetch ─── */
const WMO_DESC = {
    0:'Sunny', 1:'Clear', 2:'Partly Cloudy', 3:'Overcast',
    45:'Foggy', 48:'Icy Fog',
    51:'Light Drizzle', 53:'Drizzle', 55:'Heavy Drizzle',
    61:'Light Rain', 63:'Rainy', 65:'Heavy Rain',
    71:'Light Snow', 73:'Snowy', 75:'Heavy Snow', 77:'Snow',
    80:'Showers', 81:'Rainy', 82:'Heavy Showers',
    85:'Snow Showers', 86:'Heavy Snow',
    95:'Stormy', 96:'Thunder', 99:'Hail Storm',
  };

  function getWeatherDesc(code) {
    return WMO_DESC[code] || 'Cloudy';
  }

let _liveTemp = '';  // 即時溫度快取

  // 把溫度顯示到 DOM
function applyWeatherToDOM() {
  const tempEl = document.getElementById('banner-weather-temp');
  if (!tempEl) return;

  // 1. 優先：已永久儲存的溫度
  const stored = data.days[currentDay]?.weather;
  if (stored) { tempEl.textContent = stored; return; }

  // 2. 今天即時溫度
  const todayIdx = _todayDayIndex();
  if (currentDay === todayIdx && _liveTemp) {
    tempEl.textContent = _liveTemp; return;
  }

  // 3. 未來7天預報 — 先用自己的日期，沒有就從第一個有日期的天推算
  let dayDate = parseBannerDate(data.days[currentDay]?.banner?.date);
  if (!dayDate) {
    for (let i = 0; i < data.days.length; i++) {
      const anchor = parseBannerDate(data.days[i]?.banner?.date);
      if (anchor) {
        dayDate = new Date(anchor);
        dayDate.setDate(dayDate.getDate() + (currentDay - i));
        break;
      }
    }
  }
  if (dayDate) {
    const key = _dateKey(dayDate);
    if (_forecastCache[key]) { tempEl.textContent = _forecastCache[key]; return; }
  }

  // 4. Fallback：顯示今天即時溫度
  if (_liveTemp) { tempEl.textContent = _liveTemp; return; }
  tempEl.textContent = '';
}

  // 找今天對應的行程 index
function _todayDayIndex() {
    const today = new Date();
    today.setHours(0,0,0,0);
    for (let i = 0; i < data.days.length; i++) {
      const d = parseBannerDate(data.days[i].banner.date);
      if (d) {
        d.setHours(0,0,0,0);
        if (d.getTime() === today.getTime()) return i;
      }
    }
    return -1;
  }

let _forecastCache = {}; // { 'YYYY-MM-DD': '24°' } 預報暫存，不寫 localStorage

function _dateKey(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

async function fetchWeather(lat, lon) {
    try {
      // 一次抓：即時 + 未來7天日最高溫
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&daily=temperature_2m_max&temperature_unit=celsius&timezone=auto&forecast_days=7`;
      const res = await fetch(url);
      const json = await res.json();

      // 即時溫度
      const temp = Math.round(json.current.temperature_2m);
      _liveTemp = temp + '°';

      // 存進今天對應的行程天（永久），非行程日期就只存 _liveTemp 不寫 data
      const todayIdx = _todayDayIndex();
      if (todayIdx !== -1) {
        if (!data.days[todayIdx].weather) {
          data.days[todayIdx].weather = _liveTemp;
          save();
        }
      }

      // 未來預報 cache（只存 session，不寫 localStorage）
      const dailyDates = json.daily?.time || [];
      const dailyTemps = json.daily?.temperature_2m_max || [];
      _forecastCache = {};
      dailyDates.forEach((d, i) => {
        _forecastCache[d] = Math.round(dailyTemps[i]) + '°';
      });

      applyWeatherToDOM();
    } catch(e) {
      console.warn('Weather fetch failed:', e);
    }
  }

function initWeather() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      pos => fetchWeather(pos.coords.latitude, pos.coords.longitude),
      () => {},
      { timeout: 8000 }
    );
  }

document.addEventListener('DOMContentLoaded', () => {
    initWeather();
    // 每30分鐘更新一次（只更新今天）
    setInterval(initWeather, 30 * 60 * 1000);
  });


/* ═══════════════════════════════════════
   INIT
═══════════════════════════════════════ */
loadMeta();
applyTheme('light');

// Start on Home screen
switchTab('home');

