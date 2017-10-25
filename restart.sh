#!/bin/bash

name=chat.mawaru.net
port=4000

echo $name $port
forever stop $name
PORT=$port NODE_ENV=production forever start -a --uid "$name" bin/www 
