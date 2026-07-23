(function () {
  'use strict';

  const PAGES = [
    { href: '/pages/bubbles.html',  label: 'Бульбашки', key: 'bubbles.html' },
    { href: '/pages/karta.html',    label: 'Карта',      key: 'karta.html' },
    { href: '/pages/hrid.html',     label: 'Грід',       key: 'hrid.html' },
    { href: '/pages/praktyky.html', label: 'Практики',   key: 'praktyky.html' },
    { href: '/pages/arkhiv.html',   label: 'Архів',      key: 'arkhiv.html' },
    { href: '/pages/knygy.html',    label: 'Книги',      key: 'knygy.html' },
  ];

  const current = window.location.pathname.split('/').pop() || 'index.html';

  const style = document.createElement('style');
  style.textContent = `
    #site-nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 900;
      background: var(--paper, #fff);
      border-bottom: 1.5px solid var(--oat, #E3DACC);
      height: 48px;
    }
    .nav-inner {
      max-width: 1100px; margin: 0 auto; padding: 0 52px;
      height: 48px; display: flex; align-items: center; justify-content: space-between;
    }
    .nav-logo {
      font-family: var(--mono, monospace); font-size: 13px;
      color: var(--clay, #D97757); text-decoration: none; letter-spacing: 0.02em; font-weight: 600;
    }
    .nav-logo:hover { opacity: 0.8; }
    .nav-links { display: flex; gap: 4px; }
    .nav-link {
      padding: 6px 14px; border-radius: 999px; font-size: 13px; text-decoration: none;
      color: var(--g700, #3D3D3A); transition: all 0.15s;
    }
    .nav-link:hover { background: var(--g100, #F0EEE6); }
    .nav-link.active {
      color: var(--clay, #D97757);
      background: var(--clay-l, #FDF0EB);
    }
    @media (max-width: 768px) {
      .nav-inner { padding: 0 16px; }
      .nav-link { padding: 6px 10px; font-size: 12.5px; }
    }
  `;
  document.head.appendChild(style);

  const nav = document.createElement('nav');
  nav.id = 'site-nav';
  nav.innerHTML = `
    <div class="nav-inner">
      <a class="nav-logo" href="/">@imatrofAI</a>
      <div class="nav-links">
        ${PAGES.map(p => `<a href="${p.href}" class="nav-link${current === p.key ? ' active' : ''}">${p.label}</a>`).join('')}
      </div>
    </div>
  `;

  document.body.insertBefore(nav, document.body.firstChild);
  document.body.style.paddingTop = '48px';
})();
