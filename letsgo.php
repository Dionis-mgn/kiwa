<?php
include_once 'defines.php';

$oldTimestamp = file_get_contents(TIMESTAMP_FILENAME);

$timestamp = time();

if ($timestamp - $oldTimestamp < LETSGO_TIMEOUT)
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
