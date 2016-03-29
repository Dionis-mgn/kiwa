#Kicker Room Watcher

##Build
Use webpack to build service.

##Installation
1. Setup network on device. Login on it via ssh
2. *optional* Generate no-password ssh keyfile. Upload it to device
	* You can use luci interface to do it
3. Edit ```/etc/opkf.conf``` if default software repository is unavaliable
	* You can use luci
4. Edit ```/etc/config/uhttpd``` so luci port will be changed to 8088
5. ```mkdir /usr/html```
6. ```opkg update && opkg install nginx php5-fastcgi```
7. Edit ```/etc/nginx/nginx.conf```, ```/etc/nginx/fastcgi_params``` and ```/etc/php.ini```
8. Enable nginx & php-fastcgi via luci (startup page)
9. Restart nginx & php-fastcgi
10. Upload service files to /usr/html dir on device
	* You can use ```upload.py``` script to do it. Just edit some constants in the beginin (IDENTITY_FILE and others)
	* Upload ```./out.sh``` script to ```/root``` dir. So ```upload.py``` script will light ```#0 LED``` while working.
11. Open device URI in your browser

##How-to
###Upload file to device
I wasn't able to connect to the device via scp. So, following command will be copy file to device:

```ssh root@device 'cat > /target/file/name' < /source/file/name```

You can use ```-i``` option with your no-pass ssh keyfile.

###Connect device to AP
####No encryption/WPA(2) Personal
Device is ready to connect to such networks. Just use luci or edit ```/etc/config/wireless```:
```
config wifi-device radio0
	option type	mac80211
	option channel	auto
	option disabled 0
config wifi-iface
	option device	radio0
	option network	wlan
	option mode	sta
	option ssid	<SSID>
	option encryption psk2 #none/etc
	option key	<PASSWORD> #delete this option if encryption is not used
```
Do not forget to enable dhcp```/etc/config/network```:

```
...
wlan
	option proto	dhcp
...
```

####WPA(2) Enterprise
If you need to connect device to WPA(2) Enterprise encrypted network, you need to remove wpad-mini package and install wpad package instead:

1. Connect to device network (BlackSwift)
2. Connect device to any AP with Internet access (see previous How-To)
3. ```opkg update && opkg remove wpad-mini && opkg install wpad```
4. Connect to WPA(2) Enterprise AP: use luci or edit ```nano /etc/config/wireless```:
	* wifi-iface
		1. ```option mode sta```
		2. ```option ssid <SSID HERE>```
		3. ```option encryption wpa-mixed+ccmp```
		4. ```option eap_type peap```
		5. ```option auth auth=MSCHAPV2``` #(for example)
		6. ```option identity <USERNAME>```
		7. ```option password <PASSWORD>```
3. ```nano /etc/config/network``` ```proto 'dhcp'``` for wireless iface if needed
4. ```reboot``` or ```wifi```

####Helpfull links
https://wiki.openwrt.org/doc/uci/wireless
https://wiki.openwrt.org/doc/uci/wireless/encryption#atherosandgenericmac80211wifi

##Pins
###LEDs
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
###Input
Pin #10 connected to light detector
