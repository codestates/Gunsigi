#!/bin/bash

# aws 서버 시간 한국시간으로 설정
sudo ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
sudo /sbin/sysctl -w net.core.somaxconn=1024

npm install

# 환경변수파일생성
chmod +x scripts/setup_env.sh
./scripts/setup_env.sh

# WS, WAS 실행
sudo ln -sf /home/ubuntu/Gunsigi/server/config/nginx.conf /etc/nginx/nginx.conf
sudo service nginx restart
pm2 start npm --name Gunsigi -- run start -i max