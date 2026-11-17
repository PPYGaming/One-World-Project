from pathlib import Path
import os,shutil,subprocess,zipfile
root=Path(__file__).resolve().parents[1]
sdk=Path(os.environ['ANDROID_SDK_ROOT'])
bt=sdk/'build-tools'/os.environ.get('ANDROID_BUILD_TOOLS','36.0.0')
jar=sdk/'platforms'/'android-36'/'android.jar'
build=root/'build';build.mkdir(exist_ok=True)
for name in ['classes','dex','generated']:
 p=build/name
 if p.exists():shutil.rmtree(p)
 p.mkdir()
def run(args):subprocess.run([str(x) for x in args],check=True,cwd=root)
run(['javac','--release','8','-cp',jar,'-d',build/'classes',*sorted((root/'android/src').rglob('*.java'))])
run([bt/'d8','--min-api','29','--lib',jar,'--output',build/'dex',*sorted((build/'classes').rglob('*.class'))])
run([bt/'aapt2','compile','--dir',root/'android/res','-o',build/'res.zip'])
run([bt/'aapt2','link','-o',build/'base.apk','-I',jar,'--manifest',root/'android/AndroidManifest.xml',build/'res.zip','--min-sdk-version','29','--target-sdk-version','36','-A',root/'web','--java',build/'generated'])
shutil.copy2(build/'base.apk',build/'with-dex.apk')
with zipfile.ZipFile(build/'with-dex.apk','a') as z:z.write(build/'dex/classes.dex','classes.dex')
run([bt/'zipalign','-p','-f','4',build/'with-dex.apk',build/'one-world-unsigned.apk'])
print('Unsigned build:',build/'one-world-unsigned.apk')
print('Do not install this over the testing beta. It is unsigned and contains no production signing key.')
