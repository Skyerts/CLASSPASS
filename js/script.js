// ===== CLASSPASS JAVASCRIPT =====

// Demo Data
const USERS = {
  student: {
    username: 'student', password: 'student123',
    role: 'student',
    name: 'Kurt Cortez', id: '2021-00123',
    email: 'kurtcortez@pcc.edu.ph', course: 'BS Information Technology',
    year: '2nd Year', section: 'BSIT-2C', phone: '+63 912 345 6789',
    avatar: null
  },
  professor: {
    username: 'professor', password: 'professor123',
    role: 'professor',
    name: 'Dr. Greta Rosario', id: 'PROF-0042',
    email: 'greta.rosario@pcc.edu.ph', department: 'College of Information Technology',
    position: 'Associate Professor', phone: '+63 917 654 3210',
    avatar: null
  }
};

const HOLIDAYS = [
  { name: "New Year's Day",       date: "January 1, 2026 (Thursday)",   dateISO: "2026-01-01", img: "img/holidays/new_years_day.jpg",      desc: "Welcoming the start of a brand new year." },
  { name: "Maundy Thursday",      date: "April 2, 2026 (Thursday)",     dateISO: "2026-04-02", img: "img/holidays/maundy_thursday.jpg",    desc: "Commemorating the Last Supper of Jesus Christ." },
  { name: "Good Friday",          date: "April 3, 2026 (Friday)",       dateISO: "2026-04-03", img: "img/holidays/good_friday.jpg",        desc: "Remembering the crucifixion and death of Jesus." },
  { name: "Araw ng Kagitingan",   date: "April 9, 2026 (Thursday)",     dateISO: "2026-04-09", img: "img/holidays/araw_ng_kagitingan.jpg", desc: "Day of Valor — honoring the Fall of Bataan heroes." },
  { name: "Labor Day",            date: "May 1, 2026 (Friday)",         dateISO: "2026-05-01", img: "img/holidays/labor_day.jpg",          desc: "Celebrating the contributions of the Filipino workforce." },
  { name: "Independence Day",     date: "June 12, 2026 (Friday)",       dateISO: "2026-06-12", img: "img/holidays/independence_day.jpg",   desc: "Marking the Philippine Declaration of Independence." },
  { name: "National Heroes Day",  date: "August 31, 2026 (Monday)",     dateISO: "2026-08-31", img: "img/holidays/national_heroes_day.jpg",desc: "Honoring all heroes who shaped the Filipino nation." },
  { name: "Bonifacio Day",        date: "November 30, 2026 (Monday)",   dateISO: "2026-11-30", img: "img/holidays/bonifacio_day.jpg",      desc: "Celebrating the birth of Andres Bonifacio, Father of Revolution." },
  { name: "Christmas Day",        date: "December 25, 2026 (Friday)",   dateISO: "2026-12-25", img: "img/holidays/christmas_day.jpg",      desc: "The most wonderful time of the year — the birth of Christ." },
  { name: "Rizal Day",            date: "December 30, 2026 (Wednesday)",dateISO: "2026-12-30", img: "img/holidays/rizal_day.jpg",          desc: "Commemorating the martyrdom of Dr. José Rizal." }
];

const SUBJECTS = [
  { id: 'it113', code: 'IT-113', name: 'Web Development', professor: 'Greta Rosario', schedule: 'Sat 2:30 PM - 5:30 PM', color: '#CC0000' },
  { id: 'it112', code: 'IT-112', name: 'Integrative Programming', professor: 'Almeda Asuncion', schedule: 'Fri 12:00 NN - 3:00 PM', color: '#3B82F6' },
  { id: 'it111', code: 'IT-111', name: 'Networking 2', professor: 'June Charanguero', schedule: 'Mon & Fri 3:00 PM - 4:30 PM', color: '#10B981' },
  { id: 'it109', code: 'IT-109', name: 'Information Management', professor: 'Celine Dormiendo', schedule: 'Sat 11:00 AM - 2:00 PM', color: '#8B5CF6' }
];

