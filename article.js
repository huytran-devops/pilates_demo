(function () {
  var params = new URLSearchParams(window.location.search);
  var slug = params.get('slug');

  if (!slug || !ARTICLES[slug]) {
    window.location.href = 'tin-tuc.html';
    return;
  }

  var art = ARTICLES[slug];

  // Page title
  document.title = art.title + ' – Jee Pilates';

  // Breadcrumb
  var crumbTitle = document.getElementById('articleBreadcrumbTitle');
  if (crumbTitle) {
    // Truncate long titles in breadcrumb
    crumbTitle.textContent = art.title.length > 60 ? art.title.slice(0, 57) + '…' : art.title;
  }

  // Meta (category tag + date)
  var metaEl = document.getElementById('articleMeta');
  if (metaEl) {
    var tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = art.category;

    var dateSpan = document.createElement('span');
    dateSpan.className = 'article-date';
    dateSpan.textContent = art.date;

    metaEl.appendChild(tag);
    metaEl.appendChild(dateSpan);
  }

  // Heading
  var titleEl = document.getElementById('articleTitle');
  if (titleEl) titleEl.textContent = art.title;

  // Hero image
  var heroImgEl = document.getElementById('articleHeroImg');
  if (heroImgEl) {
    var img = document.createElement('img');
    img.src = art.img;
    img.alt = art.title;
    heroImgEl.appendChild(img);
  }

  // Article body
  var bodyEl = document.getElementById('articleBody');
  if (bodyEl) {
    art.content.forEach(function (block) {
      var el = document.createElement(block.type);
      el.textContent = block.text;
      bodyEl.appendChild(el);
    });
  }

  // Sidebar: quick links to other articles
  var sidebarLinks = document.getElementById('sidebarLinks');
  if (sidebarLinks) {
    Object.entries(ARTICLES)
      .filter(function (entry) { return entry[0] !== slug; })
      .slice(0, 5)
      .forEach(function (entry) {
        var key = entry[0];
        var a = ARTICLES[key];
        var li = document.createElement('li');
        var link = document.createElement('a');
        link.href = 'article.html?slug=' + key;
        link.textContent = a.title;
        li.appendChild(link);
        sidebarLinks.appendChild(li);
      });
  }

  // Related articles (3 cards)
  var relatedEl = document.getElementById('relatedArticles');
  if (relatedEl) {
    Object.entries(ARTICLES)
      .filter(function (entry) { return entry[0] !== slug; })
      .slice(0, 3)
      .forEach(function (entry) {
        var key = entry[0];
        var relArt = ARTICLES[key];
        var thumbSrc = relArt.img.replace('1100/560', '560/360');

        var card = document.createElement('article');
        card.className = 'article-card reveal-item';

        var imgLink = document.createElement('a');
        imgLink.href = 'article.html?slug=' + key;
        var cardImg = document.createElement('img');
        cardImg.src = thumbSrc;
        cardImg.alt = relArt.title;
        imgLink.appendChild(cardImg);

        var h3 = document.createElement('h3');
        var h3Link = document.createElement('a');
        h3Link.href = 'article.html?slug=' + key;
        h3Link.textContent = relArt.title;
        h3.appendChild(h3Link);

        var excerpt = document.createElement('p');
        excerpt.textContent = relArt.excerpt;

        var readMore = document.createElement('a');
        readMore.href = 'article.html?slug=' + key;
        readMore.textContent = 'Đọc tiếp';

        card.appendChild(imgLink);
        card.appendChild(h3);
        card.appendChild(excerpt);
        card.appendChild(readMore);

        relatedEl.appendChild(card);
      });
  }
})();
