#!/bin/bash

dotenv=$(dirname $0)/.env
if [ ! -f $dotenv ]; then
    echo "Can't find dotenv file"
    exit 1
fi

source $dotenv

endpoint="http://$HOSTNAME/wp-json/wp/v2/$POST_TYPE"
if [ -z "$1" ]; then
    endpoint="$endpoint/$1"
fi

curl -X GET -k -L "$endpoint"

