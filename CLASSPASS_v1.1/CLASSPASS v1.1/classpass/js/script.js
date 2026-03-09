// ===== CLASSPASS v1.1 =====

// ===== DATA =====
const USERS = {
  student: {
    username: 'student', password: 'student123', role: 'student',
    name: 'Kurt Cortez', id: '2021-00123',
    email: 'kurtcortez@pcc.edu.ph', course: 'BS Information Technology',
    year: '2nd Year', section: 'BSIT-2C', phone: '+63 912 345 6789'
  },
  professor: {
    username: 'professor', password: 'professor123', role: 'professor',
    name: 'Dr. Greta Rosario', id: 'PROF-0042',
    email: 'greta.rosario@pcc.edu.ph', department: 'College of Information Technology',
    position: 'Associate Professor', phone: '+63 917 654 3210'
  }
};

const HOLIDAYS = [
  { name: "New Year's Day",      date: "January 1, 2026 (Thursday)",    img: "img/holidays/new_years_day.jpg",      desc: "Welcoming the start of a brand new year." },
  { name: "Maundy Thursday",     date: "April 2, 2026 (Thursday)",      img: "img/holidays/maundy_thursday.jpg",    desc: "Commemorating the Last Supper of Jesus Christ." },
  { name: "Good Friday",         date: "April 3, 2026 (Friday)",        img: "img/holidays/good_friday.jpg",        desc: "Remembering the crucifixion and death of Jesus." },
  { name: "Araw ng Kagitingan",  date: "April 9, 2026 (Thursday)",      img: "img/holidays/araw_ng_kagitingan.jpg", desc: "Day of Valor — honoring the Fall of Bataan heroes." },
  { name: "Labor Day",           date: "May 1, 2026 (Friday)",          img: "img/holidays/labor_day.jpg",          desc: "Celebrating the contributions of the Filipino workforce." },
  { name: "Independence Day",    date: "June 12, 2026 (Friday)",        img: "img/holidays/independence_day.jpg",   desc: "Marking the Philippine Declaration of Independence." },
  { name: "National Heroes Day", date: "August 31, 2026 (Monday)",      img: "img/holidays/national_heroes_day.jpg",desc: "Honoring all heroes who shaped the Filipino nation." },
  { name: "Bonifacio Day",       date: "November 30, 2026 (Monday)",    img: "img/holidays/bonifacio_day.jpg",      desc: "Celebrating the birth of Andres Bonifacio, Father of Revolution." },
  { name: "Christmas Day",       date: "December 25, 2026 (Friday)",    img: "img/holidays/christmas_day.jpg",      desc: "The most wonderful time of the year — the birth of Christ." },
  { name: "Rizal Day",           date: "December 30, 2026 (Wednesday)", img: "img/holidays/rizal_day.jpg",          desc: "Commemorating the martyrdom of Dr. José Rizal." }
];

const SUBJECTS = [
  { id: 'it113', code: 'IT-113', name: 'Web Development',         professor: 'Greta Rosario',    schedule: 'Sat 2:30 PM - 5:30 PM',       color: '#CC0000' },
  { id: 'it112', code: 'IT-112', name: 'Integrative Programming', professor: 'Almeda Asuncion',  schedule: 'Fri 12:00 NN - 3:00 PM',      color: '#3B82F6' },
  { id: 'it111', code: 'IT-111', name: 'Networking 2',            professor: 'June Charanguero', schedule: 'Mon & Fri 3:00 PM - 4:30 PM', color: '#10B981' },
  { id: 'it109', code: 'IT-109', name: 'Information Management',  professor: 'Celine Dormiendo', schedule: 'Sat 11:00 AM - 2:00 PM',      color: '#8B5CF6' }
];

const PROFESSOR_CLASSES = [
  { id: 'it113', code: 'IT-113', name: 'Web Development', section: 'BSIT-2C', students: 40, schedule: 'Sat 2:30 PM - 5:30 PM', color: '#CC0000' }
];

