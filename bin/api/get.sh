#!/bin/bash

dotenv=$(dirname $0)/.env
if [ ! -f $dotenv ]; then
    echo "Can't find dotenv file"
    exit 1
fi

source $dotenv

endpoint="http://$HOSTNAME/wp-json/wpct-remote/v1/$POST_TYPE"
if [ -z "$1" ]; then
    endpoint="$endpoint/$1"
fi

curl -X GET -k -L "$endpoint"

