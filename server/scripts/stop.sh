#!/bin/bash

sudo service nginx stop
pm2 stop Gunsigi
pm2 delete Gunsigi
rm -rf /home/ubuntu/Gunsigi