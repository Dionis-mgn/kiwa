<?php

define("TIMESTAMP_FILENAME", "/usr/html/letsgodata");

$timestamp = time();
if (!file_put_contents(TIMESTAMP_FILENAME, $timestamp))
{
	die("Ooops");
}
else {
	echo "OK";
}

?>
