#!/bin/ash
DIR_FILENAME="/sys/class/gpio/gpio$1/direction"
VAL_FILENAME="/sys/class/gpio/gpio$1/value"
DIR="/sys/class/gpio/gpio$1"

if [ ! -d "$DIR" ]; then
        echo $1 > /sys/class/gpio/export
        echo "out" > $DIR_FILENAME
fi
echo $2 > $VAL_FILENAME
