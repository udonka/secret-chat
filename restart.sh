#!/bin/bash

name=mawaru.net
port=3002

echo $name $port
forever stop $name
PORT=$port NODE_ENV=production forever start -a --uid "$name" bin/www 
