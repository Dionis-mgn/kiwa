import os

PATHNAME = os.path.dirname(os.path.abspath(__file__))
TEMP_DIR = PATHNAME + "/uploadtemp"
TEMP_FILE = PATHNAME + "/temp.zip"
SOURCE_DIR = PATHNAME + "/dist"
IDENTITY_FILE = "/home/denis/.ssh/id_rsa_nopass"
UPLOAD_ADDRESS = "root@192.168.1.101"
UPLOAD_DIR = "/usr/html"

FILE_EXTS = (".html", ".css", ".js", ".php")


def getTrackedFiles():
	fileList = []
	for root, dirs, files in os.walk(SOURCE_DIR):
		for file in files:
			if file.endswith(FILE_EXTS):
				fileList.append((root, file, os.path.relpath(root, SOURCE_DIR)))
	return fileList

files = getTrackedFiles()
for file in files:
	fileName = file[0] + '/' + file[1]
	command = "ssh -i " + IDENTITY_FILE + " " + UPLOAD_ADDRESS + " 'cat > " + UPLOAD_DIR + '/' + file[1] +"' < " + fileName
	print command
	os.system(command)
