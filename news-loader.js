/* news-loader.js
 * Fetches admin-created articles from Firestore and injects cards into the
 * news.html article grid AFTER the DOM is ready but before script.js filter
 * logic runs (script.js re-queries on each filter click, so late insertion is fine).
 */
(function () {
  if (typeof db === 'undefined') return;

  var grid = document.getElementById('filteredGrid');
  if (!grid) return;

  db.collection('articles').orderBy('dateIso', 'desc').get()
    .then(function (snapshot) {
      if (snapshot.empty) return;

      snapshot.docs.forEach(function (doc) {
        var art = doc.data();

        var card = document.createElement('article');
        card.className = 'article-card reveal-item visible';
        card.dataset.cat = art.category;

        var badge = document.createElement('span');
        badge.className = 'badge';
        badge.textContent = art.badgeDate || art.date;

        var img = document.createElement('img');
        img.src = art.img || 'images/560x360-41.jpg';
        img.alt = art.title;

        var h3 = document.createElement('h3');
        var h3Link = document.createElement('a');
        h3Link.href = 'article.html?slug=' + art.slug;
        h3Link.textContent = art.title;
        h3.appendChild(h3Link);

        var p = document.createElement('p');
        p.textContent = art.excerpt;

        var readMore = document.createElement('a');
        readMore.href = 'article.html?slug=' + art.slug;
        readMore.textContent = art.category === 'uu-dai' ? 'Xem chi tiết' : 'Đọc tiếp';

        card.appendChild(badge);
        card.appendChild(img);
        card.appendChild(h3);
        card.appendChild(p);
        card.appendChild(readMore);

        grid.insertBefore(card, grid.firstChild);
      });

      /* Apply the currently active filter tab to newly injected cards */
      var activeTab = document.querySelector('.filter-tab.is-active');
      if (activeTab && activeTab.dataset.filter !== 'all') {
        var filter = activeTab.dataset.filter;
        snapshot.docs.forEach(function (doc) {
          var slug = doc.data().slug;
          var card = grid.querySelector('[href$="slug=' + slug + '"]');
          if (card) {
            var parentCard = card.closest('.article-card');
            if (parentCard && parentCard.dataset.cat !== filter) {
              parentCard.style.display = 'none';
            }
          }
        });
      }
    })
    .catch(function (e) {
      console.warn('news-loader: could not fetch articles from Firestore', e);
    });
})();
