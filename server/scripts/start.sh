#!/bin/bash

sudo ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
sudo /sbin/sysctl -w net.core.somaxconn=1024
cd /home/ubuntu/Gunsigi/server
npm install

export NODE_ENV=production
export DATABASE_USERNAME=$(aws ssm get-parameter --name DATABASE_USERNAME --query Parameter.Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameter --name DATABASE_PASSWORD --query Parameter.Value | sed 's/"//g')
export DATABASE_DB=$(aws ssm get-parameter --name DATABASE_DB --query Parameter.Value | sed 's/"//g')
export DATABASE_PORT=$(aws ssm get-parameter --name DATABASE_PORT --query Parameter.Value | sed 's/"//g')
export DATABASE_HOST=$(aws ssm get-parameter --name DATABASE_HOST --query Parameter.Value | sed 's/"//g')
export ACCESS_SECRET=$(aws ssm get-parameter --name ACCESS_SECRET --query Parameter.Value | sed 's/"//g')
export REFRESH_SECRET=$(aws ssm get-parameter --name REFRESH_SECRET --query Parameter.Value | sed 's/"//g')

sudo ln -sf /home/ubuntu/Gunsigi/server/nginx.conf /etc/nginx/nginx.conf
sudo service nginx restart
sudo pm2 start npm --name Gunsigi -- run start