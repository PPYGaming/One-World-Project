from pathlib import Path
import urllib.request,hashlib,zipfile,json,shutil
release=Path('release');release.mkdir(exist_ok=True)
for name,h in {'one-world-beta-1.3.26.apk': '25708013d1da77007401895446d603a2dce1df6f02485d98e9afa4833301337c', 'beta-update.json': '43f6bac881847c921919b19087d5d8bd72330690b8c54118b208e9d568957f2f', 'one-world-project-source-1.3.26.zip': '9e3f3583f45f2fe1c942f209e57a0238f6a6c3c7923ff995cce6465d7654aaf0'}.items():
 urllib.request.urlretrieve('https://github.com/PPYGaming/One-World-Beta/releases/download/v1.3.26/'+name,release/name)
 assert hashlib.sha256((release/name).read_bytes()).hexdigest()==h
with zipfile.ZipFile(release/'one-world-project-source-1.3.26.zip')as z:
 for n in z.namelist():assert not n.startswith('/') and '..'not in Path(n).parts
 z.extractall('.')
for a in json.loads(Path('SOURCE-INVENTORY.json').read_text())['files']:
 p=Path(a['path']);assert p.stat().st_size==a['size'];assert hashlib.sha256(p.read_bytes()).hexdigest()==a['sha256']
for p in Path('.').glob('*project1325*'):
 if p.is_file():p.unlink()
print('Exact APK manifest and full source mirror verified')
