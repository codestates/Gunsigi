#!/bin/bash

sudo ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
sudo /sbin/sysctl -w net.core.somaxconn=1024
cd /home/ubuntu/Gunsigi/server
npm install

sudo ln -sf /home/ubuntu/Gunsigi/server/nginx.conf /etc/nginx/nginx.conf
sudo service nginx restart
sudo pm2 start npm --name Gunsigi -- run start 