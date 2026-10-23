/* ================================================
   Good Reads — rendering, search and filtering
   Data comes from window.GoodReadsData (resources.js).
   Everything is scoped inside this IIFE so it cannot
   collide with the top-level declarations in js/main.js.
   ================================================ */
(function () {
    'use strict';

    var data = window.GoodReadsData;
    if (!data) return;

    var categories = data.categories;
    var resources = data.resources;
    var categoryById = {};
    var resourceById = {};

    categories.forEach(function (c) { categoryById[c.id] = c; });
    resources.forEach(function (r) { resourceById[r.id] = r; });

    var TYPE_LABELS = {
        paper: 'Paper',
        essay: 'Essay',
        talk: 'Talk',
        book: 'Book',
        course: 'Course',
        tutorial: 'Tutorial',
        code: 'Code',
        reference: 'Reference'
    };

    var state = { category: 'all', query: '' };

    /* ---------- Small DOM helpers (text only, never innerHTML) ---------- */
    function el(tag, className, text) {
        var node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined && text !== null) node.textContent = String(text);
        return node;
    }

    function externalLink(href, text, className) {
        var a = el('a', className, text);
        a.href = href;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        return a;
    }

    function normalize(str) {
        return String(str)
            .toLowerCase()
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '');
    }

    /* Precompute a search string for each resource */
    var haystacks = {};
    resources.forEach(function (r) {
        var cat = categoryById[r.category];
        haystacks[r.id] = normalize([
            r.title,
            r.authors,
            r.venue,
            r.year,
            r.type,
            r.difficulty || '',
            (r.tags || []).join(' '),
            cat ? cat.title + ' ' + cat.short : '',
            r.description
        ].join(' '));
    });

    function matches(r) {
        if (state.category !== 'all' && r.category !== state.category) return false;
        if (!state.query) return true;
        var hay = haystacks[r.id];
        var terms = normalize(state.query).split(/\s+/).filter(Boolean);
        for (var i = 0; i < terms.length; i++) {
            if (hay.indexOf(terms[i]) === -1) return false;
        }
        return true;
    }

    /* ---------- Card ---------- */
    function renderCard(r) {
        var card = el('article', 'gr-card');
        card.id = 'r-' + r.id;
        card.tabIndex = -1;
        if (r.featured) card.classList.add('gr-card--featured');

        var meta = el('p', 'gr-card-meta');
        meta.appendChild(el('span', 'gr-card-type', TYPE_LABELS[r.type] || r.type));
        meta.appendChild(el('span', 'gr-card-year', r.year));
        if (r.difficulty) {
            var diff = el('span', 'gr-card-difficulty', r.difficulty);
            diff.title = 'Approximate background needed (a rough guide, not a judgment of quality)';
            meta.appendChild(diff);
        }
        card.appendChild(meta);

        var title = el('h4', 'gr-card-title');
        var link = externalLink(r.url, r.title);
        title.appendChild(link);
        card.appendChild(title);

        card.appendChild(el('p', 'gr-card-authors', r.authors));
        if (r.venue) card.appendChild(el('p', 'gr-card-venue', r.venue));
        card.appendChild(el('p', 'gr-card-desc', r.description));

        var footer = el('div', 'gr-card-footer');
        if (r.tags && r.tags.length) {
            var tags = el('ul', 'gr-card-tags');
            tags.setAttribute('aria-label', 'Tags');
            r.tags.forEach(function (t) {
                var li = el('li', 'tag' + (t === 'Start Here' ? ' gr-tag-start' : ''), t);
                tags.appendChild(li);
            });
            footer.appendChild(tags);
        }
        var open = externalLink(r.url, 'Read', 'gr-card-open');
        open.setAttribute('aria-label', 'Open “' + r.title + '” (opens in a new tab)');
        footer.appendChild(open);
        card.appendChild(footer);

        return card;
    }

    /* ---------- Library ---------- */
    var groupsEl = document.getElementById('gr-groups');
    var countEl = document.getElementById('gr-count');
    var emptyEl = document.getElementById('gr-empty');
    var emptyTextEl = document.getElementById('gr-empty-text');
    var searchEl = document.getElementById('gr-search');
    var chipsEl = document.getElementById('gr-chips');

    var groupNodes = {};
    var cardNodes = {};

    function buildLibrary() {
        categories.forEach(function (cat) {
            var items = resources.filter(function (r) { return r.category === cat.id; });
            if (!items.length) return;

            var section = el('section', 'gr-group');
            section.id = cat.id;
            section.setAttribute('aria-labelledby', cat.id + '-title');

            var head = el('div', 'gr-group-head');
            var h3 = el('h3', 'gr-group-title', cat.title);
            h3.id = cat.id + '-title';
            head.appendChild(h3);
            var countSpan = el('span', 'gr-group-count');
            head.appendChild(countSpan);
            section.appendChild(head);
            section.appendChild(el('p', 'gr-group-intro', cat.intro));

            var grid = el('div', 'gr-grid');
            items.forEach(function (r) {
                var card = renderCard(r);
                cardNodes[r.id] = card;
                grid.appendChild(card);
            });
            section.appendChild(grid);
            groupsEl.appendChild(section);
            groupNodes[cat.id] = { section: section, count: countSpan, total: items.length };
        });
    }

    function buildChips() {
        var all = [{ id: 'all', short: 'All', count: resources.length }].concat(
            categories.map(function (c) {
                return {
                    id: c.id,
                    short: c.short,
                    count: resources.filter(function (r) { return r.category === c.id; }).length
                };
            })
        );
        all.forEach(function (c) {
            var btn = el('button', 'gr-chip');
            btn.type = 'button';
            btn.dataset.category = c.id;
            btn.appendChild(el('span', null, c.short));
            btn.appendChild(el('span', 'gr-chip-count', c.count));
            btn.setAttribute('aria-label', c.id === 'all'
                ? 'Show all categories (' + c.count + ' resources)'
                : 'Show ' + categoryById[c.id].title + ' (' + c.count + ' resources)');
            btn.addEventListener('click', function () {
                setCategory(c.id, true);
            });
            chipsEl.appendChild(btn);
        });
    }

    function update() {
        var visible = 0;
        Object.keys(groupNodes).forEach(function (catId) {
            var g = groupNodes[catId];
            var shown = 0;
            resources.forEach(function (r) {
                if (r.category !== catId) return;
                var ok = matches(r);
                cardNodes[r.id].hidden = !ok;
                if (ok) shown++;
            });
            g.section.hidden = shown === 0;
            g.count.textContent = shown === g.total
                ? g.total + (g.total === 1 ? ' entry' : ' entries')
                : shown + ' of ' + g.total;
            visible += shown;
        });

        var filtered = state.category !== 'all' || state.query;
        countEl.textContent = filtered
            ? 'Showing ' + visible + ' of ' + resources.length + ' resources'
            : resources.length + ' resources';

        emptyEl.hidden = visible !== 0;
        if (visible === 0) {
            var where = state.category === 'all' ? '' : ' in ' + categoryById[state.category].title;
            emptyTextEl.textContent = state.query
                ? 'Nothing matches “' + state.query + '”' + where + '.'
                : 'Nothing to show' + where + '.';
        }

        Array.prototype.forEach.call(chipsEl.querySelectorAll('.gr-chip'), function (btn) {
            btn.setAttribute('aria-pressed', btn.dataset.category === state.category ? 'true' : 'false');
        });
    }

    function setCategory(id, updateHash) {
        state.category = categoryById[id] ? id : 'all';
        update();
        if (updateHash && window.history && window.history.replaceState) {
            var url = window.location.pathname + window.location.search +
                (state.category === 'all' ? '' : '#' + state.category);
            window.history.replaceState(null, '', url);
        }
    }

    /* ---------- Reading paths ---------- */
    function buildPaths() {
        var container = document.getElementById('gr-paths');
        if (!container) return;
        data.paths.forEach(function (p, i) {
            var card = el('article', 'gr-path');
            card.appendChild(el('p', 'gr-path-index', String(i + 1).padStart(2, '0')));
            card.appendChild(el('h3', 'gr-path-title', p.title));
            card.appendChild(el('p', 'gr-path-blurb', p.blurb));

            var list = el('ol', 'gr-path-steps');
            p.steps.forEach(function (id) {
                var r = resourceById[id];
                if (!r) return;
                var li = el('li');
                var a = el('a', null, r.title);
                a.href = '#r-' + r.id;
                li.appendChild(a);
                li.appendChild(el('span', 'gr-path-step-meta', r.authors.split(',')[0] + ', ' + r.year));
                list.appendChild(li);
            });
            card.appendChild(list);

            var more = el('p', 'gr-path-more');
            more.appendChild(document.createTextNode('Browse: '));
            p.categories.forEach(function (cid, j) {
                var cat = categoryById[cid];
                if (!cat) return;
                if (j > 0) more.appendChild(document.createTextNode(' · '));
                var a = el('a', null, cat.short);
                a.href = '#' + cid;
                more.appendChild(a);
            });
            card.appendChild(more);
            container.appendChild(card);
        });
    }

    /* ---------- People ---------- */
    function buildPeople() {
        var container = document.getElementById('gr-people');
        if (!container) return;
        data.people.forEach(function (person) {
            var card = el('article', 'gr-person');
            card.appendChild(el('h3', 'gr-person-name', person.name));
            card.appendChild(el('p', 'gr-person-role', person.role));

            var themes = el('ul', 'gr-person-themes');
            themes.setAttribute('aria-label', 'Themes');
            person.themes.forEach(function (t) { themes.appendChild(el('li', null, t)); });
            card.appendChild(themes);

            var links = el('ul', 'gr-person-links');
            person.links.forEach(function (l) {
                var li = el('li');
                li.appendChild(externalLink(l.url, l.label));
                links.appendChild(li);
            });
            card.appendChild(links);
            container.appendChild(card);
        });
    }

    /* ---------- Hash navigation (#category or #r-resource) ---------- */
    var reduceMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function scrollToNode(node, focus) {
        node.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        if (focus) node.focus({ preventScroll: true });
    }

    function handleHash(isInitial) {
        var hash = decodeURIComponent(window.location.hash.replace(/^#/, ''));
        if (!hash) return;

        if (categoryById[hash]) {
            state.category = hash;
            update();
            if (!isInitial) scrollToNode(document.getElementById('library'), false);
            else document.getElementById('library').scrollIntoView();
            return;
        }

        if (hash.indexOf('r-') === 0 && resourceById[hash.slice(2)]) {
            var card = cardNodes[hash.slice(2)];
            if (card.hidden || card.parentNode.parentNode.hidden) {
                state.category = 'all';
                state.query = '';
                searchEl.value = '';
                update();
            }
            card.classList.remove('gr-card--target');
            void card.offsetWidth;
            card.classList.add('gr-card--target');
            scrollToNode(card, true);
        }
    }

    /* ---------- Init ---------- */
    buildPaths();
    buildChips();
    buildLibrary();
    buildPeople();

    var updatedEl = document.getElementById('gr-updated');
    if (updatedEl && data.lastUpdated) updatedEl.textContent = data.lastUpdated;
    var totalEl = document.getElementById('gr-total');
    if (totalEl) totalEl.textContent = resources.length;

    searchEl.addEventListener('input', function () {
        state.query = searchEl.value.trim();
        update();
    });

    searchEl.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && searchEl.value) {
            searchEl.value = '';
            state.query = '';
            update();
        }
    });

    document.getElementById('gr-reset').addEventListener('click', function () {
        searchEl.value = '';
        state.query = '';
        setCategory('all', true);
        searchEl.focus();
    });

    /* "/" focuses search, unless the user is already typing somewhere */
    document.addEventListener('keydown', function (e) {
        if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
        var t = e.target;
        if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
        e.preventDefault();
        searchEl.focus();
    });

    update();
    handleHash(true);
    window.addEventListener('hashchange', function () { handleHash(false); });

    /* Re-clicking a link to the current hash fires no hashchange; handle it directly */
    document.addEventListener('click', function (e) {
        var a = e.target.closest && e.target.closest('a[href^="#"]');
        if (!a || a.getAttribute('href') !== window.location.hash) return;
        e.preventDefault();
        handleHash(false);
    });
})();
