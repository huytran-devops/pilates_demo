(function () {
  var params = new URLSearchParams(window.location.search);
  var slug = params.get('slug');

  if (!slug) {
    window.location.href = 'news.html';
    return;
  }

  function getRelatedEntries(currentSlug, currentArticle, limit) {
    return Object.entries(ARTICLES)
      .filter(function (entry) { return entry[0] !== currentSlug; })
      .sort(function (a, b) {
        var aSameCategory = a[1].category === currentArticle.category ? 1 : 0;
        var bSameCategory = b[1].category === currentArticle.category ? 1 : 0;
        return bSameCategory - aSameCategory;
      })
      .slice(0, limit);
  }

  function renderArticle(art) {
    document.title = art.title + ' – Jee Pilates';

    var crumbTitle = document.getElementById('articleBreadcrumbTitle');
    if (crumbTitle) {
      crumbTitle.textContent = art.title.length > 60 ? art.title.slice(0, 57) + '…' : art.title;
    }

    var metaEl = document.getElementById('articleMeta');
    if (metaEl) {
      metaEl.className = 'flex items-center gap-3 flex-wrap';
      metaEl.innerHTML = '';

      var tag = document.createElement('span');
      tag.className = 'inline-block px-3 py-1 rounded-full bg-[#f0e0d3] text-xs font-semibold tracking-widest uppercase text-secondary';
      tag.textContent = art.categoryLabel || art.category;

      var dateSpan = document.createElement('span');
      dateSpan.className = 'text-sm text-on-surface-variant';
      dateSpan.textContent = art.date;

      metaEl.appendChild(tag);
      metaEl.appendChild(dateSpan);
    }

    var titleEl = document.getElementById('articleTitle');
    if (titleEl) {
      titleEl.textContent = art.title;
    }

    var heroImgEl = document.getElementById('articleHeroImg');
    if (heroImgEl) {
      heroImgEl.innerHTML = '';
      var img = document.createElement('img');
      img.src = art.img;
      img.alt = art.title;
      img.className = 'w-full h-full max-h-[500px] object-cover object-center';
      heroImgEl.appendChild(img);
    }

    var bodyEl = document.getElementById('articleBody');
    if (bodyEl) {
      bodyEl.innerHTML = '';
      (Array.isArray(art.content) ? art.content : []).forEach(function (block) {
        var el = document.createElement(block.type || 'p');
        el.textContent = block.text || '';
        bodyEl.appendChild(el);
      });
    }

    var sidebarLinks = document.getElementById('sidebarLinks');
    if (sidebarLinks) {
      sidebarLinks.innerHTML = '';
      getRelatedEntries(slug, art, 5).forEach(function (entry) {
        var key = entry[0];
        var linkedArticle = entry[1];
        var li = document.createElement('li');
        li.className = 'border-b border-warm-sand pb-3 last:border-0 last:pb-0';

        var link = document.createElement('a');
        link.href = 'article.html?slug=' + key;
        link.className = 'text-sm text-on-surface-variant hover:text-sage-deep transition-colors line-clamp-2';
        link.textContent = linkedArticle.title;

        li.appendChild(link);
        sidebarLinks.appendChild(li);
      });
    }

    var relatedEl = document.getElementById('relatedArticles');
    if (relatedEl) {
      relatedEl.innerHTML = '';
      getRelatedEntries(slug, art, 3).forEach(function (entry) {
        var key = entry[0];
        var relArt = entry[1];
        var thumbSrc = (relArt.img || '').replace('1100x560', '560x360') || relArt.img;

        var card = document.createElement('article');
        card.className = 'group bg-white rounded-2xl border border-warm-sand overflow-hidden hover:shadow-lg transition-shadow';

        var imgLink = document.createElement('a');
        imgLink.href = 'article.html?slug=' + key;
        imgLink.className = 'block overflow-hidden aspect-[16/9]';

        var cardImg = document.createElement('img');
        cardImg.src = thumbSrc;
        cardImg.alt = relArt.title;
        cardImg.className = 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-500';
        imgLink.appendChild(cardImg);

        var contentDiv = document.createElement('div');
        contentDiv.className = 'p-6 space-y-3';

        var h3 = document.createElement('h3');
        h3.className = 'font-serif text-lg font-semibold text-sage-deep leading-snug';

        var h3Link = document.createElement('a');
        h3Link.href = 'article.html?slug=' + key;
        h3Link.className = 'hover:opacity-70 transition-opacity';
        h3Link.textContent = relArt.title;
        h3.appendChild(h3Link);

        var excerpt = document.createElement('p');
        excerpt.className = 'text-sm text-on-surface-variant';
        excerpt.textContent = relArt.excerpt;

        var readMore = document.createElement('a');
        readMore.href = 'article.html?slug=' + key;
        readMore.textContent = 'Đọc tiếp →';
        readMore.className = 'inline-flex items-center text-sm font-semibold text-sage-deep gap-1 hover:gap-2 transition-all';

        contentDiv.appendChild(h3);
        contentDiv.appendChild(excerpt);
        contentDiv.appendChild(readMore);

        card.appendChild(imgLink);
        card.appendChild(contentDiv);
        relatedEl.appendChild(card);
      });
    }
  }

  if (ARTICLES[slug]) {
    renderArticle(ARTICLES[slug]);
    return;
  }

  if (typeof db === 'undefined') {
    window.location.href = 'news.html';
    return;
  }

  db.collection('articles').doc(slug).get()
    .then(function (doc) {
      if (doc.exists) {
        renderArticle(doc.data());
      } else {
        window.location.href = 'news.html';
      }
    })
    .catch(function () {
      window.location.href = 'news.html';
    });
})();
