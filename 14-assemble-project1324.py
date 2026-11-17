from pathlib import Path
import re,hashlib,zipfile,json,urllib.request,shutil
parts={}
for p in Path('.').iterdir():
 m=re.fullmatch(r'(?:\d+-)?project1324\.source\.part(\d\d)',p.name)
 if m:
  n=int(m[1]);assert n not in parts;parts[n]=p
assert set(parts)==set(range(13))
b=b''.join(parts[n].read_bytes()for n in sorted(parts));assert len(b)==26374879;assert hashlib.sha256(b).hexdigest()=='7ef546097e28d49a6a7450ac4bf76c8be765dbb4b27d54016b88c451fbe43f2a'
Path('source-1.3.24.zip').write_bytes(b)
with zipfile.ZipFile('source-1.3.24.zip')as z:
 for n in z.namelist():assert not n.startswith('/')and '..'not in Path(n).parts
 z.extractall('.')
inventory=json.loads(Path('SOURCE-INVENTORY.json').read_text())
for a in inventory['files']:
 p=Path(a['path']);assert p.stat().st_size==a['size'];assert hashlib.sha256(p.read_bytes()).hexdigest()==a['sha256']
release=Path('release');release.mkdir(exist_ok=True)
for name,expected in [('one-world-beta-1.3.24.apk','e52f0c48f327444a281f3713ffbeb685a3a087db0df59322ea076a6d10f814d7'),('beta-update.json','39e9384fa638369c265cd12d692e351f4f7ff14487be1061fc694eb30b047d3f')]:
 urllib.request.urlretrieve('https://github.com/PPYGaming/One-World-Beta/releases/download/v1.3.24/'+name,release/name)
 assert hashlib.sha256((release/name).read_bytes()).hexdigest()==expected
shutil.copy2('source-1.3.24.zip',release/'one-world-project-source-1.3.24.zip')
print('Full source inventory and unchanged mirrored APK/manifest verified')