const PROFESSOR_CLASSES = [
  { id: 'it113', code: 'IT-113', name: 'Web Development', section: 'BSIT-2C', students: 40, pending: 2, schedule: 'Sat 2:30 PM - 5:30 PM', color: '#CC0000' }
];

// Clear old cached data if data version changed
const DATA_VERSION = 'v4';
if (localStorage.getItem('cp_data_version') !== DATA_VERSION) {
  localStorage.removeItem('cp_requests');
  localStorage.setItem('cp_data_version', DATA_VERSION);
}

// Requests storage (session)
let REQUESTS = JSON.parse(localStorage.getItem('cp_requests') || '[]');
if (!REQUESTS.length) {
  REQUESTS = [
    { id: 'req001', studentId: 'student', studentName: 'Kurt Cortez', subjectId: 'it113', subjectName: 'Web Development', date: '2026-02-10', reason: 'Medical appointment', proof: null, status: 'approved', filed: '2026-02-09' },
    { id: 'req002', studentId: 'student', studentName: 'Kurt Cortez', subjectId: 'it112', subjectName: 'Integrative Programming', date: '2026-02-14', reason: 'Family emergency', proof: null, status: 'approved', filed: '2026-02-14' },
    { id: 'req003', studentId: 'student', studentName: 'Kurt Cortez', subjectId: 'it111', subjectName: 'Networking 2', date: '2026-02-18', reason: 'Fever and flu', proof: null, status: 'pending', filed: '2026-02-17' },
    { id: 'req004', studentId: 'student', studentName: 'Kurt Cortez', subjectId: 'it113', subjectName: 'Web Development', date: '2026-02-20', reason: 'Dental appointment', proof: null, status: 'denied', filed: '2026-02-19' },
    { id: 'req005', studentId: 'student', studentName: 'Kurt Cortez', subjectId: 'it109', subjectName: 'Information Management', date: '2026-02-22', reason: 'School competition', proof: null, status: 'approved', filed: '2026-02-21' },
    { id: 'req006', studentId: 'student', studentName: 'Kurt Cortez', subjectId: 'it111', subjectName: 'Networking 2', date: '2026-02-24', reason: 'Sick leave', proof: null, status: 'pending', filed: '2026-02-23' }
  ];
  saveRequests();
}

function saveRequests() {
  localStorage.setItem('cp_requests', JSON.stringify(REQUESTS));
}

// Current user
let currentUser = JSON.parse(sessionStorage.getItem('cp_user') || 'null');

// ===== LOADING SCREEN =====
function initLoadingScreen() {
  const ls = $('#loading-screen');
  if (!ls.length) return;
  setTimeout(() => {
    ls.addClass('fade-out');
    setTimeout(() => {
      ls.hide();
      showContent();
    }, 500);
  }, 2200);
}

function showContent() {
  $('.page-content').css('display', 'flex');
}

// ===== LOGIN =====
function handleLogin() {
  const username = $('#username').val().trim();
  const password = $('#password').val();
  const errEl = $('#login-error');

  const user = USERS[username];
  if (!user || user.password !== password) {
    errEl.text('Invalid username or password. Please try again.').show();
    $('#username').focus();
    return;
  }
  errEl.hide();
  sessionStorage.setItem('cp_user', JSON.stringify(user));

  const btn = $('#login-btn');
  btn.text('Signing in...').prop('disabled', true);

  setTimeout(() => {
    if (user.role === 'student') {
      window.location.href = 'student_home.html';
    } else {
      window.location.href = 'professor_home.html';
    }
  }, 600);
}

// ===== AUTH GUARD =====
function requireAuth(role) {
  if (!currentUser) { window.location.href = 'index.html'; return false; }
  if (role && currentUser.role !== role) { window.location.href = 'index.html'; return false; }
  return true;
}