const REQUESTS = [
  { id: 'req001', studentId: 'student', studentName: 'Kurt Cortez', subjectId: 'it113', subjectName: 'Web Development',         date: '2026-02-10', reason: 'Medical appointment', status: 'approved', filed: '2026-02-09' },
  { id: 'req002', studentId: 'student', studentName: 'Kurt Cortez', subjectId: 'it112', subjectName: 'Integrative Programming', date: '2026-02-14', reason: 'Family emergency',    status: 'approved', filed: '2026-02-14' },
  { id: 'req003', studentId: 'student', studentName: 'Kurt Cortez', subjectId: 'it111', subjectName: 'Networking 2',            date: '2026-02-18', reason: 'Fever and flu',       status: 'pending',  filed: '2026-02-17' },
  { id: 'req004', studentId: 'student', studentName: 'Kurt Cortez', subjectId: 'it113', subjectName: 'Web Development',         date: '2026-02-20', reason: 'Dental appointment',  status: 'denied',   filed: '2026-02-19' },
  { id: 'req005', studentId: 'student', studentName: 'Kurt Cortez', subjectId: 'it109', subjectName: 'Information Management',  date: '2026-02-22', reason: 'School competition',  status: 'approved', filed: '2026-02-21' },
  { id: 'req006', studentId: 'student', studentName: 'Kurt Cortez', subjectId: 'it111', subjectName: 'Networking 2',            date: '2026-02-24', reason: 'Sick leave',          status: 'pending',  filed: '2026-02-23' }
];

// Current logged-in user
var currentUser = JSON.parse(sessionStorage.getItem('cp_user') || 'null');

// ===== LOADING SCREEN =====
function initLoadingScreen() {
  var ls = document.getElementById('loading-screen');
  if (!ls) return;
  setTimeout(function () {
    ls.classList.add('fade-out');
    setTimeout(function () {
      ls.style.display = 'none';
      document.querySelectorAll('.page-content').forEach(function (el) {
        el.style.display = 'flex';
      });
    }, 500);
  }, 2200);
}

// ===== LOGIN =====
function handleLogin() {
  var username = $('#username').val().trim();
  var password = $('#password').val();
  var user = USERS[username];

  if (!user || user.password !== password) {
    $('#login-error').text('Invalid username or password.').show();
    return;
  }

  $('#login-error').hide();
  sessionStorage.setItem('cp_user', JSON.stringify(user));
  $('#login-btn').text('Signing in...').prop('disabled', true);

  setTimeout(function () {
    window.location.href = user.role === 'student' ? 'student_home.html' : 'professor_home.html';
  }, 600);
}

