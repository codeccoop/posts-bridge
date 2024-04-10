#!/bin/bash

dotenv=$(dirname $0)/.env
if [ ! -f $dotenv ]; then
    echo "Can't find dotenv file"
    exit 1
fi

source $dotenv

file=$1
if [ ! -f $file ]; then
    echo "Can't find $file"
    exit 1
fi

api="https://$HOSTNAME/wp-json"
login="$api/jwt-auth/v1/token"
endpoint="$api/wpct-remote/v1/$POST_TYPE"
credentials='{"username":"'$USERNAME'","password":"'$PASSWORD'"}'
data="$(cat $file)"

session="$(curl \
    -X POST \
    -k -L \
    -H 'Content-Type: application/json' \
    -d $credentials \
    $login)"

token="$(echo -n $session | jq -r .token)"

curl \
    -X POST \
    -k -L \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $token" \
    -d "$data" \
    $endpoint
