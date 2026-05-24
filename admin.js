(function () {
  /* SHA-256 of "JeePilates@2026" — update hash to change the admin password */
  var PASS_HASH = '5165db33e0c6d0a56ec70ba392e518fd7603cc1bcdd516d1e3b9c2aa74245e06';
  var SESSION_KEY = 'jee_admin_auth';
  var COLL = 'articles';

  /* ── Crypto ── */
  async function sha256(str) {
    var buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf))
      .map(function (b) { return b.toString(16).padStart(2, '0'); })
      .join('');
  }

  /* ── Auth ── */
  function isLoggedIn() { return sessionStorage.getItem(SESSION_KEY) === '1'; }
  function logout() { sessionStorage.removeItem(SESSION_KEY); render(); }

  /* ── Firestore CRUD ── */
  async function fetchArticles() {
    var snapshot = await db.collection(COLL).orderBy('dateIso', 'desc').get();
    return snapshot.docs.map(function (doc) { return doc.data(); });
  }

  async function upsertArticle(data) {
    await db.collection(COLL).doc(data.slug).set(data);
  }

  async function removeArticle(slug) {
    await db.collection(COLL).doc(slug).delete();
  }

  /* ── Helpers ── */
  function toSlug(title) {
    var map = {
      à:'a',á:'a',ả:'a',ã:'a',ạ:'a',
      ă:'a',ắ:'a',ặ:'a',ằ:'a',ẳ:'a',ẵ:'a',
      â:'a',ấ:'a',ầ:'a',ẩ:'a',ẫ:'a',ậ:'a',
      è:'e',é:'e',ẻ:'e',ẽ:'e',ẹ:'e',
      ê:'e',ế:'e',ề:'e',ể:'e',ễ:'e',ệ:'e',
      ì:'i',í:'i',ỉ:'i',ĩ:'i',ị:'i',
      ò:'o',ó:'o',ỏ:'o',õ:'o',ọ:'o',
      ô:'o',ố:'o',ồ:'o',ổ:'o',ỗ:'o',ộ:'o',
      ơ:'o',ớ:'o',ờ:'o',ở:'o',ỡ:'o',ợ:'o',
      ù:'u',ú:'u',ủ:'u',ũ:'u',ụ:'u',
      ư:'u',ứ:'u',ừ:'u',ử:'u',ữ:'u',ự:'u',
      ỳ:'y',ý:'y',ỷ:'y',ỹ:'y',ỵ:'y',đ:'d'
    };
    return title.toLowerCase()
      .split('').map(function (c) { return map[c] || c; }).join('')
      .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
      + '-' + Date.now().toString(36);
  }

  function formatDateVi(iso) {
    var p = iso.split('-');
    return parseInt(p[2], 10) + ' Tháng ' + parseInt(p[1], 10) + ', ' + p[0];
  }

  function badgeDateVi(iso) {
    var p = iso.split('-');
    return parseInt(p[2], 10) + ' Th' + parseInt(p[1], 10);
  }

  function escapeHtml(str) {
    return (str || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ── Entry ── */
  function render() {
    var app = document.getElementById('adminApp');
    if (!app) return;
    isLoggedIn() ? renderDashboard(app) : renderLogin(app);
  }

  /* ── Login screen ── */
  function renderLogin(app) {
    app.innerHTML =
      '<div class="admin-login-wrap">' +
        '<div class="admin-card">' +
          '<a href="index.html" class="brand" style="margin-bottom:1.5rem;">' +
            '<span class="brand-mark">JEE</span>' +
            '<span class="brand-text">Jee Pilates</span>' +
          '</a>' +
          '<h2>Đăng nhập quản trị</h2>' +
          '<p class="admin-subtitle">Chỉ quản trị viên mới có thể truy cập.</p>' +
          '<form id="loginForm">' +
            '<div class="admin-field">' +
              '<label for="adminPass">Mật khẩu</label>' +
              '<input type="password" id="adminPass" placeholder="Nhập mật khẩu…" autocomplete="current-password" />' +
            '</div>' +
            '<div id="loginError" class="admin-error" style="display:none"></div>' +
            '<button type="submit" class="btn admin-full-btn">Đăng nhập</button>' +
          '</form>' +
          '<p style="margin-top:1.5rem;text-align:center;"><a href="index.html">← Về trang chủ</a></p>' +
        '</div>' +
      '</div>';

    document.getElementById('loginForm').addEventListener('submit', function (e) {
      e.preventDefault();
      sha256(document.getElementById('adminPass').value).then(function (hash) {
        if (hash === PASS_HASH) {
          sessionStorage.setItem(SESSION_KEY, '1');
          render();
        } else {
          var err = document.getElementById('loginError');
          err.textContent = 'Mật khẩu không đúng. Vui lòng thử lại.';
          err.style.display = 'block';
        }
      });
    });
  }

  /* ── Dashboard ── */
  async function renderDashboard(app) {
    /* Toolbar renders immediately; article list shows a loader */
    app.innerHTML =
      '<div class="admin-dashboard">' +
        '<div class="admin-toolbar container">' +
          '<div class="admin-toolbar-left">' +
            '<a href="index.html" class="brand"><span class="brand-mark">JEE</span><span class="brand-text">Jee Pilates</span></a>' +
            '<span class="admin-badge-label">Quản trị</span>' +
          '</div>' +
          '<div class="admin-toolbar-actions">' +
            '<a href="news.html" class="btn btn-outline btn-small" target="_blank">Xem trang tin tức</a>' +
            '<button class="btn btn-small" id="newArticleBtn">+ Thêm bài viết</button>' +
            '<button class="btn btn-outline btn-small" id="logoutBtn">Đăng xuất</button>' +
          '</div>' +
        '</div>' +
        '<div class="container admin-content">' +
          '<div id="articleForm" style="display:none"></div>' +
          '<div id="articleListWrap"><p class="admin-loading">⏳ Đang tải danh sách bài viết…</p></div>' +
        '</div>' +
      '</div>';

    document.getElementById('logoutBtn').addEventListener('click', logout);
    document.getElementById('newArticleBtn').addEventListener('click', function () { showArticleForm(); });

    var articles;
    try {
      articles = await fetchArticles();
    } catch (e) {
      document.getElementById('articleListWrap').innerHTML =
        '<p class="admin-error">⚠️ Lỗi kết nối Firestore: ' + escapeHtml(e.message) + '</p>';
      return;
    }

    var rows = articles.length === 0
      ? '<p class="admin-empty">Chưa có bài viết nào. Hãy tạo bài đầu tiên!</p>'
      : articles.map(function (art, i) {
          return '<div class="admin-article-row" data-slug="' + escapeHtml(art.slug) + '">' +
            '<div class="admin-article-info">' +
              '<span class="badge admin-badge-' + escapeHtml(art.category) + '">' + escapeHtml(art.categoryLabel || art.category) + '</span>' +
              '<div>' +
                '<strong class="admin-article-title">' + escapeHtml(art.title) + '</strong>' +
                '<span class="admin-article-date">' + escapeHtml(art.date) + '</span>' +
              '</div>' +
            '</div>' +
            '<div class="admin-article-actions">' +
              '<button class="btn btn-small edit-btn" data-idx="' + i + '">Sửa</button>' +
              '<button class="btn btn-small btn-danger del-btn" data-slug="' + escapeHtml(art.slug) + '">Xóa</button>' +
            '</div>' +
          '</div>';
        }).join('');

    document.getElementById('articleListWrap').innerHTML =
      '<div class="admin-list-header"><h2>Bài viết đã đăng <span class="admin-count">(' + articles.length + ')</span></h2></div>' +
      '<div id="articleList">' + rows + '</div>';

    /* Attach row-level event listeners */
    document.querySelectorAll('.edit-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { showArticleForm(parseInt(this.dataset.idx, 10), articles); });
    });
    document.querySelectorAll('.del-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { deleteArticle(this.dataset.slug); });
    });
  }

  /* ── Article form ── */
  function showArticleForm(editIndex, articles) {
    var isEdit = editIndex !== null && editIndex !== undefined && articles;
    var art = isEdit ? articles[editIndex] : null;
    var today = new Date().toISOString().slice(0, 10);
    var blocks = art ? art.content : [{ type: 'p', text: '' }];

    var formEl = document.getElementById('articleForm');
    formEl.style.display = 'block';
    formEl.innerHTML =
      '<div class="admin-card admin-form-card">' +
        '<h3>' + (isEdit ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới') + '</h3>' +
        '<div class="admin-field">' +
          '<label>Tiêu đề *</label>' +
          '<input type="text" id="fTitle" value="' + escapeHtml(art ? art.title : '') + '" placeholder="Nhập tiêu đề bài viết…" />' +
        '</div>' +
        '<div class="admin-field-row">' +
          '<div class="admin-field"><label>Danh mục *</label><select id="fCategory">' +
            '<option value="news"' + ((!art || art.category === 'news') ? ' selected' : '') + '>Tin tức</option>' +
            '<option value="uu-dai"' + ((art && art.category === 'uu-dai') ? ' selected' : '') + '>Ưu đãi</option>' +
          '</select></div>' +
          '<div class="admin-field"><label>Ngày đăng *</label><input type="date" id="fDate" value="' + (art ? art.dateIso : today) + '" /></div>' +
        '</div>' +
        '<div class="admin-field"><label>Tóm tắt *</label>' +
          '<textarea id="fExcerpt" rows="2" placeholder="Mô tả ngắn hiển thị trong thẻ bài viết…">' + escapeHtml(art ? art.excerpt : '') + '</textarea>' +
        '</div>' +
        '<div class="admin-field"><label>URL ảnh bìa <span class="admin-hint">(tùy chọn)</span></label>' +
          '<input type="text" id="fImg" value="' + escapeHtml(art ? art.img : '') + '" placeholder="images/1100x560-xx.jpg hoặc URL đầy đủ…" />' +
        '</div>' +
        '<div class="admin-field"><label>Nội dung bài viết</label>' +
          '<div id="contentBlocks">' + blocks.map(function (b, bi) { return renderBlock(b, bi); }).join('') + '</div>' +
          '<div class="admin-block-btns">' +
            '<button type="button" class="btn btn-small" id="addPara">+ Đoạn văn</button>' +
            '<button type="button" class="btn btn-small btn-outline" id="addHeading">+ Tiêu đề phụ</button>' +
          '</div>' +
        '</div>' +
        '<div class="admin-form-footer">' +
          '<button type="button" class="btn" id="saveArticleBtn">' + (isEdit ? 'Lưu thay đổi' : 'Đăng bài viết') + '</button>' +
          '<button type="button" class="btn btn-outline" id="cancelFormBtn">Hủy</button>' +
        '</div>' +
      '</div>';

    formEl.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('addPara').addEventListener('click', function () { addBlock('p'); });
    document.getElementById('addHeading').addEventListener('click', function () { addBlock('h3'); });
    document.getElementById('cancelFormBtn').addEventListener('click', function () { formEl.style.display = 'none'; });
    document.getElementById('saveArticleBtn').addEventListener('click', function () {
      saveArticle(isEdit ? art.slug : null);
    });
    bindRemoveButtons();
  }

  function renderBlock(block, index) {
    var label = block.type === 'h3' ? '📌 Tiêu đề phụ' : '📝 Đoạn văn';
    return '<div class="content-block" data-type="' + block.type + '" data-index="' + index + '">' +
      '<div class="content-block-header">' +
        '<span class="content-block-label">' + label + '</span>' +
        '<button type="button" class="remove-block-btn" title="Xóa khối này">✕</button>' +
      '</div>' +
      '<textarea class="block-text" rows="' + (block.type === 'h3' ? '1' : '3') + '"' +
        ' placeholder="' + (block.type === 'h3' ? 'Nhập tiêu đề phụ…' : 'Nhập nội dung đoạn văn…') + '">' +
        escapeHtml(block.text) +
      '</textarea>' +
    '</div>';
  }

  function addBlock(type) {
    var container = document.getElementById('contentBlocks');
    var count = container.querySelectorAll('.content-block').length;
    var tmp = document.createElement('div');
    tmp.innerHTML = renderBlock({ type: type, text: '' }, count);
    container.appendChild(tmp.firstElementChild);
    bindRemoveButtons();
  }

  function bindRemoveButtons() {
    document.querySelectorAll('.remove-block-btn').forEach(function (btn) {
      btn.onclick = function () { this.closest('.content-block').remove(); };
    });
  }

  async function saveArticle(existingSlug) {
    var title = document.getElementById('fTitle').value.trim();
    var category = document.getElementById('fCategory').value;
    var dateIso = document.getElementById('fDate').value;
    var excerpt = document.getElementById('fExcerpt').value.trim();
    var img = document.getElementById('fImg').value.trim();

    if (!title || !excerpt || !dateIso) {
      alert('Vui lòng điền đầy đủ tiêu đề, tóm tắt và ngày đăng.');
      return;
    }

    var content = [];
    document.querySelectorAll('#contentBlocks .content-block').forEach(function (block) {
      var text = block.querySelector('.block-text').value.trim();
      if (text) content.push({ type: block.dataset.type, text: text });
    });

    var articleData = {
      slug: existingSlug || toSlug(title),
      title: title,
      category: category,
      categoryLabel: category === 'uu-dai' ? 'Ưu đãi' : 'Tin tức',
      dateIso: dateIso,
      date: formatDateVi(dateIso),
      badgeDate: badgeDateVi(dateIso),
      excerpt: excerpt,
      img: img || 'images/1100x560-41.jpg',
      content: content
    };

    var btn = document.getElementById('saveArticleBtn');
    btn.textContent = 'Đang lưu…';
    btn.disabled = true;

    try {
      await upsertArticle(articleData);
      document.getElementById('articleForm').style.display = 'none';
      renderDashboard(document.getElementById('adminApp'));
    } catch (e) {
      btn.textContent = existingSlug ? 'Lưu thay đổi' : 'Đăng bài viết';
      btn.disabled = false;
      alert('Lỗi khi lưu bài viết: ' + e.message);
    }
  }

  async function deleteArticle(slug) {
    if (!confirm('Bạn có chắc muốn xóa bài viết này không?')) return;
    try {
      await removeArticle(slug);
      renderDashboard(document.getElementById('adminApp'));
    } catch (e) {
      alert('Lỗi khi xóa: ' + e.message);
    }
  }

  document.addEventListener('DOMContentLoaded', render);
})();