// ===== TOP BANNER =====
function injectTopBanner() {
  // Only inject if banner doesn't already exist in HTML
  if ($('#top-banner').length) return;
  const banner = `
    <div id="top-banner">
      <img src="logo.png" alt="PCC Logo" id="banner-logo">
      <span id="banner-text">Persons of Character and Competence</span>
    </div>
  `;
  $('body').prepend(banner);
}

// ===== SIDEBAR SETUP =====
function setupSidebar(activeNav) {
  if (!currentUser) return;

  // Inject banner for all pages
  injectTopBanner();

  // Update avatar/name using jQuery
  $('#sb-name').text(currentUser.name);
  $('#sb-role').text(currentUser.role === 'student' ? 'Student' : 'Professor');

  const savedAvatar = localStorage.getItem('cp_avatar_' + currentUser.username);
  const avatarEl = $('#sb-avatar');
  if (avatarEl.length) {
    if (savedAvatar) {
      avatarEl.html(`<img src="${savedAvatar}" alt="avatar">`);
    } else {
      avatarEl.html(`<i class="bi bi-person-fill"></i>`);
    }
  }

  // Active nav using jQuery
  $('.nav-item').removeClass('active');
  $(`.nav-item[data-nav="${activeNav}"]`).addClass('active');
}

function logout() {
  sessionStorage.removeItem('cp_user');
  window.location.href = 'index.html';
}

// ===== TOAST =====
function showToast(message, type = 'info') {
  let toast = $('#toast');
  if (!toast.length) {
    toast = $('<div id="toast" class="toast"></div>');
    $('body').append(toast);
  }
  const icons = { success: 'bi-check-circle-fill', error: 'bi-x-circle-fill', info: 'bi-info-circle-fill' };
  toast.html(`<i class="bi ${icons[type]}"></i> ${message}`);
  toast.attr('class', `toast ${type}`);
  setTimeout(() => toast.addClass('show'), 10);
  setTimeout(() => toast.removeClass('show'), 3200);
}

// ===== MODAL =====
function openModal(id) {
  $('#' + id).addClass('active');
}
function closeModal(id) {
  $('#' + id).removeClass('active');
}

