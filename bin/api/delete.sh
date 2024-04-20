#!/bin/bash

dotenv=$(dirname $0)/.env
if [ ! -f $dotenv ]; then
    echo "Can't find dotenv file"
    exit 1
fi

source $dotenv

post_id=$1
if [ -z "$post_id" ]; then
    echo "You should indicate a post ID"
    exit 1
fi

api="https://$HOSTNAME/wp-json"
login="$api/jwt-auth/v1/token"
endpoint="$api/wpct-remote/v1/$POST_TYPE/$post_id"
credentials='{"username":"'$USERNAME'","password":"'$PASSWORD'"}'

session="$(curl \
    -X POST \
    -k -L \
    -H 'Content-Type: application/json' \
    -d $credentials \
    $login)"

token="$(echo -n $session | jq -r .token)"

curl -X DELETE \
    -k -L \
    -H "Authorization: Bearer $token" \
    "$endpoint?force=true"

