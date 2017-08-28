import os, shutil
from urllib import urlretrieve

wm_version = '2.7.1'
wm_binary = 'wiremock-standalone-{0}.jar'.format(wm_version)
wm_url = 'http://repo1.maven.org/maven2/com/github/tomakehurst/wiremock-standalone/{0}/{1}'.format(wm_version, wm_binary)

if not os.path.isfile(wm_binary):
  print 'Download {0} ...'.format(wm_binary)
  urlretrieve(wm_url, filename=wm_binary)
  print '... Done'
