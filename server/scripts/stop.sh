#!/bin/bash
export PATH=/home/ubuntu/.nvm/versions/node/v16.13.0/bin:$PATH
export PM2_HOME=/root/.pm2
export NODE_ENV=production

sudo service nginx stop
pm2 stop Gunsigi
pm2 delete Gunsigi