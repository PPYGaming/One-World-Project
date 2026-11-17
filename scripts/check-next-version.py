"""Read-only cross-repository release preflight. No credentials, writes or reservation."""
import argparse,json,re,urllib.request,urllib.error
p=argparse.ArgumentParser(description=__doc__);p.add_argument('--project',required=True,help='owner/repository of the actual development repo');p.add_argument('--update',default='PPYGaming/One-World-Beta');p.add_argument('--self-test',action='store_true');a=p.parse_args()
def next_version(v):return (*v[:-1],v[-1]+1)
def inspect(releases):
 versions=[];codes=[]
 for r in releases:
  if r.get('draft'):raise RuntimeError('Draft release exists: reconcile its reservation with the release owner first')
  m=re.fullmatch(r'v?(\d+)\.(\d+)\.(\d+)',r['tag_name'])
  if m:versions.append(tuple(map(int,m.groups())))
  for asset in r.get('assets',[]):
   if asset.get('name')=='beta-update.json':
    data=read(asset['browser_download_url']);assert data['package']=='com.oneword.forest.beta';codes.append(int(data['versionCode']))
 return versions,codes

def read(url):
 req=urllib.request.Request(url,headers={'User-Agent':'OneWorldProject-VersionCheck','Accept':'application/vnd.github+json'})
 with urllib.request.urlopen(req,timeout=30)as r:return json.load(r)
def fetch(repo):
 if not re.fullmatch(r'[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+',repo):raise RuntimeError('Use actual owner/repository')
 result=[]
 for page in range(1,11):
  batch=read(f'https://api.github.com/repos/{repo}/releases?per_page=100&page={page}');result.extend(batch)
  if len(batch)<100:return result
 raise RuntimeError('More than 1000 releases: narrow the supported history explicitly')
if a.self_test:
 assert next_version((1,3,24))==(1,3,25);assert max([(1,3,9),(1,3,24),(1,4,0)])==(1,4,0)
 print('PASS numeric version comparison and next patch');raise SystemExit()
try:
 allversions=[];allcodes=[];states={}
 for repo in [a.project,a.update]:
  rr=fetch(repo);v,c=inspect(rr);allversions+=v;allcodes+=c;states[repo]={'versions':sorted(v),'versionCodes':sorted(c),'highestVersion':max(v) if v else None,'highestVersionCode':max(c) if c else None}
 if not allversions or not allcodes:raise RuntimeError('No version or manifest code found')
 latest=max(allversions);code=max(allcodes)
 print(json.dumps({'repositories':states,'highestPublishedVersion':'.'.join(map(str,latest)),'highestVersionCode':code,'suggestedNextVersion':'.'.join(map(str,next_version(latest))),'suggestedNextVersionCode':code+1,'reservation':False,'warning':'Recheck BOTH repositories and all in-flight releases under the release owner lock immediately before signing/publishing. This read-only check does not reserve a number. Reconcile mismatched copies before another release.'},indent=2))
 if (states[a.project]['highestVersion'],states[a.project]['highestVersionCode'])!=(states[a.update]['highestVersion'],states[a.update]['highestVersionCode']):raise RuntimeError('Repositories have different latest versions: reconcile publication before selecting another version')
except Exception as e:
 raise SystemExit('STOP: '+str(e))
