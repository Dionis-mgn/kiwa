<?php
include_once 'defines.php';

if (!file_exists(LIGHT_DIR) || !is_dir(LIGHT_DIR)) {
	shell_exec("echo ".LIGHT_PIN." > ".GPIO_DIR."/export");
	shell_exec("echo 'in' > ".LIGHT_DIR_FILE);
}

$light_value = shell_exec("cat ".LIGHT_VAL_FILE);

$timestamp = file_get_contents(TIMESTAMP_FILENAME);
if (!$timestamp)
{
	$timestamp = "null";
}
$currTime = time();

$timestampString = '"letsgoTimestamp":'.$timestamp.',"currentTimestamp":'.$currTime.',"letsgoTimeout":'.LETSGO_TIMEOUT;

if ($light_value[0] == LIGHTON_VALUE) {
	echo '{"light":true,'.$timestampString.'}';
} else {
	echo '{"light":false'.$timestampString.'}';
}

?>
