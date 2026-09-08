"""Keep the navigation, footer and theme reference identical across static pages."""
from pathlib import Path
import re
ROOT = Path(__file__).resolve().parents[1]
VERSION = '20260908-chapter-covers'
ROUTES = [('index.html','首页'),('portfolio.html','作品'),('blog.html','博客'),('books.html','书架'),('travel.html','旅行'),('about.html','关于我')]
MORE = [('now.html','NOW · 此刻'),('game.html','小游戏'),('guestbook.html','留言板')]

def header(page):
    active = 'blog.html' if page.startswith('blog-detail') else 'books.html' if page.startswith('book-note') else page
    links = ''.join(f'<a href="{path}"'+(' aria-current="page"' if path==active else '')+f'>{label}</a>' for path,label in ROUTES)
    more = ''.join(f'<a href="{path}"'+(' aria-current="page"' if path==active else '')+f'>{label}</a>' for path,label in MORE)
    return f'''<!-- SITE HEADER -->
<header class="site-header"><div class="site-bar">
  <a class="site-brand" href="index.html" aria-label="BeeDog 首页"><span class="site-monogram" aria-hidden="true">B<span>·</span></span><span class="site-brand-name">BeeDog<small>STAY CURIOUS / KEEP GOING</small></span></a>
  <nav class="site-nav" id="site-navigation" aria-label="主导航">{links}<details class="site-more"><summary>更多 <span aria-hidden="true">＋</span></summary><div class="site-more-menu">{more}</div></details></nav>
  <div class="site-header-actions"><a class="site-contact" href="contact.html">建立联系 <span aria-hidden="true">↗</span></a><button class="site-menu-toggle" id="site-menu-toggle" aria-label="打开导航" aria-controls="site-navigation" aria-expanded="false"><span></span><span></span></button></div>
</div></header>
<!-- /SITE HEADER -->'''

def footer():
    return '''<!-- SITE FOOTER -->
<footer class="site-footer"><div class="site-footer-inner"><div class="site-footer-identity"><a href="index.html">BeeDog <span>＋</span></a><span>© 2026 苏笔辉</span></div><nav class="site-footer-links" aria-label="页脚导航"><a href="now.html">NOW</a><a href="game.html">小游戏</a><a href="guestbook.html">留言板</a><a href="contact.html">联系我</a></nav><button class="site-motion" id="motion-toggle" aria-pressed="false">动态效果 <span id="motion-label">开启</span><i aria-hidden="true"></i></button></div></footer>
<!-- /SITE FOOTER -->'''

for p in sorted(ROOT.glob('*.html')):
    t=p.read_text()
    theme=f'<link rel="stylesheet" href="css/site-system.css?v={VERSION}">\n    <link rel="stylesheet" href="css/comic-details.css?v={VERSION}">\n    <script src="js/site-shell.js?v={VERSION}" defer></script>\n    <script src="js/editorial-motion.js?v={VERSION}" defer></script>'
    t=re.sub(r'\s*<link[^>]+href="css/site-system\.css[^\"]*"[^>]*>','',t)
    t=re.sub(r'\s*<script[^>]+src="js/site-shell\.js[^\"]*"[^>]*></script>','',t)
    t=re.sub(r'\s*<link[^>]+href="css/comic-details\.css[^\"]*"[^>]*>','',t)
    t=re.sub(r'\s*<script[^>]+src="js/editorial-motion\.js[^\"]*"[^>]*></script>','',t)
    t=t.replace('</head>','    '+theme+'\n</head>')
    t=re.sub(r'<body(?: class="[^"]*")?>',f'<body class="{"world-page" if p.name=="index.html" else "interior-page arcade-page" if p.name=="game.html" else "interior-page"}">',t,count=1)
    if '<!-- SITE HEADER -->' in t:
        t=re.sub(r'<!-- SITE HEADER -->.*?<!-- /SITE HEADER -->',header(p.name),t,flags=re.S)
    elif p.name=='index.html':
        t=re.sub(r'<header class="mission-header">.*?</header>',header(p.name),t,count=1,flags=re.S)
    elif '<nav class="navbar">' in t:
        t=re.sub(r'<nav class="navbar">.*?</nav>',header(p.name),t,count=1,flags=re.S)
    else:
        t=t.replace('<body class="interior-page">','<body class="interior-page">\n'+header(p.name),1)
    if '<!-- SITE FOOTER -->' in t:
        t=re.sub(r'<!-- SITE FOOTER -->.*?<!-- /SITE FOOTER -->',footer(),t,flags=re.S)
    elif p.name=='index.html':
        t=re.sub(r'<footer class="world-footer">.*?</footer>',footer(),t,count=1,flags=re.S)
    else:
        t=re.sub(r'<footer class="footer">.*?</footer>','',t,flags=re.S)
        t=t.replace('</body>',footer()+'\n</body>')
    # A single body family; the logo and meaningful game objects keep their own treatment.
    t=re.sub(r'<link[^>]+href="https://fonts.googleapis.com[^\"]*"[^>]*>','',t)
    t=t.replace("font-family:'Press Start 2P',monospace",'font-family:var(--bd-mono)')
    t=re.sub(r'font-size:(?:8|9|10|11)px', 'font-size:12px', t)
    t=t.replace('<h1 class="page-title">📚 ', '<h1 class="page-title">').replace('<h1 class="page-title">🗺 ', '<h1 class="page-title">').replace('<h1 class="page-title">🎮 ', '<h1 class="page-title">').replace('<h1 class="page-title">● ', '<h1 class="page-title">')
    t=re.sub(r'content="#(?:FFD23F|0b1115)"', 'content="#211c38"', t)
    p.write_text('\n'.join(line.rstrip() for line in t.splitlines()) + '\n')
