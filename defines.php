<?php
error_reporting(0);

define("LIGHT_PIN", 20);
define("GPIO_DIR", "/sys/class/gpio");
define("LIGHT_DIR", GPIO_DIR."/gpio".LIGHT_PIN);
define("LIGHT_DIR_FILE", LIGHT_DIR."/direction");
define("LIGHT_VAL_FILE", LIGHT_DIR."/value");
define("LIGHTON_VALUE", "0");

define("TIMESTAMP_FILENAME", "/usr/html/letsgodata");
define("LETSGO_TIMEOUT", 120);

function getCurrentState()
{
	if (!file_exists(LIGHT_DIR) || !is_dir(LIGHT_DIR)) {
		shell_exec("echo ".LIGHT_PIN." > ".GPIO_DIR."/export");
		shell_exec("echo 'in' > ".LIGHT_DIR_FILE);
	}

	$light_value = shell_exec("cat ".LIGHT_VAL_FILE);

	return $light_value[0] == LIGHTON_VALUE;
}

?>
