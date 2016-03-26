#Kicker Room Watcher

##Build
Use webpack to build service.

##Installation
1. Setup network on device. Login on it via ssh
2. *optional* Generate no-password ssh keyfile. Upload it to device
	* You can use luci interface to do it
3. Edit ```/etc/opkf.conf```
	* You can use luci
4. Edit ```/etc/config/uhttpd``` so luci port will be changed to 8088
5. ```mkdir /usr/html```
6. ```opkg update && opkg install nginx php-fastcgi```
7. Edit ```/etc/nginx/nginx.conf```, ```/etc/nginx/fastcgi_params``` and ```/etc/php.ini```
8. Enable nginx & php-fastcgi via luci (startup page)
9. Restart nginx & php-fastcgi
10. Upload service files to /usr/html dir on device
	* You can use ```upload.py``` script to do it. Just edit some constants in the beginin (IDENTITY_FILE and others)
	* Upload ```./out.sh``` script to ```/root``` dir. So ```upload.py``` script will light ```#0 LED``` while working.
11. Open device URI in ypur browser

##How-to
####Upload file to device
I wasn't able to connect to the device via scp. So, following command will be copy file to device:

```ssh root@device 'cat > /target/file/name' < /source/file/name```

You can use ```-i``` option with your no-pass ssh keyfile.

##Pins
####LEDs
|LED Id|Pin|Comment|
| --- | --- | --- |
|0|15||
|1|6||
|2|8||
|3|26||
|4|17||
|5|13||
|6|14||
|7|7||
|8|11|Reset button|
|9|27|BS on-plate LED|
####Input
Pin #10 connected to light detector

