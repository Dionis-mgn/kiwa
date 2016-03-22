<?php

define("TIMESTAMP_FILENAME", "/usr/html/letsgodata");
define("TIMEOUT", 120);

$oldTimestamp = file_get_contents(TIMESTAMP_FILENAME);

$timestamp = time();

if ($timestamp - $oldTimestamp < TIMEOUT)
{
	http_response_code(500);
	die("Busy");
}

if (!file_put_contents(TIMESTAMP_FILENAME, $timestamp))
{
	http_response_code(500);
	die("Ooops");
}
else {
	echo "OK";
}

?>
