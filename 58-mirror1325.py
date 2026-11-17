from pathlib import Path
import urllib.request,hashlib,zipfile,json,shutil
release=Path('release');release.mkdir(exist_ok=True)
for name,h in {'one-world-beta-1.3.25.apk': 'f8a402147c7acc559c2eec23b69a166ec603a990a80cae9903f26a7f704aca25', 'beta-update.json': 'e85c476b48f5b57999ca00066c919849a83e98f04ea11640aa91cee3e529c02e', 'one-world-project-source-1.3.25.zip': '9585e26e5741d3e0373b6251fe0109ade25ca385740218f63a70a956ce584327'}.items():
 urllib.request.urlretrieve('https://github.com/PPYGaming/One-World-Beta/releases/download/v1.3.25/'+name,release/name)
 assert hashlib.sha256((release/name).read_bytes()).hexdigest()==h
with zipfile.ZipFile(release/'one-world-project-source-1.3.25.zip')as z:
 for n in z.namelist():assert not n.startswith('/') and '..'not in Path(n).parts
 z.extractall('.')
for a in json.loads(Path('SOURCE-INVENTORY.json').read_text())['files']:
 p=Path(a['path']);assert p.stat().st_size==a['size'];assert hashlib.sha256(p.read_bytes()).hexdigest()==a['sha256']
for p in Path('.').glob('*project1324*'):
 if p.is_file():p.unlink()
print('Exact APK manifest and full source mirror verified')
