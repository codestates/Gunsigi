#! /bin/bash
cd /home/ubuntu
rm -rf Gunsigi
git clone $(aws ssm get-parameter --name /Gunsigi/SOURCE --query Parameter.Value | sed 's/"//g')

cd Gunsigi/client
echo -e "DISABLE_ESLINT_PLUGIN=true\nREACT_APP_API_URL=" > .env.production
npm install
npm run build
rm -rf ../server/public/*
mv build/* ../server/public

cd ../server
chmod +x scripts/start.sh
./scripts/start.sh