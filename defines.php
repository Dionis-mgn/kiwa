<?php

define("LIGHT_PIN", 20);
define("GPIO_DIR", "/sys/class/gpio");
define("LIGHT_DIR", GPIO_DIR."/gpio".LIGHT_PIN);
define("LIGHT_DIR_FILE", LIGHT_DIR."/direction");
define("LIGHT_VAL_FILE", LIGHT_DIR."/value");
define("LIGHTON_VALUE", "0");

define("TIMESTAMP_FILENAME", "/usr/html/letsgodata");
define("LETSGO_TIMEOUT", 120);
?>