// ===== HOLIDAYS RENDER =====
// Create holiday modal if not exist
// ===== HOLIDAYS RENDER =====
function renderHolidays() {
  const container = $('#holidays-list');
  if (!container.length) return;

  if (!HOLIDAYS || !HOLIDAYS.length) {
    container.html(`<p style="padding:16px;color:#888;">No holidays available.</p>`);
    return;
  }

  // Render holiday cards
  container.html(`
    <div class="holiday-cards-grid">
      ${HOLIDAYS.map((h, i) => `
        <div class="holiday-card" data-index="${i}">
          <div class="holiday-card-img-wrap">
            <img src="${h.img}" alt="${h.name}" onerror="this.parentElement.innerHTML='<div class=\\'holiday-img-placeholder\\'><i class=\\'bi bi-calendar-heart-fill\\'></i></div>'">
          </div>
          <div class="holiday-card-body">
            <div class="holiday-card-name">${h.name}</div>
            <div class="holiday-card-date"><i class="bi bi-calendar-event-fill"></i> ${h.date}</div>
            <div class="holiday-card-desc">${h.desc}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `);

  // Attach click event safely (handles quotes in names)
  $('.holiday-card').each(function() {
    const idx = $(this).data('index');
    const h = HOLIDAYS[idx];
    $(this).on('click', () => openHolidayModal(h.name, h.img, h.desc));
  });
}

// ===== HOLIDAY MODAL SETUP =====
if (!$('#holiday-modal').length) {
  $('body').append(`
    <div class="modal-overlay" id="holiday-modal">
      <div class="modal">
        <button class="modal-close" onclick="closeModal('holiday-modal')"><i class="bi bi-x-lg"></i></button>
        <div class="modal-title" id="holiday-modal-title"></div>
        <div id="holiday-modal-img-wrap" style="margin:12px 0;"></div>
        <div id="holiday-modal-desc"></div>
      </div>
    </div>
  `);
}

function openHolidayModal(name, img, desc) {
  $('#holiday-modal-title').text(name);
  $('#holiday-modal-img-wrap').html(`<img src="${img}" alt="${name}" style="width:100%;border-radius:8px">`);
  $('#holiday-modal-desc').text(desc);
  openModal('holiday-modal');
}
// ===== STUDENT HOME STATS =====
function renderStudentStats() {
  const myRequests = REQUESTS.filter(r => r.studentId === 'student');
  const total = myRequests.length;
  const approved = myRequests.filter(r => r.status === 'approved').length;
  const pending = myRequests.filter(r => r.status === 'pending').length;
  setEl('stat-total', total);
  setEl('stat-approved', approved);
  setEl('stat-pending', pending);
}

// ===== STUDENT SUBJECTS =====
function renderSubjects() {
  const container = $('#subjects-grid');
  if (!container.length) return;
  container.html(SUBJECTS.map(s => `
    <div class="subject-card">
      <div class="subject-color-bar" style="background:${s.color}"></div>
      <div class="subject-code">${s.code}</div>
      <div class="subject-name">${s.name}</div>
      <div class="subject-prof"><i class="bi bi-person"></i> ${s.professor}</div>
      <div class="subject-footer">
        <div class="subject-schedule"><i class="bi bi-clock"></i> ${s.schedule}</div>
        <button class="btn-file-absence" onclick="openAbsenceModal('${s.id}', '${s.name}')">
          File Absence
        </button>
      </div>
    </div>
  `).join(''));
}

function openAbsenceModal(subjectId, subjectName) {
  $('#absence-subject-id').val(subjectId);
  $('#absence-subject-name').val(subjectName);
  $('#absence-subject-display').text(subjectName);
  $('#absence-date').val('');
  $('#absence-reason').val('');
  openModal('absence-modal');
}

function submitAbsence() {
  const subjectId = $('#absence-subject-id').val();
  const subjectName = $('#absence-subject-name').val();
  const date = $('#absence-date').val();
  const reason = $('#absence-reason').val().trim();

  if (!date) { showToast('Please select a date.', 'error'); return; }
  if (!reason) { showToast('Please enter a reason.', 'error'); return; }

  const holidayName = isHolidayDate(date);
  if (holidayName) {
    showToast(`❌ "${holidayName}" is a public holiday. You cannot file an absence on this date.`, 'error');
    return;
  }

  const newReq = {
    id: 'req' + Date.now(),
    studentId: 'student',
    studentName: currentUser ? currentUser.name : 'Kurt Cortez',
    subjectId, subjectName, date, reason,
    proof: null,
    status: 'pending',
    filed: new Date().toISOString().split('T')[0]
  };
  REQUESTS.push(newReq);
  saveRequests();
  closeModal('absence-modal');
  showToast('Absence request filed successfully!', 'success');
  if (typeof renderStudentStats === 'function') renderStudentStats();
  if (typeof renderRequests === 'function') renderRequests();
}

function isHolidayDate(dateStr) {
  const match = HOLIDAYS.find(h => h.dateISO === dateStr);
  return match ? match.name : null;
}

// ===== STUDENT REQUESTS =====
function renderRequests(filter = 'all') {
  const container = $('#requests-list');
  if (!container.length) return;
  let reqs = REQUESTS.filter(r => r.studentId === 'student');
  if (filter !== 'all') reqs = reqs.filter(r => r.status === filter);
  reqs.sort((a, b) => new Date(b.filed) - new Date(a.filed));

  if (!reqs.length) {
    container.html(`<div class="empty-state"><i class="bi bi-inbox"></i><p>No requests found.</p></div>`);
    return;
  }

  container.html(reqs.map(r => `
    <div class="request-item" onclick="viewRequestDetail('${r.id}', 'student')">
      <div>
        <div class="request-subject">${r.subjectName}</div>
        <div class="request-meta">Filed on ${formatDate(r.filed)}</div>
      </div>
      <div class="request-right">
        <div class="request-date">${formatDate(r.date)}</div>
        ${badgeHtml(r.status)}
        <i class="bi bi-chevron-right" style="color:var(--text-light)"></i>
      </div>
    </div>
  `).join(''));
}

function viewRequestDetail(reqId, viewer) {
  const req = REQUESTS.find(r => r.id === reqId);
  if (!req) return;
  const modal = document.getElementById('detail-modal');
  if (!modal) return;

  $('#detail-subject').text(req.subjectName);
  $('#detail-date').text(formatDate(req.date));
  $('#detail-reason').text(req.reason);
  $('#detail-filed').text(formatDate(req.filed));
  $('#detail-status').html(badgeHtml(req.status));
  $('#detail-student').text(req.studentName);

  const actions = $('#detail-actions');
  if (viewer === 'professor' && req.status === 'pending') {
    actions.html(`
      <button class="btn-secondary" onclick="closeModal('detail-modal')">Close</button>
      <button class="btn-deny" onclick="updateRequestStatus('${req.id}', 'denied')"><i class="bi bi-x-lg"></i> Deny</button>
      <button class="btn-approve" onclick="updateRequestStatus('${req.id}', 'approved')"><i class="bi bi-check-lg"></i> Approve</button>
    `);
  } else {
    actions.html(`<button class="btn-primary" onclick="closeModal('detail-modal')">Close</button>`);
  }

  openModal('detail-modal');
}

function updateRequestStatus(reqId, status) {
  const req = REQUESTS.find(r => r.id === reqId);
  if (!req) return;
  req.status = status;
  saveRequests();
  closeModal('detail-modal');
  showToast(`Request ${status === 'approved' ? 'approved' : 'denied'} successfully!`, status === 'approved' ? 'success' : 'error');
  if (typeof renderProfessorRequests === 'function') renderProfessorRequests();
}

// ===== PROFESSOR CLASS PAGE =====
function renderProfessorClasses() {
  const container = $('#class-grid');
  if (!container.length) return;

  container.html(PROFESSOR_CLASSES.map(c => {
    const classReqs = REQUESTS.filter(r => r.subjectId === c.id);
    const pending = classReqs.filter(r => r.status === 'pending').length;
    return `
      <div class="class-card" onclick="openClassRequests('${c.id}', '${c.name}')">
        <div class="class-top">
          <div class="class-icon" style="background:${c.color}"><i class="bi bi-journal-bookmark-fill"></i></div>
          <div>
            <div class="class-name">${c.name}</div>
            <div class="class-code">${c.code} — ${c.section}</div>
          </div>
        </div>
        <div style="font-size:0.82rem;color:var(--text-light);margin-bottom:12px"><i class="bi bi-clock"></i> ${c.schedule}</div>
        <div class="class-stats">
          <div class="class-stat"><div class="class-stat-num">${c.students}</div><div class="class-stat-label">Students</div></div>
          <div class="class-stat"><div class="class-stat-num" style="color:var(--amber)">${pending}</div><div class="class-stat-label">Pending</div></div>
          <div class="class-stat"><div class="class-stat-num" style="color:var(--green)">${classReqs.filter(r=>r.status==='approved').length}</div><div class="class-stat-label">Approved</div></div>
        </div>
      </div>
    `;
  }).join(''));
}

function openClassRequests(classId, className) {
  sessionStorage.setItem('cp_selected_class', JSON.stringify({ id: classId, name: className }));
  window.location.href = 'professor_requests.html';
}

// ===== PROFESSOR REQUESTS PAGE =====
function renderProfessorRequests(filter = 'all') {
  const container = $('#requests-list');
  const cls = JSON.parse(sessionStorage.getItem('cp_selected_class') || 'null');
  if (!cls || !container.length) return;

  $('#class-title').text(cls.name);

  let reqs = REQUESTS.filter(r => r.subjectId === cls.id);
  if (filter !== 'all') reqs = reqs.filter(r => r.status === filter);
  reqs.sort((a, b) => new Date(b.filed) - new Date(a.filed));

  if (!reqs.length) {
    container.html(`<div class="empty-state"><i class="bi bi-inbox"></i><p>No requests for this class.</p></div>`);
    return;
  }

  container.html(reqs.map(r => `
    <div class="request-item" onclick="viewRequestDetail('${r.id}', 'professor')">
      <div>
        <div class="request-subject">${r.studentName}</div>
        <div class="request-meta">${r.reason} · Filed ${formatDate(r.filed)}</div>
      </div>
      <div class="request-right">
        <div class="request-date">${formatDate(r.date)}</div>
        ${badgeHtml(r.status)}
        <i class="bi bi-chevron-right" style="color:var(--text-light)"></i>
      </div>
    </div>
  `).join(''));
}

// ===== PROFILE =====
function renderProfile() {
  if (!currentUser) return;
  const savedAvatar = localStorage.getItem('cp_avatar_' + currentUser.username);
  const avatarEl = $('#profile-avatar');
  if (avatarEl.length) {
    if (savedAvatar) {
      avatarEl.html(`<img src="${savedAvatar}" alt="avatar"><div class="overlay"><i class="bi bi-camera-fill"></i></div>`);
    } else {
      avatarEl.html(`<i class="bi bi-person-fill"></i><div class="overlay"><i class="bi bi-camera-fill"></i></div>`);
    }
    avatarEl.off('click').on('click', () => $('#avatar-upload').trigger('click'));
  }

  setEl('prof-name', currentUser.name);
  setEl('prof-id', currentUser.id);
  setEl('prof-email', currentUser.email);
  setEl('prof-phone', currentUser.phone);

  if (currentUser.role === 'student') {
    setEl('prof-extra1-label', 'Course');
    setEl('prof-extra1', currentUser.course);
    setEl('prof-extra2-label', 'Year & Section');
    setEl('prof-extra2', currentUser.year + ' — ' + currentUser.section);
  } else {
    setEl('prof-extra1-label', 'Department');
    setEl('prof-extra1', currentUser.department);
    setEl('prof-extra2-label', 'Position');
    setEl('prof-extra2', currentUser.position);
  }
}

function handleAvatarUpload(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const dataUrl = e.target.result;
    localStorage.setItem('cp_avatar_' + currentUser.username, dataUrl);
    renderProfile();
    setupSidebar();
    showToast('Profile picture updated!', 'success');
  };
  reader.readAsDataURL(file);
}

// ===== HELPERS =====
function setEl(id, val) {
  $('#' + id).text(val);
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function badgeHtml(status) {
  const map = {
    pending: `<span class="badge badge-pending"><i class="bi bi-clock-fill"></i> Pending</span>`,
    approved: `<span class="badge badge-approved"><i class="bi bi-check-circle-fill"></i> Approved</span>`,
    denied: `<span class="badge badge-denied"><i class="bi bi-x-circle-fill"></i> Denied</span>`
  };
  return map[status] || '';
}

// ===== KEYBOARD (jQuery) =====
$(document).ready(function () {
  // Login on Enter key
  $('#login-form').on('keypress', function (e) {
    if (e.key === 'Enter') handleLogin();
  });

  // Click outside modal to close
  $('.modal-overlay').on('click', function (e) {
    if ($(e.target).hasClass('modal-overlay')) {
      $(this).removeClass('active');
    }
  });
});