// ===== AUTH GUARD =====
function requireAuth(role) {
  if (!currentUser || (role && currentUser.role !== role)) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

// ===== LOGOUT =====
function logout() {
  sessionStorage.removeItem('cp_user');
  window.location.href = 'login.html';
}

// ===== SIDEBAR =====
function setupSidebar(activeNav) {
  if (!currentUser) return;

  if (!$('#top-banner').length) {
    $('body').prepend('<div id="top-banner"><img src="logo.png" alt="PCC Logo" id="banner-logo"><span id="banner-text">Persons of Character and Competence</span></div>');
  }

  $('#sb-name').text(currentUser.name);
  $('#sb-role').text(currentUser.role === 'student' ? 'Student' : 'Professor');
  $('#sb-avatar').html('<i class="bi bi-person-fill"></i>');

  $('.nav-item').removeClass('active');
  $('.nav-item[data-nav="' + activeNav + '"]').addClass('active');
}

// ===== MODAL =====
function openModal(id)  { $('#' + id).addClass('active'); }
function closeModal(id) { $('#' + id).removeClass('active'); }

// ===== HOLIDAYS =====
function renderHolidays() {
  var container = $('#holidays-list');
  if (!container.length) return;
  var html = '<div class="holiday-cards-grid">';
  for (var i = 0; i < HOLIDAYS.length; i++) {
    var h = HOLIDAYS[i];
    html += '<div class="holiday-card">';
    html += '<div class="holiday-card-img-wrap"><img src="' + h.img + '" alt="' + h.name + '" onerror="this.style.display=\'none\'"></div>';
    html += '<div class="holiday-card-body">';
    html += '<div class="holiday-card-name">' + h.name + '</div>';
    html += '<div class="holiday-card-date"><i class="bi bi-calendar-event-fill"></i> ' + h.date + '</div>';
    html += '<div class="holiday-card-desc">' + h.desc + '</div>';
    html += '</div></div>';
  }
  html += '</div>';
  container.html(html);
}

// ===== STUDENT HOME STATS =====
function renderStudentStats() {
  var myReqs = REQUESTS.filter(function (r) { return r.studentId === 'student'; });
  $('#stat-total').text(myReqs.length);
  $('#stat-approved').text(myReqs.filter(function (r) { return r.status === 'approved'; }).length);
  $('#stat-pending').text(myReqs.filter(function (r) { return r.status === 'pending'; }).length);
}

// ===== SUBJECTS =====
function renderSubjects() {
  var container = $('#subjects-grid');
  if (!container.length) return;
  container.html(SUBJECTS.map(function (s) {
    return '<div class="subject-card">' +
      '<div class="subject-color-bar" style="background:' + s.color + '"></div>' +
      '<div class="subject-code">' + s.code + '</div>' +
      '<div class="subject-name">' + s.name + '</div>' +
      '<div class="subject-prof"><i class="bi bi-person"></i> ' + s.professor + '</div>' +
      '<div class="subject-footer">' +
        '<div class="subject-schedule"><i class="bi bi-clock"></i> ' + s.schedule + '</div>' +
        '<button class="btn-file-absence">File Absence</button>' +
      '</div></div>';
  }).join(''));
}

// ===== STUDENT REQUESTS =====
function renderRequests() {
  var container = $('#requests-list');
  if (!container.length) return;
  var reqs = REQUESTS.filter(function (r) { return r.studentId === 'student'; });
  reqs.sort(function (a, b) { return new Date(b.filed) - new Date(a.filed); });

  if (!reqs.length) {
    container.html('<div class="empty-state"><i class="bi bi-inbox"></i><p>No requests found.</p></div>');
    return;
  }
  container.html(reqs.map(function (r) {
    return '<div class="request-item" onclick="viewRequestDetail(\'' + r.id + '\', \'student\')">' +
      '<div><div class="request-subject">' + r.subjectName + '</div>' +
      '<div class="request-meta">Filed on ' + formatDate(r.filed) + '</div></div>' +
      '<div class="request-right"><div class="request-date">' + formatDate(r.date) + '</div>' +
      badgeHtml(r.status) + '<i class="bi bi-chevron-right" style="color:var(--text-light)"></i></div></div>';
  }).join(''));
}

// ===== REQUEST DETAIL MODAL =====
function viewRequestDetail(reqId) {
  var req = REQUESTS.find(function (r) { return r.id === reqId; });
  if (!req || !document.getElementById('detail-modal')) return;

  $('#detail-student').text(req.studentName);
  $('#detail-subject').text(req.subjectName);
  $('#detail-date').text(formatDate(req.date));
  $('#detail-filed').text(formatDate(req.filed));
  $('#detail-reason').text(req.reason);
  $('#detail-status').html(badgeHtml(req.status));
  $('#detail-actions').html('<button class="btn-primary" onclick="closeModal(\'detail-modal\')">Close</button>');

  openModal('detail-modal');
}

// ===== PROFESSOR CLASSES =====
function renderProfessorClasses() {
  var container = $('#class-grid');
  if (!container.length) return;
  container.html(PROFESSOR_CLASSES.map(function (c) {
    var classReqs = REQUESTS.filter(function (r) { return r.subjectId === c.id; });
    var pending  = classReqs.filter(function (r) { return r.status === 'pending'; }).length;
    var approved = classReqs.filter(function (r) { return r.status === 'approved'; }).length;
    return '<div class="class-card" onclick="openClassRequests(\'' + c.id + '\', \'' + c.name + '\')">' +
      '<div class="class-top">' +
        '<div class="class-icon" style="background:' + c.color + '"><i class="bi bi-journal-bookmark-fill"></i></div>' +
        '<div><div class="class-name">' + c.name + '</div><div class="class-code">' + c.code + ' — ' + c.section + '</div></div>' +
      '</div>' +
      '<div style="font-size:0.82rem;color:var(--text-light);margin-bottom:12px"><i class="bi bi-clock"></i> ' + c.schedule + '</div>' +
      '<div class="class-stats">' +
        '<div class="class-stat"><div class="class-stat-num">' + c.students + '</div><div class="class-stat-label">Students</div></div>' +
        '<div class="class-stat"><div class="class-stat-num" style="color:var(--amber)">' + pending + '</div><div class="class-stat-label">Pending</div></div>' +
        '<div class="class-stat"><div class="class-stat-num" style="color:var(--green)">' + approved + '</div><div class="class-stat-label">Approved</div></div>' +
      '</div></div>';
  }).join(''));
}

function openClassRequests(classId, className) {
  sessionStorage.setItem('cp_selected_class', JSON.stringify({ id: classId, name: className }));
  window.location.href = 'professor_requests.html';
}

// ===== PROFESSOR REQUESTS =====
function renderProfessorRequests() {
  var container = $('#requests-list');
  var cls = JSON.parse(sessionStorage.getItem('cp_selected_class') || 'null');
  if (!cls || !container.length) return;

  $('#class-title').text(cls.name);
  var reqs = REQUESTS.filter(function (r) { return r.subjectId === cls.id; });
  reqs.sort(function (a, b) { return new Date(b.filed) - new Date(a.filed); });

  if (!reqs.length) {
    container.html('<div class="empty-state"><i class="bi bi-inbox"></i><p>No requests for this class.</p></div>');
    return;
  }
  container.html(reqs.map(function (r) {
    return '<div class="request-item" onclick="viewRequestDetail(\'' + r.id + '\')">' +
      '<div><div class="request-subject">' + r.studentName + '</div>' +
      '<div class="request-meta">' + r.reason + ' · Filed ' + formatDate(r.filed) + '</div></div>' +
      '<div class="request-right"><div class="request-date">' + formatDate(r.date) + '</div>' +
      badgeHtml(r.status) + '<i class="bi bi-chevron-right" style="color:var(--text-light)"></i></div></div>';
  }).join(''));
}

// ===== PROFILE =====
function renderProfile() {
  if (!currentUser) return;
  $('#profile-avatar').html('<i class="bi bi-person-fill"></i><div class="overlay"><i class="bi bi-camera-fill"></i></div>');
  $('#prof-name').text(currentUser.name);
  $('#prof-id').text(currentUser.id);
  $('#prof-email').text(currentUser.email);
  $('#prof-phone').text(currentUser.phone);

  if (currentUser.role === 'student') {
    $('#prof-extra1-label').text('Course');        $('#prof-extra1').text(currentUser.course);
    $('#prof-extra2-label').text('Year & Section'); $('#prof-extra2').text(currentUser.year + ' — ' + currentUser.section);
  } else {
    $('#prof-extra1-label').text('Department'); $('#prof-extra1').text(currentUser.department);
    $('#prof-extra2-label').text('Position');   $('#prof-extra2').text(currentUser.position);
  }
}

// ===== HELPERS =====
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function badgeHtml(status) {
  var map = {
    pending:  '<span class="badge badge-pending"><i class="bi bi-clock-fill"></i> Pending</span>',
    approved: '<span class="badge badge-approved"><i class="bi bi-check-circle-fill"></i> Approved</span>',
    denied:   '<span class="badge badge-denied"><i class="bi bi-x-circle-fill"></i> Denied</span>'
  };
  return map[status] || '';
}

// ===== EVENTS =====
$(document).ready(function () {
  $('#login-form').on('keypress', function (e) {
    if (e.key === 'Enter') handleLogin();
  });
  $('.modal-overlay').on('click', function (e) {
    if ($(e.target).hasClass('modal-overlay')) $(this).removeClass('active');
  });
});
