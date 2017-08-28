import os, shutil

wm_version = '2.7.1'
wm_binary = 'wiremock-standalone-{0}.jar'.format(wm_version)
wm_location = os.path.join('tools', wm_binary)
wm_url = 'http://repo1.maven.org/maven2/com/github/tomakehurst/wiremock-standalone/{0}/{1}'.format(wm_version, wm_binary)

if not os.path.isfile(wm_location):
  os.system('wget -P tools {0}'.format(wm_url))
