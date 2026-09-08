"""Build WOFF2 files from Google Fonts sources. Requires fonttools[woff].
Usage: python scripts/subset-heading-fonts.py /path/to/font-source-directory
Source directory must contain display.ttf and chinese.ttf. Licenses in fonts/.
"""
from pathlib import Path
from html.parser import HTMLParser
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
import re, sys
root = Path(__file__).resolve().parents[1]
source = Path(sys.argv[1])
class Titles(HTMLParser):
    def __init__(self): super().__init__(); self.stack=[]; self.text=[]
    def handle_starttag(self,tag,attrs):
        if tag in ('img','link','meta','input','br','hr','source','wbr','area','base','embed','param','track'): return
        cls=dict(attrs).get('class','')
        self.stack.append((tag, tag in ('h1','h2','h3','h4','h5','strong') or any(c in cls.split() for c in ['cover-name','site-brand-name','rail-word'])))
    def handle_endtag(self,tag):
        for i in range(len(self.stack)-1,-1,-1):
            if self.stack[i][0]==tag: del self.stack[i:];break
    def handle_data(self,text):
        if any(active for _,active in self.stack): self.text.append(text)
chars=set(chr(n) for n in range(32,127))
for page in root.glob('*.html'):
    parser=Titles(); parser.feed(page.read_text()); chars.update(''.join(parser.text))
for script in ['world.js','one-more-game.js']:
    chars.update(re.findall(r'[\u3000-\u9fff]',(root/'js'/script).read_text()))
for kind in ['display','chinese']:
    font=TTFont(source/('display.ttf' if kind=='display' else 'chinese.ttf'))
    options=subset.Options();options.flavor='woff2';options.layout_features=['*'];options.name_IDs=['*'];options.name_legacy=True;options.name_languages=['*']
    worker=subset.Subsetter(options=options)
    worker.populate(unicodes=range(32,256) if kind=='display' else [ord(c) for c in chars])
    worker.subset(font)
    if kind=='chinese': font=instantiateVariableFont(font,{'wght':(600,900)},inplace=True)
    # Modified font names are unique; original license/copyright records are retained.
    family='BeeDog Display' if kind=='display' else 'BeeDog Headings'
    for record in font['name'].names:
        if record.nameID in (1,4,6,16):
            text=family.replace(' ','') if record.nameID==6 else family
            record.string=text.encode(record.getEncoding())
    font.flavor='woff2'
    out=root/'fonts'/('beedog-display.woff2' if kind=='display' else 'beedog-headings.woff2')
    font.save(out)
    print(out.name,out.stat().st_size,'bytes',len(font.getBestCmap()),'glyphs')
