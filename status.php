<?php
include_once 'defines.php';

$timestamp = file_get_contents(TIMESTAMP_FILENAME);
if (!$timestamp)
{
	$timestamp = "null";
}
$currTime = time();

$timestampString = '"letsgoTimestamp":'.$timestamp.',"currentTimestamp":'.$currTime.',"letsgoTimeout":'.LETSGO_TIMEOUT;

if (getCurrentState()) {
	echo '{"light":true,'.$timestampString.'}';
} else {
	echo '{"light":false,'.$timestampString.'}';
}

?>
