if (window.Prism) {
  Prism.hooks.add('before-highlightall', () => {
    Prism.languages.rshtml = Prism.languages.extend('markup', {});
    Prism.languages.insertBefore('rshtml', 'tag', {
      'rshtml-block': {
        pattern: /@(?:if|for|match|raw|else|use|extends|section)\b[\s\S]*?\{[\s\S]*?\}|@(?:render_body|child_content)\b/g,
        inside: {
          'keyword': { pattern: /^@\w+/ },
          'rust-content': { pattern: /[\s\S]+/, inside: Prism.languages.rust }
        }
      },
      'rshtml-paren-expression': {
        pattern: /@\((?:[^()]|\([^()]*\))*\)/g,
        inside: {
          'punctuation': /^@\(|\)$/,
          'rust-content': { pattern: /[\s\S]+/, inside: Prism.languages.rust }
        }
      },
      'rshtml-simple-expression': {
        pattern: /@[a-zA-Z_][\w.]*/g,
        inside: {
          'punctuation': /^@/,
          'rust-content': { pattern: /[\s\S]+/, inside: Prism.languages.rust }
        }
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.content h3').forEach((el) => {
    if (!el.id) {
      el.id = el.textContent.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    }
  });

  if (window.tocbot) {
    tocbot.init({
      tocSelector: '.toc',
      contentSelector: '.content',
      headingSelector: 'h2, h3',
      hasInnerContainers: true,
      scrollSmooth: true,
      scrollSmoothOffset: -76,
      headingsOffset: 80,
      activeLinkClass: 'is-active-link',
      listClass: 'toc-list',
      linkClass: 'toc-link'
    });
  }

  const stickyNav = document.querySelector('.sticky-nav');
  const heroMain = document.querySelector('.hero-main');
  if (stickyNav && heroMain && 'IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      stickyNav.classList.toggle('visible', !entries[0].isIntersecting);
    }, { threshold: 0 });
    navObserver.observe(heroMain);
  }

  const toggleBtn = document.querySelector('.toc-toggle');
  const toc = document.querySelector('.toc-container');
  const body = document.body;

  const closeToc = () => {
    toc.classList.remove('open');
    body.classList.remove('toc-open');
  };

  if (toggleBtn && toc) {
    toggleBtn.addEventListener('click', () => {
      toc.classList.toggle('open');
      body.classList.toggle('toc-open');
    });

    document.addEventListener('click', (event) => {
      if (!toc.contains(event.target) && !toggleBtn.contains(event.target) && toc.classList.contains('open')) {
        closeToc();
      }
    });

    toc.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeToc();
    });
  }

  try { localStorage.removeItem('rshtml-theme'); } catch (e) {}

  const prismLight = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css';
  const prismDark = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css';
  const prismLink = document.getElementById('prism-theme');
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const isDarkActive = () => {
    const explicit = document.documentElement.getAttribute('data-theme');
    if (explicit === 'dark') return true;
    if (explicit === 'light') return false;
    return darkQuery.matches;
  };

  const syncPrismTheme = () => {
    if (prismLink) {
      prismLink.href = isDarkActive() ? prismDark : prismLight;
    }
  };

  syncPrismTheme();
  darkQuery.addEventListener('change', () => {
    document.documentElement.removeAttribute('data-theme');
    syncPrismTheme();
  });

  document.querySelectorAll('.js-theme-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = isDarkActive() ? 'light' : 'dark';
      if ((next === 'dark') === darkQuery.matches) {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', next);
      }
      syncPrismTheme();
    });
  });

  const installBox = document.getElementById('hero-install');
  if (installBox) {
    let copyTimer;
    installBox.addEventListener('click', () => {
      const cmd = 'cargo add rshtml';
      const markCopied = () => {
        installBox.classList.add('copied');
        clearTimeout(copyTimer);
        copyTimer = setTimeout(() => installBox.classList.remove('copied'), 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(cmd).then(markCopied).catch(markCopied);
      } else {
        const ta = document.createElement('textarea');
        ta.value = cmd;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
        markCopied();
      }
    });
  }
});
