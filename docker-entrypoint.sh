#!/bin/sh

# terminate on any error condition
set -e

echo updating nginx config

if [ -z "$RESOLVER" ]; then
    echo "Need to set $RESOLVER, will use 127.0.0.11 as default value"
    export RESOLVER="127.0.0.11"
fi

sed -i "s/___RESOLVER___/$RESOLVER/g" /etc/nginx/conf.d/default.conf

echo "nginx config updated, will use $RESOLVER resolver"

nginx -g 'daemon off;'